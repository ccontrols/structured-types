# Overview

[structured-types](https://github.com/ccontrols/structured-types) plugin to extract react specific properties.

# Getting started

### 1. Installation

```bash
$ npm install @structured-types/react-plugin --save-dev
```

### 2. Your API source file (Component.tsx):

```js
import React, { FC } from 'react';
/**
 * MyComponent properties.
 */
type OwnProps = {
  /** stringProp description */
  stringProp?: string,

  /** numberProp description */
  numberProp: number,
};

/**
 * MyComponent special component
 */
const MyComponent: FC<OwnProps> = ({ stringProp }) => <div>{stringProp}</div>;

MyComponent.defaultProps = {
  stringProp: 'test',
};

export default MyComponent;
```

### 3. Your documentation extraction

```ts
import { parseFiles } from '@structured-types/api';
import reactPlugin from '@structured-types/react-plugin';

const docs = parseFiles(['../src/components/Component.tsx'], {
  plugins: [reactPlugin],
});
```

### 4. The result

```json
{
  "default": {
    "name": "MyComponent",
    "extension": "react",
    "kind": 11,
    "properties": [
      {
        "parent": "OwnProps",
        "optional": true,
        "name": "stringProp",
        "kind": 1,
        "description": "stringProp description",
        "value": "test"
      },
      {
        "parent": "OwnProps",
        "name": "numberProp",
        "kind": 2,
        "description": "numberProp description"
      }
    ]
  }
}
```
