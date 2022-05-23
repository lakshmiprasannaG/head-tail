const resetArgs = (args) => {
  const files = args.slice(1);
  const option = args[0].slice(0, 2);
  const count = args[0].slice(2);
  return { files, count, option };
};
  
const parseArgs = function (args) {
  let count = 10;
  let files = args.slice(0);
  let option = '-n';
  if (args[0].startsWith('-')) {
    option = args[0];
    count = +args[1];
    files = args.slice(2);
    if (option.length > 2) {
      return resetArgs(args);
    }
  }
  return { files, count, option };
};

exports.parseArgs = parseArgs;
