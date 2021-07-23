import { renderUI } from './react/App';
import type { PlaygroundPlugin } from './vendor/playground';

const makePlugin = (): PlaygroundPlugin => {
  const customPlugin: PlaygroundPlugin = {
    id: 'structured-types',
    displayName: 'Structured Types',
    didMount: (sandbox, container) => {
      const div = document.createElement('div');
      div.id = 'root';
      container.appendChild(div);
      renderUI(sandbox);
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
