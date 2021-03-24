const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config;
};
