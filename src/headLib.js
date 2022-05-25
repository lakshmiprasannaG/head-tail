const { parseArgs } = require('./parseArgs');

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

const formatFileContent = function (fileAndContents) {
  if (fileAndContents.length === 1) {
    return [fileAndContents[0].content];
  }
  return fileAndContents.map((file) => {
    const fileNameFormat = `==> ${file.name} <==`;
    return `${fileNameFormat}\n${file.content}`;
  });
};

const noArguments = () => {
  return {
    message: 'usage: head [-n lines | -c bytes] [file ...]'
  };
};

const invalidFileError = () => {
  return {
    message: 'No file found'
  };
};

const assertValidFiles = function ({ files }) {
  if (files.length === 0) {
    throw invalidFileError();
  }
};

const headMain = function (readFile, args) {
  if (!args.length) {
    throw noArguments();
  }

  const { files, options: { option, count } } = parseArgs(args);
  assertValidFiles({ files });

  const fileAndContents = files.map(function (file) {
    try {
      const content = head(readFile(file, 'utf8'), { count, option });
      return { name: file, content, status: 'pass' };
    } catch (error) {
      return {
        name: file,
        content: error.message,
        status: 'fail'
      };
    }
  });

  return joinData(formatFileContent(fileAndContents), '\n\n');

};

exports.head = head;
exports.headMain = headMain;
exports.assertValidFiles = assertValidFiles;
exports.formatFileContent = formatFileContent;
