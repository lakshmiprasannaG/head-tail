const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const HEAD_USAGE = 'usage: head [-n lines | -c bytes] [file ...]';

const main = function () {
  const filePath = process.argv[2];
  return filePath ? headMain(fs.readFileSync, filePath) : HEAD_USAGE;
};

console.log(main());
