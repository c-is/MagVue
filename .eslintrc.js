// const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    // es6: true,
  },
  // extends: [
  //   'plugin:vue/recommended',
  //   // 'plugin:prettier/recommended',
  //   '@vue/typescript/recommended',
  //   // '@nuxtjs/eslint-config-typescript',
  //   // '@vue/airbnb'
  // ],
  // parserOptions: {
  //   // parser: '@typescript-eslint/parser',
  //   project: './tsconfig.json'
  // },
  // plugins: [
  //   '@typescript-eslint',
  //   '@typescript-eslint/eslint-plugin'
  // ],
  extends: [
    // 'eslint:recommended',
    // 'airbnb-typescript/base',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:nuxt/recommended'
    'airbnb-base',
    '@nuxtjs/eslint-config-typescript',
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
    semi: [2, 'always'],
    'comma-dangle': 0,
    'vue/require-default-prop': 0,
    'space-before-function-paren': 0,
    curly: 0,
    'import/prefer-default-export': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      ts: 'never',
    }]
  },
  // plugins: ['vue'],
  settings: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
        ts: 'never'
      }
    ],
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    'import/resolver': {
      typescript: {},
      alias: {
        // map: require('./aliases.config').eslint,
        // map: {
        //   '~': path.resolve(__dirname, 'src'),
        //   '@': path.resolve(__dirname, 'src'),
        // },
        extensions: ['.ts', '.js', '.vue', '.tsx', '.json', '.svg']
      },
      node: {
        paths: ['src'],
        extensions: ['.ts', '.js', '.vue', '.tsx']
      }
    }
  }
};
