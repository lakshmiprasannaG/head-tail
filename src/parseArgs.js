const invalidOptionError = (option) => {
  return {
    message: `Invalid option -- ${option}`,
  };
};

const invalidCountError = (count) => {
  return {
    message: `Illegal count -- ${count}`
  };
};

const invalidCombinationOfOptions = () => {
  return {
    message: 'Cannot combine counts'
  };
};

const assertValidOptions = ({count, option}, validOptions) => {
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
  return {files, count, option};
};

const segregateArgs = (args) => {
  const option = args[0];
  const count = +args[1];
  const files = args.slice(2);
  if (isNaN(count) || !isNaN(option)) {
    return resetArgs(args, option); 
  }
  return { files, count, option };
};

const parseArgs = function (args) {
  const optionsList = [];
  const count = 10;
  const files = args.slice(0);
  const option = '-n';
  let parsedArgs = { files, count, option };
  const validOptions = ['-n', '-c'];
  
  while (parsedArgs.files[0].startsWith('-')) {
    parsedArgs = segregateArgs(parsedArgs.files);
    optionsList.push(parsedArgs.option);
    assertValidOptions(parsedArgs, validOptions);
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
