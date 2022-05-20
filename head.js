const fs = require('fs');
const { head } = require('./src/headLib.js');

const main = content => head(content);

const fileName = process.argv[2];
console.log(main(fs.readFileSync(fileName, 'utf8')));

console.log('usage: head [-n lines | -c bytes] [file ...]');
