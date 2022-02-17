const { MyComponent } = require('../component/component');

type Document = {
  name: string;
  subcomponents: Record<string, any>;
};
export default {
  name: 'documentation for MyComponent',
  subcomponents: { MyComponent },
} as Document;
