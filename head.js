const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const HEAD_USAGE = 'usage: head [-n lines | -c bytes] [file ...]';

const main = function () {
  const args = process.argv.slice(2);
  return args.length ? headMain(fs.readFileSync, args) : HEAD_USAGE;
};

console.log(main());
