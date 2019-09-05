/*eslint-env node*/
module.exports = {
  extends: ['stylelint-config-recommended-vue'],
  defaultSeverity: 'warning',
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['amplify-authenticator'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'extend',
          'include',
          'mixin',
        ],
      },
    ],
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }],
    'no-invalid-double-slash-comments': true,
  },
}
