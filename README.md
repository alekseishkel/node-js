# Node.JS Caesar Cipher CLI

Encryption/decryption application using the Caesar cipher. Encrypts only latin letters, leaving all other characters unchanged.

## Installation

1. Download or clone this repository - https://github.com/alekseishkel/node-js/tree/1-task/caesar-cli
2. Change branch to `1-task/caesar-cli` if the repository is cloned
3. Enter command `npm i/npm install`

## Usage

Command string:

`node caesar-cli <options>`

Options:

- `-s, --shift` - a cipher shift. Negative or positive integer (Required);
- `-a, --action` - an action. Use `encode` or `decode` as the type of action (Required).
- `-i, --input` - an input file name. (Optional). If you don't use this option, then the text is inputed in the console;
- `-o, --output` - an output file name. (Optional). If you don't use this option, then the text is outputed in the console;

The options can be used in any order.

## Usage examples:

`$ node caesar-cli --action encode --shift 28 --input "./input.txt" --output "./output.txt"`

`$ node caesar-cli --action encode --shift -28 --input input.txt --output output.txt`

`$ node caesar-cli --action decode -s 28 --input "./input.txt" --output "./output.txt"`

`$ node caesar-cli -a encode -s 28 -i input.txt -o output.txt`

`$ node caesar-cli -a encode -s 28 -i input.txt`

`$ node caesar-cli -a encode -s 28 -o output.txt`

`$ node caesar-cli -a encode -s 28`
