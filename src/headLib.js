const { parseArgs } = require('./parseArgs');

const getUsage = () => 'usage: head [-n lines | -c bytes] [file ...]';
const splitContent = (content, delimiter) => content.split(delimiter);
const joinData = (lines, delimiter) => lines.join(delimiter);

const firstNLines = (content, count) => {
  const lines = splitContent(content, '\n');
  return joinData(lines.slice(0, count), '\n');
};

const firstNBytes = (content, count) => {
  const bytes = splitContent(content, '');
  return joinData(bytes.slice(0, count), '');
};

const operator = (option) => {
  return {
    '-c': firstNBytes,
    '-n': firstNLines
  }[option];
};

const head = (content, { count, option }) => {
  const headOperator = operator(option);
  return headOperator(content, count);
};

// const noFilePresent = function (file) {
//   return {
//     file,
//     message: `head: ${file}: No such file or directory`
//   };
// };

// const directory = function (file) {
//   return {
//     file,
//     message: `head: Error reading ${file}`
//   };
// };

// const noPermission = function (file) {
//   return {
//     file,
//     message: `head: ${file}: Permission denied`
//   };
// };

// const readingError = function (file, errorName) {
//   const errorLog = {
//     noFile: `head: ${file}: No such file or directory`,
//     directory: `head: Error reading ${file}`,
//     noPermission: `head: ${file}: Permission denied`
//   };
//   return errorLog[errorName];
// };

// const createError = (errCode, file) => {
//   const errorCodes = {
//     ENOENT: noFilePresent(file),
//     EISDIR: directory(file),
//     EACCES: noPermission(file)
//   };
//   return errorCodes(errCode, file);
// };

const createErrorMessage = (errCode, file) => {
  const errorCodes = {
    ENOENT: `head: ${file}: No such file or directory`,
    EISDIR: `head: Error reading ${file}`,
    EACCES: `head: ${file}: Permission denied`
  };
  return errorCodes[errCode];
};

const multipleFileHeader = (file) => `==> ${file} <==\n`;
const singleFileHeader = () => '';

const formatFileContent = function (contents, fileHeader) {
  return contents.map((file) => {
    if (file.error) {
      return createErrorMessage(file.error, file.fileName);
    }
    const header = fileHeader(file.fileName);
    return `${header}${file.content}`;
  });
};

const noArguments = () => {
  return {
    message: getUsage()
  };
};

const invalidFileError = () => {
  return {
    message: 'No file found'
  };
};

const assertValidFiles = function (files) {
  if (files.length === 0) {
    throw invalidFileError();
  }
};

const readFile = (readFileSync, file, encoding) => {
  try {
    return {
      content: readFileSync(file, encoding)
    };
  } catch (error) {
    return {
      error: createErrorMessage(error.code, file)
    };
  }
};

const headMain = function (readFileSync, args) {
  if (args.length === 0) {
    throw noArguments();
  }

  const { files, options } = parseArgs(args);
  assertValidFiles(files);

  const fileHeader = files.length > 1 ? multipleFileHeader : singleFileHeader;

  const headOfFiles = files.map(file => {
    const { content, error } = readFile(readFileSync, file, 'utf8');
    if (content) {
      const headContent = head(content, options);
      return { fileName: file, content: headContent };
    }
    return { fileName: file, error };
  });
  console.log(headOfFiles.error);

  const contentWithHeader = formatFileContent(headOfFiles, fileHeader);
  return joinData(contentWithHeader, '\n\n');
};

exports.head = head;
exports.headMain = headMain;
exports.assertValidFiles = assertValidFiles;
exports.formatFileContent = formatFileContent;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.readFile = readFile;
exports.createErrorMessage = createErrorMessage;
