const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const getUsage = () => 'usage: head [-n lines | -c bytes] [file ...]';

const mockReadfileSync = function (expectedFiles, content) {
  let index = 0;
  return function (filePath) {
    assert.deepStrictEqual(filePath, expectedFiles[index]);
    index++;
    return content;
  };
};

describe('headMain', () => {
  it('Should give first line of given file, as count is 1', () => {
    const mockedReadFileSync = mockReadfileSync(['./a.txt'], 'hello');
    assert.strictEqual(headMain(mockedReadFileSync, ['-n', '1', './a.txt']), 'hello');
  });

  it('Should give first line of given files, as count is 1', () => {
    const mockedReadFileSync = mockReadfileSync(['./a.txt', './b.txt'], 'hello');
    assert.strictEqual(headMain(mockedReadFileSync, ['-n', '1', './a.txt', './b.txt']), '==> ./a.txt <==\nhello\n\n==> ./b.txt <==\nhello');
  });

  it('Should throw usage when no arguments are passed', () => {
    const mockedReadFileSync = mockReadfileSync(['./a.txt', './b.txt'], 'hello');
    const error = {
      message: getUsage()
    };
    assert.throws(() => headMain(mockedReadFileSync, []), error);
  });
});
