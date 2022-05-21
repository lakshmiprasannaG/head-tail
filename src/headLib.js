const { parseArgs } = require('./parseArgs');

const splitLines = (content, delimiter) => content.split(delimiter);
const joinLines = (lines, delimiter) => lines.join(delimiter);

const head = (content, { count, delimiter }) => {
  const lines = splitLines(content, delimiter);
  return joinLines(lines.slice(0, count), delimiter);
};

const headMain = function (readFile, args) {
  try {
    const { files, count, delimiter } = parseArgs(args);
    const requiredText = [];
    for (let index = 0; index < files.length; index++) {
      const content = readFile(files[index], 'utf8');
      requiredText.push(head(content, { count, delimiter }));
    }
    return requiredText.join('\n\n\n');
  } catch (error) {
    console.log('Unable to read file');
  }
};

exports.head = head;
exports.headMain = headMain;
