const fs = require("fs");
const { pipeline, Transform } = require('stream');
const options = require('./caesar-cli-options');
const access = require('./chech-access');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const hasInputFile = access.checkAccess(options.input);
const hasOutputFile = access.checkAccess(options.output);

const makeCipher = (text, shift) => {
  let cipherText = ``;
  let cipherLetter;

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

const transformStream = (shift) => {
  return new Transform({
    transform(chunk) {
      const text = chunk.toString();
      this.push(makeCipher(text, shift));
    }
  });
};

pipeline(
  hasInputFile ? fs.createReadStream("input.txt", "utf8") : process.stdin,
  transformStream(options.shift),
  hasOutputFile ? fs.createWriteStream("output.txt") : process.stdout,
  (error) => {
    if (error) {
      console.error('Pipeline error:', error);
    };
  }
);