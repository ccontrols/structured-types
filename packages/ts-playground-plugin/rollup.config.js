import externalGlobals from 'rollup-plugin-external-globals';
import { config } from '../../rollup-config';

export default config({
  input: ['./src/index.ts'],
  output: {
    format: 'amd',
  },
  external: ['typescript', 'fs', 'path'],
  plugins: [externalGlobals({ typescript: 'window.ts' })],
});
