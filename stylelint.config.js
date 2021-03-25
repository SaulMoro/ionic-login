module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  ignoreFiles: ['coverage/**'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'extend',
          '/^layer/',
          '/^mixin/',
          '/^include/',
        ],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'extend',
          '/^layer/',
          '/^mixin/',
          '/^include/',
        ],
      },
    ],
    'no-empty-source': null,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
};
