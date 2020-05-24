import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const globals = {
  cesium: 'Cesium',
}

export default [
  {
    input: 'src/viewerCesiumMultiItemPickerMixin.js',
    output: [
      {
        file: pkg.browser,
        format: 'iife',
        name: 'viewerCesiumNavigationMixin',
        globals
      }
    ],
    external: Object.keys(globals),
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**']
      })
    ]
  },
  {
    input: 'src/viewerCesiumMultiItemPickerMixin.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
];