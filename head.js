const fs = require('fs');
const { head } = require('./src/headLib.js');

const main = content => head(content);

const headUsage = 'usage: head [-n lines | -c bytes] [file ...]';

const filePath = process.argv[2];
console.log(filePath ? main(fs.readFileSync(filePath, 'utf8')) : headUsage);
