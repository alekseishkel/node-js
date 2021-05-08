argv = require('minimist')(process.argv.slice(2));

module.exports.shift = argv.s || argv.shift;
module.exports.input = argv.i || argv.input;
module.exports.output = argv.o || argv.output;
module.exports.action = argv.a || argv.action;
