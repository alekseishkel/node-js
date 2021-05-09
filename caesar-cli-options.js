const { program } = require('commander');

program
  .option('-s --shift <shift>', 'a cipher shift')
  .option('-i --input <file>', 'an input file')
  .option('-o --output <file>', 'an output file')
  .option('-a --action <action>', 'an action encode/decode')
  .parse(process.argv);

const { shift, input, output, action} = program.opts();

module.exports = {
  shift,
  input,
  output,
  action
}
