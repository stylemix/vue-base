import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import pkg from './package.json';

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const DEST = 'dist';
const MODULE_NAME = 'VueBase';

const BANNER = `/* ${pkg.name} v${pkg.version} (c) ${pkg.author} - ${pkg.license} */`;

const PLUGINS = [
  vue(),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  babel(),
];

function build(format, min, suffix = `${format}`) {
  let file = 'base' + (suffix ? '.' + suffix : '') + (min ? '.min' : '') + '.js';

  let plugins = format === 'es' ? [vue()] : PLUGINS;

  if (min) {
    plugins = plugins.concat(
      uglify({
        compress: true,
        output: {
          comments: new RegExp(`^ ${pkg.name}`)
        },
        sourcemap: true
      })
    )
  }

  return {
    input: 'index.js',
    cache: false,
    output: {
      dir: DEST,
      file: file,
      format: format,
      name: MODULE_NAME,
      indent: false,
      sourcemap: true,
      exports: 'named',
      banner: BANNER
    },
    plugins: plugins,
    external: [
      'vue',
      'vuedraggable',
      'blueimp-load-image',
      'vue-google-autocomplete',
      'vue-quill-editor',
      'vue-select',
    ]
  }
}

export default [
  // build('amd'),
  // build('cjs'),
  // build('es', false, 'esm'),
  // build('iife'),
  build('umd'),
  // build('system')
]
