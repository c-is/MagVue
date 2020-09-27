const path = require('path');
const fs = require('fs');
const prettier = require('prettier');

const aliases = {
  '@app/actions': 'src/actions',
  '@app/components': 'src/components',
  '@app/constants': 'src/constants',
  '@app/reducers': 'src/reducers',
  '@app/types': 'src/types',
  '@app/utils': 'src/utils',
  '@app/svgs': 'src/svgs',
  '@app/layouts': 'src/layouts',
  '@app/pages': 'src/pages',
  '@app/factories': 'src/factories',
  '@app/theme': 'src/theme',
};

module.exports = {
  webpack: {},
  eslint: [],
  // typescript: {},
  jest: {},
  tsconfig: {},
};

function resolveSrc(_path) {
  return path.resolve(__dirname, _path);
}

/* eslint "no-restricted-syntax": 0 */
/* eslint "guard-for-in": 0 */
for (const alias in aliases) {
  const aliasTo = aliases[alias];
  module.exports.webpack[alias] = resolveSrc(aliasTo);
  module.exports.eslint.push([alias, resolveSrc(aliasTo)]);
  const aliasHasExtension = /\.\w+$/.test(aliasTo);
  module.exports.jest[`^${alias}$`] = aliasHasExtension
    ? `<rootDir>/${aliasTo}`
    : `<rootDir>/${aliasTo}/index.js`;
  module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`;
  // module.exports.tsconfig[alias + '/**/*'] = [aliasTo + '/**/*']
  module.exports.tsconfig[`${alias}/*`] = [`${aliasTo}/*`];
  module.exports.tsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
      `${aliasTo}/index.ts`,
      `${aliasTo}/index.json`,
      `${aliasTo}/index.tsx`,
      `${aliasTo}/index.vue`,
      `${aliasTo}/index.css`,
    ];
}

module.exports.tsconfig['@app/theme'] = ['src/theme.ts'];

const tsconfigTemplate = require('./tsconfig.template') || {};

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

if (!fs.existsSync(tsconfigPath)) {
  fs.writeFile(
    tsconfigPath,
    prettier.format(
      JSON.stringify({
        ...tsconfigTemplate,
        compilerOptions: {
          ...(tsconfigTemplate.compilerOptions || {}),
          paths: module.exports.tsconfig,
        },
      }),
      {
        ...require('./.prettierrc'),
        parser: 'json',
      },
    ),
    error => {
      if (error) {
        console.error(
          'Error while creating tsconfig.json from aliases.config.js.',
        );
        throw error;
      }
    },
  );
}
