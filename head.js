const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = function () {
  const args = process.argv.slice(2);
  try {
    console.log(headMain(fs.readFileSync, args));
  } catch (error) {
    console.error(error);
  }
};

main();
