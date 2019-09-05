/*eslint-env node*/
module.exports = {
  root: true,
  extends: [
    // add more generic rulesets here, such as:
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/no-redundant-jump': 'off',
  },
  globals: {
    globalThis: false, // means it is not writeable
  },
  plugins: ['sonarjs'],
}
