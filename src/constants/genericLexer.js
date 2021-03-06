const moo = require('moo');

module.exports = moo.compile({
  color: {
    match: /(?:#(?:[0-9a-fA-F]{2}){2,4}|#[0-9a-fA-F]{3}|(?:rgba?|hsla?)\(\s*(?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s/]*[\d.]+%?\s*\))/,
    value: match => match.toLowerCase(),
  },
  number: /(?:[+-])?(?:(?:\d+\.\d*)|(?:\d*\.\d+))/,
  integer: /(?:[+-])?[0-9]+/,
  string: /(?:"[^"]")|(?:'[^']')/,
  functionStart: /[a-zA-Z]+\(/,
  customIdent: {
    match: /[^0-9\s](?:[a-zA-Z0-9_-]|(?:\\.))*/,
    value: match => match.toLowerCase(),
  },
  ident: {
    match: /[a-zA-Z-]+/,
    value: match => match.toLowerCase(),
  },
  char: {
    match: /./,
    value: match => match.toLowerCase(),
  },
});
