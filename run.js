const alphabetize = require("./alphabetize");
const fs = require("fs");
const { _ } = require("yargs-parser")(process.argv.slice(2));
const filename = _[0];

const words = require(filename);

(() => {
  console.log(`Alphabetizing: ${filename}`);

  const alphabeticalOrder = alphabetize(words);

  console.log(`Alphabetical Order: `, alphabeticalOrder);
})();
