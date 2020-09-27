// const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // extends: [
  //   'plugin:vue/recommended',
  //   // 'plugin:prettier/recommended',
  //   '@vue/typescript/recommended',
  //   // '@nuxtjs/eslint-config-typescript',
  //   // '@vue/airbnb'
  // ],
  extends: [
    // 'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
    'airbnb-base',
  ],
  // parserOptions: {
  //   ecmaVersion: 2020,
  //   sourceType: 'module',
  // },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 0, // it's got an eslint bug for now
    'global-require': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
  },
  // plugins: ['vue'],
  settings: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    'import/resolver': {
      alias: {
        // map: require('./aliases.config').eslint,
        // map: {
        //   '~': path.resolve(__dirname, 'src'),
        //   '@': path.resolve(__dirname, 'src'),
        // },
        extensions: ['.ts', '.js', '.vue', '.tsx', '.json', '.svg'],
      },
      node: {
        paths: ['src'],
        extensions: ['.ts', '.js', '.vue', '.tsx'],
      },
    },
  },
};
