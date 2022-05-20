const assert = require('assert');
const { head } = require('./../src/head.js');

describe('head', () => {
  it('Should display the content for single line content', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('Should display whole content when content is less than or equal to 10 lines', () => {
    const content = 'hey\nhow\nare\nyou\ndoing';
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
    assert.strictEqual(head(content), content);
    
  });

  it('Should give first 10 lines of the content', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet';

    assert.strictEqual(head(content), expectation);
  });
});