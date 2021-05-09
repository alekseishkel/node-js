const fs = require("fs");
const options = require('./caesar-cli-options');

module.exports.createReadStream = () => {
  let readableStream;

  if (typeof options.input === `string`) {
    readableStream = fs.createReadStream(options.input, "utf8");

    readableStream.on("error", () => {
      process.stderr.write("Enter a valid input file name");
      process.exit(-1);
    });
  }

  return readableStream;
}

module.exports.createWriteStream = () => {
  let writeableStream;

  if (typeof options.output === `string`) {
    writeableStream = fs.createWriteStream(options.output, { flags: 'a' });

    writeableStream.on("error", () => {
      process.stderr.write("Enter a valid output file name");
      process.exit(-1);
    });
  }

  return writeableStream;
}