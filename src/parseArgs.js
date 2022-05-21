const parseArgs = function (args) {
  let count = 10;
  let files = args.slice(0);
  let option = '-n';
  if (args[0].startsWith('-')) {
    option = args[0];
    count = +args[1];
    files = args.slice(2);
  }
  return { files, count, option };
};
exports.parseArgs = parseArgs;
