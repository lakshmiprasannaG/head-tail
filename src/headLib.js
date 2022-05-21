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

const headMain = function (readFile, args) {
  try {
    const { files, count, option } = parseArgs(args);
    const requiredText = [];
    const delimiter = option === '-c' ? '' : '\n';
    
    for (let index = 0; index < files.length; index++) {
      const content = readFile(files[index], 'utf8');
      requiredText.push(head(content, { count, delimiter }));
    }
    return joinData(formatFileContent(files, requiredText), '\n\n');
  } catch (error) {
    console.log('Unable to read file');
  }
};

exports.head = head;
exports.headMain = headMain;
