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

const invalidOptionError = (option) => {
  return {
    message: `Invalid option -- ${option}`,
  };
};

const invalidCountError = (count) => {
  return {
    message: `Illegal count -- ${count}`
  };
};

const invalidFileError = () => { 
  return {
    message: 'No file found'
  };
};

const assertValidInput = function ({ files, count, option }) {
  if (option !== '-n' && option !== '-c') {
    throw invalidOptionError(option);
  }
  if (count < 1 || isNaN(count)) {
    throw invalidCountError(count);
  }
  
  if (files.length === 0) {
    throw invalidFileError();
  }
};

const headMain = function (readFile, args) {
  try {
    const { files, count, option } = parseArgs(args);
    assertValidInput({ files, count, option });

    const fileAndContents = files.map((file) => {
      const content = head(readFile(file, 'utf8'), { count, option });
      return { name: file, content };
    });

    return joinData(formatFileContent(fileAndContents), '\n\n');
  } catch (error) {
    return error.message;
  }
};

exports.head = head;
exports.headMain = headMain;
exports.validateInput = assertValidInput;
