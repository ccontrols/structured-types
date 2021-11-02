import path from 'path';
import { apiDocsConfig } from '../../../src';
describe('elements', () => {
  it('no match', () => {
    const { config = {} } =
      apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Toggle.tsx'),
        path.resolve(__dirname, 'micromatch-name.config.js'),
      ) || {};
    expect(config).toMatchObject({
      columns: ['name'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
  it('micromatch name', () => {
    const { config = {} } =
      apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Component.tsx'),
        path.resolve(__dirname, 'micromatch-name.config.js'),
      ) || {};
    expect(config).toMatchObject({
      columns: ['description'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
  it('micromatch id', () => {
    const { config = {} } =
      apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Component.tsx'),
        path.resolve(__dirname, 'elementid.config.js'),
        'id1',
      ) || {};
    expect(config).toMatchObject({
      columns: ['description'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
  it('micromatch-subfolders', () => {
    const { config = {} } =
      apiDocsConfig(
        path.resolve(
          __dirname,
          'src',
          'components',
          'Component',
          'Component.tsx',
        ),
        path.resolve(__dirname, 'micromatch-subfolders.config.js'),
      ) || {};
    expect(config).toMatchObject({
      columns: ['name'],
      sections: {
        props: {
          title: 'Properties',
          hidden: true,
        },
      },
    });
  });
  it('micromatch folder', () => {
    const { config = {} } =
      apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Component.tsx'),
        path.resolve(__dirname, 'micromatch-folder.config.js'),
      ) || {};
    expect(config).toMatchObject({
      columns: ['description'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
});
