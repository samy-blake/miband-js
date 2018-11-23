import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import filesize from 'rollup-plugin-filesize'
import json from 'rollup-plugin-json'
import sourcemaps from 'rollup-plugin-sourcemaps'


export default {
  input: 'src/miband.lib.js',
  output: {
    file:   'lib/miband.lib.js',
    format: 'iife',
    name:   'MiBandLib'
  },
  sourceMap: true,
  plugins: [
    eslint({
      throwOnError: true,
      exclude: [ './node_modules/**', './src/styles/**' ]
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    json(),
    commonjs(),
    globals(),
    builtins(),
    filesize(),
    sourcemaps()
  ]
}
