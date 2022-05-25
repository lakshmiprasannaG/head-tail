const assert = require('assert');
const { tail } = require('./../src/tailLib.js');

describe.only('tail', () => {
  it('Should display first line', () => {
    assert.strictEqual(tail('hello', { count: 10, option: '-n' }), 'hello');
    assert.strictEqual(tail('bye', { count: 10, option: '-n' }), 'bye');
  });

  it('Should display multiple lines', () => {
    assert.strictEqual(tail('hello\nbye', { count: 10, option: '-n' }), 'hello\nbye');
    assert.strictEqual(tail('hey\nhello\nbuddy', { count: 10, option: '-n' }), 'hey\nhello\nbuddy');
  });

  it('Should display last n lines', () => {
    const content = 'hey\nhow\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    const expectation = 'how\nare\nyou\ndoing?\nI\nwould\nlike\nto\nmeet\nu';
    assert.strictEqual(tail(content, { count: 10, option: '-n' }), expectation);
    assert.strictEqual(tail(content, { count: 2, option: '-n' }), 'meet\nu');
  });

  it('Should display last n bytes', () => {
    const content = 'nice\nto\nmeet\nu';
    const expectation = '\nto\nmeet\nu';
    assert.strictEqual(tail(content, { count: 10, option: '-c' }), expectation);
    assert.strictEqual(tail(content, { count: 2, option: '-c' }), '\nu');
  });

});
