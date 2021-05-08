require('./check-options');
const fs = require("fs");
const { pipeline, Transform } = require('stream');
const options = require('./caesar-cli-options');
const access = require('./check-file-access');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const hasInputFile = access.checkAccess(options.input, "Enter a valid input file name");
const hasOutputFile = access.checkAccess(options.output, "Enter a valid output file name");

const makeCipher = (text, action, shift) => {
  let cipherText = ``;
  let cipherLetter;

  if (action === 'decode') {
    shift *= -1;
  }

  text.toString().split('').map((symbol) => {
    const shiftLetter = () => {
      const letterIndex = alphabet.indexOf(symbol.toLowerCase());

      if (symbol === symbol.toUpperCase()) {
        cipherLetter = alphabet[letterIndex + shift].toUpperCase();
      } else {
        cipherLetter = alphabet[letterIndex + shift];
      }
    };

    alphabet.includes(symbol.toLowerCase()) ? shiftLetter() : cipherLetter = symbol;

    cipherText += cipherLetter;
  });

  return cipherText;
}

const transformStream = (action, shift) => {
  return new Transform({
    transform(chunk) {
      const text = chunk.toString();
      this.push(makeCipher(text, action, shift));
    }
  });
};

const createReadStream = () => {
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
  
const createWriteStream = () => {
  let writeableStream;

  if (typeof options.output === `string`) {
    writeableStream = fs.createWriteStream(options.output);
  
    writeableStream.on("error", () => {
      process.stderr.write("Enter a valid output file name");
      process.exit(-1);
    });
  }

  return writeableStream;
}

pipeline(
  hasInputFile ? createReadStream() : process.stdin,
  transformStream(options.action, options.shift),
  hasOutputFile ? createWriteStream() : process.stdout,
  (error) => {
    if (error) {
      console.error('Pipeline error:', error);
      process.exit(-1);
    };
  }
);