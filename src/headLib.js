const NEWLINE = '\n';

const splitLines = (content) => content.split(NEWLINE);
const joinLines = (lines) => lines.join(NEWLINE);

const head = (content, {count}) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const headMain = function (readFile, filePath) {
  try {
    return head(readFile(filePath, 'utf8'), 1);
  } catch (error) {
    console.log(error);
  }
};

exports.head = head;
exports.headMain = headMain;
