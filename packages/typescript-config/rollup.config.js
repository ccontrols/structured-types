import resolve from '@rollup/plugin-node-resolve';
import { config } from '../../rollup-config';

export default config({
  external: ['typescript'],
  input: ['./src/index.ts'],
  plugins: [resolve({ browser: true })],
});
