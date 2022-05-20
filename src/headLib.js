const NEWLINE = '\n';

const splitLines = (content) => content.split(NEWLINE);
const joinLines = (lines) => lines.join(NEWLINE);

const head = content => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, 10));
};

exports.head = head;
