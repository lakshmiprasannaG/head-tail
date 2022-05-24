const assertValidFiles = require('./../src/headLib.js').assertValidFiles;
const assertValidOptions = require('./../src/parseArgs.js').assertValidOptions;
const assert = require('assert');

describe('validateInput', () => {
  it('Should throw error when invalid option is given', () => {
    const error = {
      message: 'Invalid option -- -x'
    };
    assert.throws(() => assertValidOptions({ count: 2, option: '-x' }, ['-n', '-c']), error);
  });
  
  it('Should throw error when invalid count is given', () => {
    const error = {
      message: 'Illegal count -- -2'
    };
    assert.throws(() => assertValidOptions({ count: -2, option: '-n' }, ['-n', '-c']), error);
  });
  
  it('Should throw error when file is not given', () => {
    const error = {
      message: 'No file found'
    };
    assert.throws(() => assertValidFiles({ files: [], count: 2, option: '-n' }, ['-n', '-c']), error);
  });
});
