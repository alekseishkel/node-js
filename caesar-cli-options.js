argv = require('minimist')(process.argv.slice(2));

module.exports.shift = argv.s || argv.shift;
