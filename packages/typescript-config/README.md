# Table of contents

-   [Overview](#overview)
-   [Installation](#installation)
-   [Getting started](#getting-started)
-   [API](#api)
    -   [getTypescriptConfig](#gettypescriptconfig)

# Overview

Retrieve the configuration for a typescript file.

# Installation

```bash
$ npm install @structured-types/typescript-config --save-dev
```

# Getting started

    import { getTypescriptConfig } from '@structured-types/typescript-config';
    import * as ts from 'typescript';

    const config = getTypescriptConfig('./tsfile.ts', {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
      }
    });

# API

<api-readme files="./src/index.ts"/>

<!-- START-API-README -->

## getTypescriptConfig

**`function`** _defined in [@structured-types/typescript-config/misc/typescript-config/src/index.ts](https://github.com/ccontrols/component-controls/tree/master/misc/typescript-config/src/index.ts#L31)_

reads any typescript configuration files for a given file, including the extends references

**parameters**

| Name            | Type                              | Description                                                                              |
| --------------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| `filePath*`     | `string`                          | the full file path to the file                                                           |
| `defaultConfig` | ts.CompilerOptions                | optional default configuration                                                           |
| `keepJson`      | `boolean`                         | set to tru to avoid converting options                                                   |
| `returns`       | ts.CompilerOptions \| `undefined` | the typescript configuration for the file, or undefined if this is not a typescript file |

<!-- END-API-README -->
