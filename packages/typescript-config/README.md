# Table of contents

-   [Overview](#overview)
-   [Installation](#installation)
-   [Getting started](#getting-started)
-   [API](#api)
    -   [TSConfigFS](#tsconfigfs)
    -   [TSConfigOptions](#tsconfigoptions)
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

## TSConfigFS

**`type`**

_defined in [@structured-types/typescript-config/misc/typescript-config/src/index.ts](https://github.com/ccontrols/component-controls/tree/master/misc/typescript-config/src/index.ts#L5)_

**properties**

| Name          | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| `fileExists*` | **function** (<br />`filePath`\*: `string`<br />) => `Promise`&lt;`boolean`>          |
| `readFile*`   | **function** (<br />`filePath`\*: `string`<br />) => `Promise`&lt;(`string`, `null`)> |

## TSConfigOptions

**`type`**

Config parsing options

_defined in [@structured-types/typescript-config/misc/typescript-config/src/index.ts](https://github.com/ccontrols/component-controls/tree/master/misc/typescript-config/src/index.ts#L16)_

**properties**

| Name   | Type            | Description                                     |
| ------ | --------------- | ----------------------------------------------- |
| `json` | `boolean`       | keep json format of ts config                   |
| `host` | ts.CompilerHost | optional compiler host to use instead of ts.sys |

## getTypescriptConfig

**`function`**

Reads any typescript configuration files for a given file, including the extends references

_defined in [@structured-types/typescript-config/misc/typescript-config/src/index.ts](https://github.com/ccontrols/component-controls/tree/master/misc/typescript-config/src/index.ts#L33)_

**parameters**

| Name            | Type                                  | Description                                                                              |
| --------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `filePath*`     | `string`                              | the full file path to the file                                                           |
| `defaultConfig` | ts.CompilerOptions                    | optional default configuration                                                           |
| `options`       | [`TSConfigOptions`](#tsconfigoptions) | Config parsing options                                                                   |
| `returns`       | `ts.CompilerOptions` \| `undefined`   | the typescript configuration for the file, or undefined if this is not a typescript file |

<!-- END-API-README -->
