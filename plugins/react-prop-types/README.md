# Overview

[structured-types](https://github.com/ccontrols/structured-types) plugin to extract react prop-types specific properties.

# Getting started

### 1. Installation

```bash
$ npm install @structured-types/prop-types-plugin --save-dev
```

### 2. Your API source file (Component.tsx):

```js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ stringProp }) => <div>{stringProp}</div>;

MyComponent.propTypes = {
  /** stringProp description */
  stringProp: PropTypes.string,
  /** numberProp description */
  numberProp: PropTypes.number.isRequired,
};

MyComponent.defaultProps = {
  stringProp: 'test',
};
```

### 3. Your documentation extraction

```ts
import { parseFiles } from '@structured-types/api';
import propTypesPlugin from '@structured-types/prop-types-plugin';
//optional you can also use react plugin for any typescript react props
import reactPlugin from '@structured-types/react-plugin';

const docs = parseFiles(['../src/components/Component.tsx'], {
  plugins: [propTypesPlugin, reactPlugin],
});
```

### 4. The result

```json
{
  "MyComponent": {
    "kind": 11,
    "extension": "react-prop-types",
    "properties": [
      {
        "name": "stringProp",
        "kind": 1,
        "optional": true,
        "description": "stringProp description",
        "value": "test"
      },
      {
        "name": "numberProp",
        "kind": 2,
        "description": "numberProp description"
      }
    ],
    "description": "MyComponent special component",
    "name": "MyComponent"
  }
}
```
