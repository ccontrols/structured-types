## Playground Instant Documentation

A TypeScript playground plugin which shows instant documentation for exported symbols in typescript, jsdoc and react files.

![./instant-docs.jpg](https://github.com/ccontrols/structured-types/raw/master/packages/instant-documentation-plugin/instant-docs.jpg)

## Running this plugin

- [Click this link](https://www.typescriptlang.org/play?install-plugin=@structured-types/instant-documentation-plugin) to install

or

- Open up the TypeScript Playground
- Go the "Plugins" in the sidebar
- Look for "Plugins from npm"
- Add "@structured-types/instant-documentation-plugin"
- Reload the browser

Then it will show up as a tab in the sidebar.

```sh
git clone https://github.com/ccontrols/structured-types
yarn install
cd packages/instant-documentation-plugin
yarn start
```

Then tick the box for starting plugin development inside the TypeScript Playground.

## Example

To start quickly copy/paste the following example in the typescript playground code editor, the click Extract:

```ts
import React, { FC } from 'react';
/**
 * MyComponent properties.
 */
type OwnProps = {
  /** stringProp description */
  stringProp?: string;

  /** numberProp description */
  numberProp: number;
  person?: {
    address: {
      street: string;
      zip: string;
      city: string;
    };
    age: number;
  };
};

/**
 * MyComponent special component
 */
export const MyComponent: FC<OwnProps> = ({ stringProp }) => (
  <div>{stringProp}</div>
);

MyComponent.defaultProps = {
  stringProp: 'test',
};
```

## VScode plugin

You can also check the VSCode [instant documentation](https://github.com/ccontrols/instant-documentation-vscode) plugin. It can document types across multiple files, and also jump to the definition of a property.
