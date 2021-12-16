import { config } from '../../rollup-config';

export default config({
  external: ['typescript'],
  input: ['./src/index.ts'],
});
