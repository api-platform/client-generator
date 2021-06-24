module.exports = {
  'env': {
    'es6': true,
    'jest': true,
    'node': true,
    'browser': true
  },
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module'
  },
  'plugins': ['import'],
  'extends': [
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  'rules': {
    'prettier/prettier': 'error',
    'no-console': 0,
    'no-extra-semi': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-unexpected-multiline': 'off',
  }
};
