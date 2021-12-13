import path from 'path';
import { apiDocsConfig } from '../../../src';
describe('elements', () => {
  it('no match', async () => {
    const { config = {} } =
      (await apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Toggle.tsx'),
        path.resolve(__dirname, 'micromatch-name.config.js'),
      )) || {};
    expect(config).toMatchObject({
      columns: ['name'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
  it('micromatch name', async () => {
    const { config = {} } =
      (await apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Component.tsx'),
        path.resolve(__dirname, 'micromatch-name.config.js'),
      )) || {};
    expect(config).toMatchObject({
      columns: ['description'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
  it('micromatch id', async () => {
    const { config = {} } =
      (await apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Component.tsx'),
        path.resolve(__dirname, 'elementid.config.js'),
        { elementId: 'id1' },
      )) || {};
    expect(config).toMatchObject({
      columns: ['description'],
      sections: {
        props: {
          title: 'Properties',
        },
      },
    });
  });
  it('micromatch-subfolders', async () => {
    const { config = {} } =
      (await apiDocsConfig(
        path.resolve(
          __dirname,
          'src',
          'components',
          'Component',
          'Component.tsx',
        ),
        path.resolve(__dirname, 'micromatch-subfolders.config.js'),
      )) || {};
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
  it('micromatch folder', async () => {
    const { config = {} } =
      (await apiDocsConfig(
        path.resolve(__dirname, 'src', 'components', 'Component.tsx'),
        path.resolve(__dirname, 'micromatch-folder.config.js'),
      )) || {};
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
