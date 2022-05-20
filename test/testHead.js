const assert = require('assert');
const { head, headMain } = require('../src/headLib.js');

describe('head', () => {
  it('Should display first line when count is 1', () => {
    assert.strictEqual(head('hello', {count: 1}), 'hello');
    assert.strictEqual(head('bye', {count: 1}), 'bye');
  });

  it('Should display given count of lines', () => {
    const content = 'hey\nhow\nare\nyou\ndoing';
    assert.strictEqual(head('hello\nbye', {count: 2}), 'hello\nbye');
    assert.strictEqual(head(content, {count: 10}), content);
    
  });

  it('Should first 10 lines when count is 10', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet';

    assert.strictEqual(head(content, {count: 10}), expectation);
  });

  it('Should give first line only, when count is 1', () => {
    assert.strictEqual(head('hello\nbye', {count: 1}), 'hello');
  });

  it('Should give first two lines only, when count is 2', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', {count: 2}), 'hello\nbye');
  });
  
  it('Should give all lines when count is greater than number of lines', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', {count: 5}), 'hello\nbye\ngoodBye');
  });
});

const mockReadfileSync = function (expectedFilePath, content) {
  return function (filePath) {
    assert.strictEqual(filePath, expectedFilePath);
    return content;
  };
};

describe('headMain', () => {
  it('Should give first line of given file, as count is 1', () => {
    const mockedReadFileSync = mockReadfileSync('./a.txt', 'hello');    
    assert.strictEqual(headMain(mockedReadFileSync, './a.txt', 1), 'hello');
  });
  
});
