import externalGlobals from 'rollup-plugin-external-globals';
import { config } from '../../rollup-config';

export default config({
  input: ['./src/index.ts'],
  output: {
    format: 'amd',
  },
  external: ['typescript', 'react', 'react-dom'],
  plugins: [
    externalGlobals({
      typescript: 'window.ts',
      react: 'window.react',
      'react-dom': 'window.reactDOM',
    }),
  ],
});
