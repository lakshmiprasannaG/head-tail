const getUsage = () => 'usage: head [-n lines | -c bytes] [file ...]';

const invalidOptionError = (option) => {
  return {
    message: `head: Invalid option -- ${option[1]}\n${getUsage()}`,
  };
};

const invalidCountError = (count) => {
  return {
    message: `head: Illegal count -- ${count}`
  };
};

const invalidCombinationOfOptions = () => {
  return {
    // eslint-disable-next-line quotes
    message: "head: can't combine line and byte counts"
  };
};

const assertValidOptions = ({ count, option }, validOptions) => {
  if (count < 1) {
    throw invalidCountError(count);
  }
  if (!validOptions.includes(option)) {
    throw invalidOptionError(option);
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

const isFlag = (option) => option.startsWith('-');

const setDefaults = function () {
  return {
    option: '-n',
    count: 10
  };
};

const parseArgs = function (args) {
  const optionsList = [];
  const files = args.slice(0);
  const options = setDefaults();
  let parsedArgs = { files, options };

  const validOptions = ['-n', '-c'];

  while (isFlag(parsedArgs.files[0])) {
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
