import path from 'path';
import { parseFiles, isTypeProp, isObjectProp } from '@structured-types/api';
import reactPlugin from '../../src';

describe('insta-docs', () => {
  it('document', () => {
    const result = parseFiles([path.resolve(__dirname, 'document.docs.tsx')], {
      collectSourceInfo: true,
      plugins: [],
    });
    if (isObjectProp(result.default)) {
      const component = result.default.properties?.find(
        (p) => p.name === 'component',
      );
      if (component && isTypeProp(component) && component.value) {
        const componentFile = component.value.loc?.filePath;
        if (componentFile) {
          const componentProps = parseFiles([componentFile], {
            extract: component.value.name ? [component.value.name] : undefined,
            plugins: [reactPlugin],
          });
          expect(componentProps).toMatchObject({
            MyComponent: {
              name: 'MyComponent',
              extension: 'react',
              kind: 25,
              properties: [
                {
                  name: 'name',
                  parent: {
                    name: 'MyComponentProps',
                  },
                  kind: 1,
                  value: 'some default text',
                  optional: true,
                  description: 'optional name string property',
                },
              ],
            },
          });
        }
      }
    }
  });
});
