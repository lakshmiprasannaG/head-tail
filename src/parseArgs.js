const parseArgs = function (args) {
  let files = args.slice(0);
  let count = 10;
  const delimiter = args[0] === '-c' ? '' : '\n';
  if (args.length > 1) {
    files = args.slice(2, args.length);
    count = +args[1];
  }
  return { files, count, delimiter };
};
exports.parseArgs = parseArgs;
