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

_defined in [@structured-types/typescript-config/src/index.ts](https://github.com/ccontrols/component-controls/tree/master/misc/typescript-config/src/index.ts#L31)_

**`function`**

reads any typescript configuration files for a given file, including the extends references

**function** getTypescriptConfig(`filePath`\*: string, `defaultConfig`: ts.CompilerOptions, `keepJson`: boolean) => ts.CompilerOptions | undefined

<!-- END-API-README -->
