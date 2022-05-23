const validateFiles = function ({files, count}, args) {
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

const parseArgs = function (args) {
  let count = 10;
  let files = args.slice(0);
  let option = '-n';
  if (args[0].startsWith('-')) {
    option = args[0];
    count = +args[1];
    files = args.slice(2);
  }
  validateFiles({files, count, option}, args);
  return { files, count, option };
};
exports.parseArgs = parseArgs;
