const parseArgs = function (args) {
  let count = 10;
  let files = args.slice(0);
  const delimiter = args[0] === '-c' ? '' : '\n';
  if (args[0].startsWith('-')) {
    count = +args[1];
    files = args.slice(2);
  }
  return { files, count, delimiter };
};
exports.parseArgs = parseArgs;
