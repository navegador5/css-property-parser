/**
 * Format each formal syntax into a json grammar
 */
const fs = require('fs-extra');
const { css: { properties, syntaxes } } = require('mdn-data');
const { PATHS, SYNTAX_OVERRIDES } = require('./constants');
const JsonGrammarFormatter = require('./formatters/grammarFormatters/JsonGrammarFormatter');

// array of syntax/property names that require manual generation.
// TODO: export this property and check that manual syntax jsons exist in pre commit
const manualSyntaxes = ['image()', 'offset', 'shape', 'frames-timing-function', 'feature-value-declaration', 'cubic-bezier-timing-function', 'rgb()', 'rgba()', 'hsl()', 'hsla()', 'flex', 'background', 'final-bg-layer'];

// combine properties and syntaxes into one object mapping property names to syntaxes
const syntaxesSyntaxMap = Object.entries(syntaxes)
  .reduce((syntaxMap, [name, { syntax }]) => Object.assign({ [name]: syntax }, syntaxMap), {});
const propertySyntaxMap = Object.entries(properties).reduce((syntaxMap, [propertyName, { syntax }]) => (
  Object.assign({ [propertyName]: syntax }, syntaxMap)
), syntaxesSyntaxMap);
const overridenPropertySyntaxMap = Object.assign(propertySyntaxMap, SYNTAX_OVERRIDES);

// make the json grammar directory if needed
if (!fs.existsSync(PATHS.GENERATED_JSON_GRAMMAR_PATH)) {
  fs.mkdirSync(PATHS.GENERATED_JSON_GRAMMAR_PATH);
}

Object.entries(overridenPropertySyntaxMap)
// filter out any entries that we need to do manually
  .filter(([grammarName]) => !manualSyntaxes.includes(grammarName))
  .forEach(([grammarName, formalSyntax]) => {
    console.log(`creating ${PATHS.GENERATED_JSON_GRAMMAR_PATH}${grammarName}.json`);
    const jsonGrammar = JsonGrammarFormatter.format(formalSyntax);
    fs.writeJson(`${PATHS.GENERATED_JSON_GRAMMAR_PATH}${grammarName}.json`, jsonGrammar, { spaces: 2 });
  });
