const assert = require('assert');
const { parseArgs } = require('../src/parseArgs');

describe.only('parseArgs', () => {
  it('Should parse the fileName', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']), { files: ['./a.txt'], count: 10, delimiter: '\n' });
  });
  
  it('Should parse -n option along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', './a.txt']), {
      files: ['./a.txt'],
      count: 2,
      delimiter: '\n'
    });
  });
  
  it('Should parse -n option along with multiple files', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', './a.txt', './b.txt']), {
      files: ['./a.txt', './b.txt'],
      count: 2,
      delimiter: '\n'
    });
  });
  
  it('Should parse -c option along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', './a.txt']), {
      files: ['./a.txt'],
      count: 2,
      delimiter: ''
    });
  });
  
  it('Should parse -c option along with multiple files', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', './a.txt', './b.txt']), {
      files: ['./a.txt', './b.txt'],
      count: 2,
      delimiter: ''
    });
  });
});
