const resetArgs = (args) => {
  let option = '-n';
  let count = args[0].slice(1);
  let files = args.slice(1);

  if (args[0].length > 2) {
    files = args.slice(1);
    option = args[0].slice(0, 2);
    count = args[0].slice(2);
  }
  return {files, count, option};
};

const invalidOptions = () => {
  return {
    message: 'Cannot combine counts'
  };
};

const assertValidateOptions = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw invalidOptions();
  }
};

const parseArgs = function (args) {
  let count = 10;
  let files = args.slice(0);
  let option = '-n';

  assertValidateOptions(args);

  if (args[0].startsWith('-')) {
    option = args[0];
    count = +args[1];
    files = args.slice(2);
    if (isNaN(count)) {
      return resetArgs(args, option);
    }
  }
  return { files, count, option };
};

exports.parseArgs = parseArgs;
