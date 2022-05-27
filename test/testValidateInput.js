const assertValidFiles = require('./../src/headLib.js').assertValidFiles;
const assertValidOptions = require('./../src/parseArgs.js').assertValidOptions;
const assert = require('assert');

const getUsage = () => 'usage: head [-n lines | -c bytes] [file ...]';

describe('assertValidOptions', () => {
  it('Should throw error when invalid option is given', () => {
    const error = {
      message: `head: Invalid option -- x\n${getUsage()}`
    };
    assert.throws(() => assertValidOptions({ count: 2, option: '-x' }, ['-n', '-c']), error);
  });

  it('Should throw error when invalid count is given', () => {
    const error = {
      message: 'head: Illegal count -- -2'
    };
    assert.throws(() => assertValidOptions({ count: -2, option: '-n' }, ['-n', '-c']), error);
  });
});

describe('assertValidFiles', () => {
  it('Should throw error when file is not given', () => {
    const error = {
      message: 'No file found'
    };
    assert.throws(() => assertValidFiles([]), error);
  });
});

