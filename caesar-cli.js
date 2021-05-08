const options = require('./caesar-cli-options');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const makeCipher = (text) => {
  let cipherText = ``;
  let cipherLetter;

  text.split('').map((symbol) => {
    const shiftLetter = () => {
      const letterIndex = alphabet.indexOf(symbol.toLowerCase());

      if (symbol === symbol.toUpperCase()) {
        cipherLetter = alphabet[letterIndex + options.shift].toUpperCase();
      } else {
        cipherLetter = alphabet[letterIndex + options.shift];
      }
    };

    alphabet.includes(symbol.toLowerCase()) ? shiftLetter() : cipherLetter = symbol;

    cipherText += cipherLetter;
  });
  console.log(cipherText);

  return cipherText;
}

makeCipher("123-1c-E/.", -1);