const assertValidFiles = require('./../src/headLib.js').assertValidFiles;
const assertValidOptions = require('./../src/parseArgs.js').assertValidOptions;
const assert = require('assert');

const HEAD_USAGE = 'usage: head [-n lines | -c bytes] [file ...]';

describe('assertValidOptions', () => {
  it('Should throw error when invalid option is given', () => {
    const error = {
      message: `head: Invalid option -- x\n${HEAD_USAGE}`
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
    assert.throws(() => assertValidFiles({ files: [], count: 2, option: '-n' }, ['-n', '-c']), error);
  });
});

