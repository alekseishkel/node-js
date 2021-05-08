require('./check-options');
const fs = require("fs");
const { pipeline, Transform } = require('stream');
const options = require('./caesar-cli-options');
const access = require('./check-access');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const hasInputFile = access.checkAccess(options.input);
const hasOutputFile = access.checkAccess(options.output);

const makeCipher = (text, action, shift) => {
  let cipherText = ``;
  let cipherLetter;
  
  if (action === 'decode') {
    console.log(action);
    shift *= -1;
  }
  console.log(shift);

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

pipeline(
  hasInputFile ? fs.createReadStream("input.txt", "utf8") : process.stdin,
  transformStream(options.action, options.shift),
  hasOutputFile ? fs.createWriteStream("output.txt") : process.stdout,
  (error) => {
    if (error) {
      console.error('Pipeline error:', error);
    };
  }
);