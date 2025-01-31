module.exports = {
  baseUrl: '.',
  // include: ['src/**/*'],
  compilerOptions: {
    target: 'esnext',
    module: 'esnext',
    strict: true,
    jsx: 'preserve',
    noEmit: true,
    importHelpers: true,
    moduleResolution: 'node',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    sourceMap: true,
    baseUrl: '.',
    types: [
      'webpack-env',
    ],
    lib: [
      'esnext',
      'dom',
      'dom.iterable',
      'scripthost',
    ],
  },
  include: [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.vue',
    'tests/**/*.ts',
    'tests/**/*.tsx',
  ],
  exclude: [
    'node_modules',
  ],
};
