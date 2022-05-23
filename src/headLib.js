const { parseArgs } = require('./parseArgs');

const splitData = (content, delimiter) => content.split(delimiter);
const joinData = (lines, delimiter) => lines.join(delimiter);

const head = (content, { count, delimiter }) => {
  const lines = splitData(content, delimiter);
  return joinData(lines.slice(0, count), delimiter);
};

const formatFileContent = function (files, filesContent) {
  const formattedData = [];
  if (files.length === 1) {
    return filesContent;
  }
  for (let index = 0; index < files.length; index++) {
    const fileNameFormat = `==> ${files[index]} <==`;
    formattedData.push(`${fileNameFormat}\n${filesContent[index]}`);
  }
  return formattedData;
};

const validateInput = function ({ files, count, option }) {
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
    validateInput({ files, count, option });
    const delimiter = option === '-c' ? '' : '\n';

    const fileContents = files.map((file) => {
      return head(readFile(file, 'utf8'), { count, delimiter });
    });

    return joinData(formatFileContent(files, fileContents), '\n\n');
  } catch (error) {
    return error;
  }
};

exports.head = head;
exports.headMain = headMain;
exports.validateInput = validateInput;
