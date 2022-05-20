const assert = require('assert');
const { head } = require('./../src/head.js');

describe('head', () => {
  it('Should display the content for single line content', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('Should display whole content when content is less than or equal to 10 lines', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
    assert.strictEqual(head('hey\nhow\nare\nyou\ndoing'), 'hey\nhow\nare\nyou\ndoing');
  });
});
