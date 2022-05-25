const assert = require('assert');
const { parseArgs } = require('../src/parseArgs');

describe('parseArgs', () => {
  it('Should parse the fileName', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']), { files: ['./a.txt'], options: { option: '-n', count: 10 } });
  });

  it('Should parse -n option along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', './a.txt']), {
      files: ['./a.txt'], options: { option: '-n', count: 2 }
    });
  });

  it('Should parse -n option along with multiple files', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', './a.txt', './b.txt']), { files: ['./a.txt', './b.txt'], options: { option: '-n', count: 2 } });
  });

  it('Should parse -c option along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', './a.txt']), {
      files: ['./a.txt'], options: { option: '-c', count: 2 }
    });
  });

  it('Should parse -c option along with multiple files', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', './a.txt', './b.txt']), {
      files: ['./a.txt', './b.txt'], options: { option: '-c', count: 2 }
    });
  });

  it('Should parse multiple files', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt', './b.txt']), { files: ['./a.txt', './b.txt'], options: { option: '-n', count: 10 } });
  });

  it('Should parse when count is being concatinated with option', () => {
    assert.deepStrictEqual(parseArgs(['-n2', './a.txt']), { files: ['./a.txt'], options: { option: '-n', count: '2' } });
    assert.deepStrictEqual(parseArgs(['-c2', './a.txt']), { files: ['./a.txt'], options: { option: '-c', count: '2' } });
  });

  it('Should parse when option and count are passed as -count', () => {
    assert.deepStrictEqual(parseArgs(['-2', './a.txt']), { files: ['./a.txt'], options: { option: '-n', count: '2' } });
    assert.deepStrictEqual(parseArgs(['-22', './a.txt']), { files: ['./a.txt'], options: { option: '-n', count: '22' } });
  });

  it('Should take last option when similar options are passed multiple times', () => {
    assert.deepStrictEqual(parseArgs(['-n2', '-n1', 'a.txt']), { files: ['a.txt'], options: { option: '-n', count: '1' } });

    assert.deepStrictEqual(parseArgs(['-c2', '-c1', 'a.txt']), { files: ['a.txt'], options: { option: '-c', count: '1' } });
  });

  it('Should throw error when negative count is passed', () => {
    const error = {
      message: 'head: Illegal count -- -2'
    };
    assert.throws(() => parseArgs(['-n', '-2', 'a.txt']), error);
  });

  it('Should throw error when "-c" and "-n", both options are passed', () => {
    const error = {
      // eslint-disable-next-line quotes
      message: "head: can't combine line and byte counts"
    };
    assert.throws(() => parseArgs(['-n2', '-c2', 'a.txt']), error);
  });
});
