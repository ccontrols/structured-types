import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';
describe('async', () => {
  it('async', async () => {
    const props = analyzeFiles(
      [path.resolve(__dirname, `../../src/props-to-nodes.ts`)],
      {
        extract: ['propsToDocumentation'],
      },
    );
    const results = await propsToDocumentation(props);
    expect(results).toMatchSnapshot();
  });
});
