const { parseArgs } = require('./parseArgs');

const getUsage = () => 'usage: head [-n lines | -c bytes] [file ...]';
const splitData = (content, delimiter) => content.split(delimiter);
const joinData = (lines, delimiter) => lines.join(delimiter);

const firstNLines = (content, count) => {
  const data = splitData(content, '\n');
  return joinData(data.slice(0, count), '\n');
};

const firstNBytes = (content, count) => {
  const data = splitData(content, '');
  return joinData(data.slice(0, count), '');
};

const head = (content, { count, option }) => {
  const optionFnPairs = {
    '-c': firstNBytes(content, count),
    '-n': firstNLines(content, count)
  };
  return optionFnPairs[option];
};

const getFileFormat = (file) => `==> ${file.name} <==`;

const formatFileContent = function (contents) {
  return contents.map((file) => {
    return `${getFileFormat(file)}\n${file.content}`;
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
  if (!files.length) {
    throw invalidFileError();
  }
};

const readFile = (readFileSync, file, encode) => {
  try {
    return {
      content: readFileSync(file, encode)
    };
  } catch (error) {
    return {
      message: `head: ${file}: No such file or directory`
    };
  }
};

const headMain = function (readFileSync, args) {
  if (!args.length) {
    throw noArguments();
  }

  const { files, options } = parseArgs(args);
  assertValidFiles(files);

  const headedContents = files.map(file => {
    const { content, message } = readFile(readFileSync, file, 'utf8');
    if (content) {
      const headContent = head(content, options);
      return { name: file, content: headContent };
    }
    return { name: file, message };
  });

  const formattedContent = headedContents.length === 1 ?
    [headedContents[0].content] : formatFileContent(headedContents);
  return joinData(formattedContent, '\n\n');

};

exports.head = head;
exports.headMain = headMain;
exports.assertValidFiles = assertValidFiles;
exports.formatFileContent = formatFileContent;
