const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const getUsage = () => 'usage: head [-n lines | -c bytes] [file ...]';

const mockReadFileSync = function (expectedFiles, contents) {
  let index = 0;
  return function (filePath) {
    assert.deepStrictEqual(filePath, expectedFiles[index]);
    index++;
    return contents[index - 1];
  };
};

describe('headMain', () => {
  it('Should give first line of given file, as count is 1', () => {
    const mockedReadFileSync = mockReadFileSync(['a.txt'], ['hello']);
    const actual = headMain(mockedReadFileSync, ['-n', '1', 'a.txt']);
    const expected = 'hello';
    assert.strictEqual(actual, expected);
  });

  it('Should give first line of given files, as count is 1', () => {
    const files = ['a.txt', 'b.txt'];
    const contents = ['hello', 'bye'];
    const mockedReadFileSync = mockReadFileSync(files, contents);
    const actual = headMain(mockedReadFileSync, ['-n', '1', 'a.txt', 'b.txt']);
    const newLocal = '==> a.txt <==\nhello\n\n==> b.txt <==\nbye';
    assert.strictEqual(actual, newLocal);
  });

  it('Should throw usage, when no arguments are passed', () => {
    const mockedReadFileSync = mockReadFileSync([], []);
    const error = {
      message: getUsage()
    };
    assert.throws(() => headMain(mockedReadFileSync, []), error);
  });
});

exports.mockReadFileSync = mockReadFileSync;
