const fs = require('fs');
const { tailMain } = require('./src/tailLib.js');

const main = function () {
  const args = process.argv.slice(2);
  try {
    console.log(tailMain(fs.readFileSync, args));
  } catch (error) {
    console.error(error);
  }
};

main();
