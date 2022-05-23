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
  const files = Object.keys(fileAndContents);
  
  if (files.length === 1) {
    return [fileAndContents[files[0]]];
  }

  return files.map((file) => {
    const fileNameFormat = `==> ${file} <==`;
    return `${fileNameFormat}\n${fileAndContents[file]}`;
  });
};

const assertValidInput = function ({ files, count, option }) {
  if (option !== '-n' && option !== '-c') {
    const errorMessage = {
      message: `Invalid option -- ${option}`
    };
    throw errorMessage;
  }
  if (count < 1 || isNaN(count)) {
    const errorMessage = {
      message: `Illegal count -- ${count}`
    };
    throw errorMessage;
  }
  
  if (files.length === 0) {
    const errorMessage = {
      message: 'No file found'
    };
    throw errorMessage;
  }
};

const headMain = function (readFile, args) {
  try {
    const { files, count, option } = parseArgs(args);
    assertValidInput({ files, count, option });

    const fileAndContents = {};
    files.map((file) => {
      fileAndContents[file] = head(readFile(file, 'utf8'), { count, option });
      return fileAndContents;
    });

    return joinData(formatFileContent(fileAndContents), '\n\n');
  } catch (error) {
    return error;
  }
};

exports.head = head;
exports.headMain = headMain;
exports.validateInput = assertValidInput;
