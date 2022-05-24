const assert = require('assert');
const { parseArgs } = require('../src/parseArgs');

describe('parseArgs', () => {
  it('Should parse the fileName', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']), { files: ['./a.txt'], count: 10, option: '-n' });
  });
  
  it('Should parse -n option along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', './a.txt']), {
      files: ['./a.txt'],
      count: 2,
      option: '-n'
    });
  });
  
  it('Should parse -n option along with multiple files', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', './a.txt', './b.txt']), {
      files: ['./a.txt', './b.txt'],
      count: 2,
      option: '-n'
    });
  });
  
  it('Should parse -c option along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', './a.txt']), {
      files: ['./a.txt'],
      count: 2,
      option: '-c'
    });
  });
  
  it('Should parse -c option along with multiple files', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', './a.txt', './b.txt']), {
      files: ['./a.txt', './b.txt'],
      count: 2,
      option: '-c'
    });
  });
  
  it('Should parse multiple files', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt', './b.txt']), { files: ['./a.txt', './b.txt'], count: 10, option: '-n' });
  });

  it('Should parse when count is being concatinated with option', () => {
    assert.deepStrictEqual(parseArgs(['-n2', './a.txt']), {files: ['./a.txt'], count: '2', option: '-n'});
    assert.deepStrictEqual(parseArgs(['-c2', './a.txt']), {files: ['./a.txt'], count: '2', option: '-c'});
  });
  
  it('Should parse when option and count are passed as -count', () => {
    assert.deepStrictEqual(parseArgs(['-2', './a.txt']), {files: ['./a.txt'], count: '2', option: '-n'});
    assert.deepStrictEqual(parseArgs(['-22', './a.txt']), {files: ['./a.txt'], count: '22', option: '-n'});
  });

  it('Should take last option when similar options are passed multiple times', () => {
    assert.deepStrictEqual(parseArgs(['-n2', '-n1', 'a.txt']), {files: ['a.txt'], count: '1', option: '-n'});
    
    assert.deepStrictEqual(parseArgs(['-c2', '-c1', 'a.txt']), {files: ['a.txt'], count: '1', option: '-c'});
  });

  it('Should throw error when negative count is passed', () => {
    const error = {
      message: 'Illegal count -- -2'
    };
    assert.throws(() => parseArgs(['-n', '-2', 'a.txt']), error);
  });
  
  it('Should throw error when "-c" and "-n", both options are passed', () => {
    const error = {
      message: 'Cannot combine counts'
    };
    assert.throws(() => parseArgs(['-n2', '-c2', 'a.txt']), error);
  });
});
