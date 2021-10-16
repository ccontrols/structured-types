import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: ['./src/index.tsx'],
  output: [
    {
      file: 'dist/bundle.js',
      name: 'App',
      format: 'iife',
      sourcemap: true,
      assetFileNames: '[name]-[hash][extname]',
    },
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
      browser: true,
    }),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      preventAssignment: true,
    }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    commonjs({
      include: /\/node_modules\//,
    }),
    typescript(),
  ],
};
