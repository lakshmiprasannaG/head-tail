const splitLines = (content, delimiter) => content.split(delimiter);
const joinLines = (lines, delimiter) => lines.join(delimiter);

const head = (content, { count, bytes }) => {
  const delimiter = count ? '\n' : '';
  const option = count ? count : bytes;
  const lines = splitLines(content, delimiter);
  return joinLines(lines.slice(0, option), delimiter);
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
