const HEAD_USAGE = 'usage: head [-n lines | -c bytes] [file ...]';

const invalidOptionError = (option) => {
  return {
    message: `head: Invalid option -- ${option[1]}\n${HEAD_USAGE}`,
  };
};

const invalidCountError = (count) => {
  return {
    message: `head: Illegal count -- ${count}`
  };
};

const invalidCombinationOfOptions = () => {
  return {
    message: "head: can't combine line and byte counts"
  };
};

const assertValidOptions = ({ count, option }, validOptions) => {
  if (!validOptions.includes(option)) {
    throw invalidOptionError(option);
  }
  if (count < 1) {
    throw invalidCountError(count);
  }
};

const resetArgs = (args) => {
  let option = '-n';
  let count = args[0].slice(1);
  const files = args.slice(1);

  if (count.includes('n') || count.includes('c')) {
    option = args[0].slice(0, 2);
    count = args[0].slice(2);
  }
  return { files, options: { option, count } };
};

const segregateArgs = (args) => {
  const option = args[0];
  const count = +args[1];
  const files = args.slice(2);
  if (isNaN(count) || !isNaN(option)) {
    return resetArgs(args, option);
  }
  return { files, options: { option, count } };
};

const parseArgs = function (args) {
  const optionsList = [];
  const count = 10;
  const files = args.slice(0);
  const option = '-n';
  let parsedArgs = { files, options: { option, count } };

  const validOptions = ['-n', '-c'];

  while (parsedArgs.files[0].startsWith('-')) {
    parsedArgs = segregateArgs(parsedArgs.files);
    optionsList.push(parsedArgs.options.option);
    assertValidOptions(parsedArgs.options, validOptions);
  }

  for (let index = 0; index < optionsList.length; index++) {
    if (optionsList[index] !== optionsList[0]) {
      throw invalidCombinationOfOptions();
    }
  }

  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.assertValidOptions = assertValidOptions;
