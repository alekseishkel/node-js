const options = require('./caesar-cli-options');
const numberShift = parseInt(options.shift, 10);

if (options.action === undefined) {
  process.stderr.write("Action is required. Enter encode or decode as type of action.");
  process.exit(-1);
}

if (options.action !== `encode` && options.action !== `decode`) {
  process.stderr.write("Enter encode or decode as type of action.");
  process.exit(-1);
}

if (options.shift === undefined) {
  process.stderr.write("Shift is required.");
  process.exit(-1);
}

if (!Number.isInteger(numberShift)) {
  process.stderr.write("Shift must be an integer.");
  process.exit(-1);
}

if (typeof options.input !== `string` && options.input !== undefined) {
  process.stderr.write("Enter a valid input file name");
  process.exit(-1);
}

if (typeof options.output !== `string` && options.output !== undefined) {
  process.stderr.write("Enter a valid output file name");
  process.exit(-1);
}