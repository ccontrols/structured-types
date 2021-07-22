/* eslint-disable @typescript-eslint/ban-ts-comment */
import { anaylizeFiles } from '@structured-types/api';
import type { PlaygroundPlugin, PluginUtils } from './vendor/playground';

const makePlugin = (utils: PluginUtils): PlaygroundPlugin => {
  const customPlugin: PlaygroundPlugin = {
    id: 'structured-types',
    displayName: 'Structured Types',
    didMount: (sandbox, container) => {
      // Create a design system object to handle
      // making DOM elements which fit the playground (and handle mobile/light/dark etc)
      const ds = utils.createDesignSystem(container);

      ds.title('Extract exported types');
      ds.p(
        'This plugin shows structured type informatiopn for all the exported symbols.',
      );

      const startButton = document.createElement('input');
      startButton.type = 'button';
      startButton.value = 'Get types';
      container.appendChild(startButton);

      const results = document.createElement('div');
      container.appendChild(results);

      const resDS = utils.createDesignSystem(results);

      startButton.onclick = async () => {
        resDS.clear();
        const tsvfs = await sandbox.setupTSVFS();
        sandbox.editor.updateOptions({ readOnly: true });
        try {
          const files = tsvfs.program.getSourceFiles();
          const types = anaylizeFiles(
            [files[files.length - 1].fileName],
            {},
            { program: tsvfs.program },
          );
          console.log(JSON.stringify(types, null, 2));
        } finally {
          sandbox.editor.updateOptions({ readOnly: false });
        }

        // resDS.p(
        //   `Found ${newSymbols.length} new symbols from the editor, with ${allSymbolsPost.length} in total from lib .d.ts. files.`,
        // );

        // newSymbols.forEach((symbol) => {
        //   resDS.subtitle(checker2.symbolToString(symbol));
        //   symbol.declarations?.forEach((d) => {
        //     // @ts-ignore
        //     resDS.createASTTree(d, { closedByDefault: true });
        //   });

        //   resDS.p(`Flags: `);
        // });
      };
    },

    // This is called occasionally as text changes in monaco,
    // it does not directly map 1 keyup to once run of the function
    // because it is intentionally called at most once every 0.3 seconds
    // and then will always run at the end.
    modelChangedDebounce: async (_sandbox, _model) => {
      // Do some work with the new text
    },

    // Gives you a chance to remove anything set up,
    // the container itself if wiped of children after this.
    didUnmount: () => {
      console.log('De-focusing plugin');
    },
  };

  return customPlugin;
};

export default makePlugin;
