const assert = require('assert');
const { tail } = require('./../src/tailLib.js');

describe.only('tail', () => {
  it('Should display first line', () => {
    assert.strictEqual(tail('hello'), 'hello');
    assert.strictEqual(tail('bye'), 'bye');
  });

  it('Should display multiple lines', () => {
    assert.strictEqual(tail('hello\nbye'), 'hello\nbye');
    assert.strictEqual(tail('hey\nhello\nbuddy'), 'hey\nhello\nbuddy');
  });

});
