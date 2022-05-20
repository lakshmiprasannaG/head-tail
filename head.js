const fs = require('fs');
const { head } = require('./src/headLib.js');

const main = content => head(content);

const readFile = function (fileName) {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (error) {
    throw 'usage: head [-n lines | -c bytes] [file ...]';
  }
};

try {
  console.log(main(readFile(process.argv[2])));
} catch (error) {
  console.log(error);
}
