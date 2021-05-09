require('./check-options');
const { pipeline, Transform } = require('stream');
const options = require('./caesar-cli-options');
const access = require('./check-file-access');
const streams = require('./create-streams');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const hasInputFile = access.checkAccess(options.input, "Enter a valid input file name");
const hasOutputFile = access.checkAccess(options.output, "Enter a valid output file name");

const makeCipher = (text, action, shift) => {

  let cipherText = ``;
  let cipherLetter;

  shift %= 26;

  if (action === 'decode') {
    shift *= -1;
  }

  text.toString().split('').map((symbol) => {
    const shiftLetter = () => {
      const letterIndex = alphabet.indexOf(symbol.toLowerCase());
      let cipherLetterIndex = letterIndex + shift;

      if (cipherLetterIndex > 25) {
        cipherLetterIndex %= 26;
      }

      if (cipherLetterIndex < 0) {
        cipherLetterIndex += 26;
        cipherLetterIndex %= 26;
      }
      
      if (symbol === symbol.toUpperCase()) {
        cipherLetter = alphabet[cipherLetterIndex].toUpperCase();
      } else {
        cipherLetter = alphabet[cipherLetterIndex];
      }
    };

    alphabet.includes(symbol.toLowerCase()) ? shiftLetter() : cipherLetter = symbol;

    cipherText += cipherLetter;
  });

  return cipherText;
}

const transformStream = (action, shift) => {
  return new Transform({
    transform(chunk, _, callback) {
      const text = chunk.toString();
      this.push(makeCipher(text, action, shift));
      callback();
    }
  });
};

pipeline(
  hasInputFile ? streams.createReadStream() : process.stdin,
  transformStream(options.action, options.shift),
  hasOutputFile ? streams.createWriteStream() : process.stdout,
  (error) => {
    if (error) {
      console.error('Pipeline error:', error);
      process.exit(-1);
    };
  }
);
