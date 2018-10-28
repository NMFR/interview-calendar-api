module.exports = {
  'env': {
    'browser': false,
    'jest': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
    'prettier'
  ],
  'plugins': ['prettier'],
  "rules": {
    "arrow-body-style": ["warn", "as-needed"],
    'prettier/prettier': ['error']
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  }
}
