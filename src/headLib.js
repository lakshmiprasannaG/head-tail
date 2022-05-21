const splitLines = (content, delimiter) => content.split(delimiter);
const joinLines = (lines, delimiter) => lines.join(delimiter);

const getCount = count => count ? count : 10;

const head = (content, { count, bytes }) => {
  const delimiter = bytes ? '' : '\n';
  const option = bytes ? bytes : getCount(count);
  const lines = splitLines(content, delimiter);
  return joinLines(lines.slice(0, option), delimiter);
};

const headMain = function (readFile, filePath) {
  try {
    return head(readFile(filePath, 'utf8'), {});
  } catch (error) {
    console.log(error);
  }
};

exports.head = head;
exports.headMain = headMain;
