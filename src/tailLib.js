const { parseArgs } = require('./../src/parseArgs.js');
const { assertValidFiles, formatFileContent } = require('./../src/headLib.js');

const lastNLines = function (content, count) {
  const lines = content.split('\n');

  const sliceValue = count > lines.length ? 0 : lines.length - count;
  return lines.slice(sliceValue).join('\n');
};

const lastNBytes = function (content, count) {
  const bytes = content.split('');

  const sliceValue = count > bytes.length ? 0 : bytes.length - count;
  return bytes.slice(sliceValue).join('');
};

const tail = (content, { count, option }) => {
  const optionFnPairs = {
    '-c': lastNBytes(content, count),
    '-n': lastNLines(content, count)
  };
  return optionFnPairs[option];
};

const tailMain = function (readFile, args) {
  if (args.length === 0) {
    throw 'usage: tail [-c # | -n #] [file ...]';
  }
  const { files, options: { option, count } } = parseArgs(args);
  assertValidFiles({ files });

  const fileAndContents = files.map(function (file) {
    try {
      const content = tail(readFile(file, 'utf8'), { count, option });
      return { name: file, content, status: 'pass' };
    } catch (error) {
      return {
        name: file,
        content: error.message,
        status: 'fail'
      };
    }
  });
  return formatFileContent(fileAndContents).join('\n\n');
};

exports.tail = tail;
exports.tailMain = tailMain;
