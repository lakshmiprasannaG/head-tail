const assert = require('assert');
const { head, headMain } = require('../src/headLib.js');

describe('head', () => {
  it('Should display first line when count and byte are not specified', () => {
    assert.strictEqual(head('hello', {}), 'hello');
    assert.strictEqual(head('bye', {}), 'bye');
  });

  it('Should return first 10 lines when count and byte are not specified', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet';
    assert.strictEqual(head(content, {count: 10, delimiter: '\n'}), expectation);
  });

  it('Should display first line when count is 1', () => {
    assert.strictEqual(head('hello', {count: 1, delimiter: '\n'}), 'hello');
    assert.strictEqual(head('bye', {count: 1, delimiter: '\n'}), 'bye');
  });

  it('Should display given count of lines', () => {
    const content = 'hey\nhow\nare\nyou\ndoing';
    assert.strictEqual(head('hello\nbye', {count: 2, delimiter: '\n'}), 'hello\nbye');
    assert.strictEqual(head(content, {count: 10, delimiter: '\n'}), content);
  });
  
  it('Should first 10 lines when count is 10', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet';
    
    assert.strictEqual(head(content, {count: 10, delimiter: '\n'}), expectation);
  });
  
  it('Should give first line only, when count is 1', () => {
    assert.strictEqual(head('hello\nbye', {count: 1, delimiter: '\n'}), 'hello');
  });
  
  it('Should give first two lines only, when count is 2', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', {count: 2, delimiter: '\n'}), 'hello\nbye');
  });
  
  it('Should give all lines when count is greater than number of lines', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', {count: 5, delimiter: '\n'}), 'hello\nbye\ngoodBye');
  });
  
  it('Should display first byte', () => {
    assert.strictEqual(head('hello', {count: 1, delimiter: ''}), 'h');
  });
  
  it('Should display first 5 bytes', () => {
    assert.strictEqual(head('hello', {count: 5, delimiter: ''}), 'hello');
  });
 
  it('Should display all bytes, if there are no enought bytes in content', () => {
    assert.strictEqual(head('hello', {count: 10, delimiter: ''}), 'hello');
  });
});

const mockReadfileSync = function (expectedFilePath, content) {
  return function (filePath) {
    assert.deepStrictEqual(filePath, expectedFilePath);
    return content;
  };
};

describe('headMain', () => {
  it('Should give first line of given file, as count is 1', () => {
    const mockedReadFileSync = mockReadfileSync('./a.txt', 'hello');    
    assert.strictEqual(headMain(mockedReadFileSync, ['-n', '1', './a.txt']), 'hello');
  });
  
  it('Should give first line of given files, as count is 1', () => {
    const mockedReadFileSync = mockReadfileSync('./a.txt', 'hello');    
    assert.strictEqual(headMain(mockedReadFileSync, ['-n', '1', './a.txt', './a.txt']), 'hello\n\n\nhello');
  });
});
