const options = require('./caesar-cli-options');

if (options.action === undefined) {
  console.error("Action is required. Enter encode or decode as type of action.");
  process.exit(-1);
}

if (options.shift === undefined) {
  console.error("Shift is required.");
  process.exit(-1);
}

if (typeof options.input !== `string` && options.input !== undefined) {
  console.error("Enter a valid input file name");
  process.exit(-1);
}

if (typeof options.output !== `string` && options.output !== undefined) {
  console.error("Enter a valid output file name");
  process.exit(-1);
}