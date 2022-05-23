const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should display first line', () => {
    assert.strictEqual(head('hello', {count: 10, option: '-n'}), 'hello');
    assert.strictEqual(head('bye', {count: 10, option: '-n'}), 'bye');
  });

  it('Should return first 10 lines', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet';
    assert.strictEqual(head(content, {count: 10, option: '-n'}), expectation);
  });

  it('Should display first line when count is 1, option is -n', () => {
    assert.strictEqual(head('hello', {count: 1, option: '-n'}), 'hello');
    assert.strictEqual(head('bye', {count: 1, option: '-n'}), 'bye');
  });

  it('Should display given count of lines, when option is -n', () => {
    const content = 'hey\nhow\nare\nyou\ndoing';
    assert.strictEqual(head('hello\nbye', {count: 2, option: '-n'}), 'hello\nbye');
    assert.strictEqual(head(content, {count: 10, option: '-n'}), content);
  });
  
  it('Should first 10 lines when count is 10, option is -n', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet';
    
    assert.strictEqual(head(content, {count: 10, option: '-n'}), expectation);
  });
  
  it('Should give first line only, when count is 1, option is -n', () => {
    assert.strictEqual(head('hello\nbye', {count: 1, option: '-n'}), 'hello');
  });
  
  it('Should give first two lines only, when count is 2, option is -n', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', {count: 2, option: '-n'}), 'hello\nbye');
  });
  
  it('Should give all lines when count is greater than number of lines, option is -n', () => {
    assert.strictEqual(head('hello\nbye\ngoodBye', {count: 5, option: '-n'}), 'hello\nbye\ngoodBye');
  });
  
  it('Should display first byte, when option is -c', () => {
    assert.strictEqual(head('hello', {count: 1, option: '-c'}), 'h');
  });
  
  it('Should display first 5 bytes, when option is -c', () => {
    assert.strictEqual(head('hello', {count: 5, option: '-c'}), 'hello');
  });
 
  it('Should display all bytes, when option is -c, if there are no enought bytes in content', () => {
    assert.strictEqual(head('hello', {count: 10, option: '-c'}), 'hello');
  });
});
