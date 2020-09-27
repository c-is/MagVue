// const path = require('path');
// const config = require('./config.json');
import path from 'path';
import remark from 'remark';
import remarkExcerpt from 'remark-excerpt';
import retextStringify from 'retext-stringify';
// import theme from './theme.json';
import config from './config.json';

// const isDebug = global.DEBUG === false ? false : !process.argv.includes('production');

export default {
  srcDir: 'src/',
  // ssr: false,
  target: 'static',
  head: {
    title: 'test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  // generate: {
  //   async routes() {
  //     const { $content } = require('@nuxt/content');
  //     const files = await $content({ deep: true }).only(['path']).fetch();

  //     return files.map(file => file.path === '/index' ? '/' : file.path);
  //   },
  // },
  styleResources: {
    postcss: [
      '~/css/_mixins.css',
      '~/css/_variables.css',
      '~/css/_theme.css',
    ],
  },
  css: [
    'normalize.css',
    '@/css/style.css',
    'aos/dist/aos.css',
  ],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },
  plugins: [
    '~/plugins/VTilt',
    // '~/plugins/VAnimateScroll',
    '~/plugins/VFragment',
    '~/plugins/VLoadScript',
  ],
  modules: [
    'nuxt-svg-loader',
    '@nuxt/content',
    // '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/stylelint-module',
    // '@nuxt/typescript-build',
  ],
  // axios: {
  //   proxy: true,
  //   baseURL: 'http://localhost:3000', // Used as fallback if no runtime config is provided
  // },
  content: {
    liveEdit: false,
    nestedProperties: ['type.value', 'categories.type'],
  },
  stylelint: {
    configFile: path.resolve(__dirname, 'stylelint.config.js'),
  },
  publicRuntimeConfig: {
    // axios: {
    //   browserBaseURL: process.env.BROWSER_BASE_URL,
    // },
    ...config,
    // ...theme,
  },
  privateRuntimeConfig: {
    // axios: {
    //   baseURL: process.env.BASE_URL,
    // },
  },
  hooks: {
    'content:file:beforeInsert': async document => {
      if (document.extension === '.md') {
        const processed = await remark()
          .use(remarkExcerpt)
          .use(retextStringify)
          .process(document.text);
        // eslint-disable-next-line
        document.excerpt = processed.contents;
      }
    },
  },
  router: {
    routeNameSplitter: '/',
  },
  build: {
    transpile: [
      'vue-plugin-load-script',
      'gsap/ScrollToPlugin',
    ],
    postcss: {
      plugins: [
        require('postcss-import')(),
        require('postcss-custom-properties')({
          preserve: true,
          // importFrom: [
          //   // './src/css/_variables.css',
          //   () => {
          //     const { colours } = theme;
          //     const customProperties = {};
          //     colours.forEach(colour => (
          //   { customProperties[`--${colour.key}`] = `${colour.value}`; }
          // ));
          //     console.log('custom', customProperties);
          //     return { customProperties };
          //   },
          // ],
          // exportTo: './src/css/_theme.css',
        }),
        require('postcss-apply')(),
        require('postcss-custom-media')({
          importFrom: [
            './src/css/_breakpoints.css',
          ],
        }),
        require('postcss-media-minmax')(),
        require('postcss-custom-selectors')(),
        require('postcss-calc')(),
        require('postcss-nesting')(),
        require('postcss-nested')(),
        require('postcss-each')(),
        require('postcss-color-mod-function')(),
        require('pleeease-filters')(),
        require('postcss-selector-matches')(),
        require('postcss-selector-not')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(),
        require('cssnano')(),
        require('postcss-reporter')(),
      ],
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   config.resolve.alias['@app/**/*'] = path.join(this.buildContext.options.srcDir, './**/*');

    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //     });
    //   }
    // },
  },
};
