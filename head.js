const fs = require('fs');
const { head } = require('./src/headLib.js');

const main = content => head(content);

const readFile = function (fileName) {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (error) {
    return 'usage: head [-n lines | -c bytes] [file ...]';
  }
};

const fileContent = readFile(process.argv[2]);

console.log(fileContent ? main(fileContent) : fileContent);
