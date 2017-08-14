const nearley = require('nearley');
// TODO: don't require mdn-data at runtime
const { css: { properties } } = require('mdn-data');
const { PATHS, CSS } = require('./constants');

/**
 * Checks if the given property, value pair is valid.
 *
 * @param {String} property - the property name. For example, 'border' or 'color'.
 * @param {String} value - the property value. For example, '1px solid black'.
 * @return {boolean} - true if the given value is valid for the property. Else, false.
 */
module.exports = function isValidDeclaration(property, value) {
  if (!properties[property]) {
    return false;
  } else if (CSS.globalValues.includes(value)) {
    return true;
  }

  // eslint-disable-next-line import/no-dynamic-require
  const propertyGrammar = require(`${PATHS.GENERATED_JS_GRAMMAR_PATH}${property}.js`);

  try {
    const parser = new nearley.Parser(propertyGrammar.ParserRules, propertyGrammar.ParserStart).feed(value);
    return !!parser.results.length;
  } catch (parseError) {
    return false;
  }
};
