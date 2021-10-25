import externalGlobals from 'rollup-plugin-external-globals';
import resolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { config } from '../../rollup-config';

export default config({
  input: ['./src/index.ts'],
  output: {
    format: 'amd',
  },
  external: ['typescript', 'react', 'react-dom'],
  plugins: [
    nodePolyfills(),
    resolve({
      mainFields: ['module', 'main'],
      browser: true,
      preferBuiltins: false,
    }),
    externalGlobals({
      typescript: 'window.ts',
      react: 'window.react',
      'react-dom': 'window.reactDOM',
    }),
  ],
});
