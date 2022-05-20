const assert = require('assert');
const { head } = require('./../src/head.js');

describe('head', () => {
  it('Should display the content for single line content', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
});
