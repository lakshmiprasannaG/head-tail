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

const validateInput = function ({ files, count, option }, args) {
  if (option !== '-n' && option !== '-c') {
    throw `Invalid option -- ${option}`;
  }
  if (count < 1 || isNaN(count)) {
    throw `Illegal count -- ${args[1]}`;
  }
  if (args.includes('-c') && args.includes('-n')) {
    throw 'Cannot combine counts';
  }
  if (files.length === 0) {
    throw 'No file found';
  }
};

const headMain = function (readFile, args) {
  try {
    const { files, count, option } = parseArgs(args);
    validateInput({ files, count, option }, args);
    const delimiter = option === '-c' ? '' : '\n';

    const fileContents = files.map((file) => head(readFile(file, 'utf8'), { count, delimiter }));

    return joinData(formatFileContent(files, fileContents), '\n\n');
  } catch (error) {
    return error;
  }
};

exports.head = head;
exports.headMain = headMain;
