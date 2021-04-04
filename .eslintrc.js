module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: { _: true },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier/prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'object-curly-newline': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'warn',
    camelcase: 'off',
    'no-console': ['warn', { allow: ['tron'] }],
    'comma-dangle': 'off'
  }
};
