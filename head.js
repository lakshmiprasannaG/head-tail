const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = function (args) {
  try {
    console.log(headMain(fs.readFileSync, args));
  } catch (error) {
    console.error(error.message);
  }
};

main(process.argv.slice(2));
