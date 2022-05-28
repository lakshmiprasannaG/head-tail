const assert = require('assert');
const { head, firstNLines, firstNBytes, readFile, createErrorMessage } = require('../src/headLib.js');
const { mockReadFileSync } = require('./testHeadMain.js');

describe('head', () => {
  it('Should display first line when count is 1, option is -n', () => {
    assert.strictEqual(head('hello', { count: 1, option: '-n' }), 'hello');
    assert.strictEqual(head('bye', { count: 1, option: '-n' }), 'bye');
  });

  it('Should display given count of lines, when option is -n', () => {
    const content = 'hey\nhow\nare\nyou\ndoing';
    assert.strictEqual(head('hello\nbye', { count: 2, option: '-n' }), 'hello\nbye');
    assert.strictEqual(head(content, { count: 10, option: '-n' }), content);
  });

  it('Should give all lines when count is greater than no.of lines of content, option is -n', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', { count: 5, option: '-n' }), 'hello\nbye\ngoodBye');
  });

  it('Should display first byte, when option is -c, count is 1', () => {
    assert.strictEqual(head('hello', { count: 1, option: '-c' }), 'h');
  });

  it('Should display first 5 bytes, when option is -c, count is 5', () => {
    assert.strictEqual(head('hello', { count: 5, option: '-c' }), 'hello');
  });

  it('Should display all bytes, when option is -c, if there are no enought bytes in content', () => {
    assert.strictEqual(head('hello', { count: 10, option: '-c' }), 'hello');
  });
});

describe('firstNLines', () => {
  it('Should give first line of the content, when count is 1', () => {
    assert.strictEqual(firstNLines('1', 1), '1');
    assert.strictEqual(firstNLines('1\n2', 1), '1');
  });

  it('Should give whole content, when count is greater than content no.of lines', () => {
    assert.strictEqual(firstNLines('1', 2), '1');
  });
});

describe('firstNBytes', () => {
  it('Should give first byte of the content, when count is 1', () => {
    assert.strictEqual(firstNBytes('1', 1), '1');
    assert.strictEqual(firstNBytes('123', 1), '1');
  });

  it('Should give whole content, when count is greater than content no.of lines', () => {
    assert.strictEqual(firstNBytes('1', 2), '1');
  });
});

describe('readFile', () => {
  it('Should read the given file and return contents', () => {
    const mockedReadFileSync = mockReadFileSync(['./a.txt'], ['hello']);
    const actual = readFile(mockedReadFileSync, './a.txt', 'utf8');
    const expected = { content: 'hello' };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('createErrorMessage', () => {
  it('Should give no file or directory error, when ENOENT errorCode is passsed', () => {
    const expected = 'head: a.txt: No such file or directory';
    const actual = createErrorMessage('ENOENT', 'a.txt');
    assert.strictEqual(actual, expected);
  });

  it('Should give error reading file error, when EISDIR errorCode is passed', () => {
    const actual = createErrorMessage('EISDIR', 'dir');
    const expected = 'head: Error reading dir';
    assert.strictEqual(actual, expected);
  });

  it('Should give permission denied error, when EACCES errorCode is passed', () => {
    const actual = createErrorMessage('EACCES', 'a.txt');
    const expected = 'head: a.txt: Permission denied';
    assert.strictEqual(actual, expected);
  });
});
