# Table of contents

-   [About](#about)
-   [Live example](#live-example)
-   [Using the API](#using-the-api)
    -   [1. Installation](#1-installation)
    -   [2. Your API source file (sum.js):](#2-your-api-source-file-sumjs)
    -   [3. Your documentation extraction](#3-your-documentation-extraction)
    -   [4. The result](#4-the-result)
-   [Using the CLI](#using-the-cli)
    -   [1. Installation](#1-installation-1)
    -   [2. Configure](#2-configure)
    -   [3. Launch](#3-launch)
-   [Typescript playground plugin](#typescript-playground-plugin)
-   [Roadmap](#roadmap)

# About

`structured-types` is a collection of libraries using the [Typescript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to generate "structured" type information from jsdoc and typescript files.

The library API extracts full types for your libraries, not just string representations of the type, and is built around a plugin architecture, so it can be extended to extract custom types for frameworks such as `react`, `vue`, `angular`.

# Live example

You can use our [Playground site](https://tinyurl.com/abpkj845) to experiment with custom code

![./img-playground.jpg](https://github.com/ccontrols/structured-types/raw/master/img-playground.jpg)

# Using the API

More information about the [@structured-types/api](https://github.com/ccontrols/structured-types/blob/master/packages/api/README.md) package.

## 1. Installation

```bash
$ npm install @structured-types/api --save-dev
```

## 2. Your API source file (sum.js):

````js
/**
 * sum api function
 * @remarks
 * Unlike the summary, the remarks block may contain lengthy documentation content.
 * The remarks should not restate information from the summary, since the summary section
 * will always be displayed wherever the remarks section appears.  Other sections
 * (e.g. an `@example` block) will be shown after the remarks section.
 *
 * @param {number} a first parameter to add
 * @param {number} b second parameter to add
 * @returns {number} the sum of the two parameters
 *
 * @example
 *
 * ```js
 * import { sum } from './sum';
 *
 * expect(sum(1, 2)).toMatchObject({ a: 1, b: 2, result: 3});
 * ```
 */
export const sum = (a, b = 1) => ({ a, b, result: a + b });
````

## 3. Your documentation extraction

```ts
import { parseFiles } from '@structured-types/api';

const docs = parseFiles(['../src/sum.js']);
```

## 4. The result

````json
{
  "sum": {
    "name": "sum",
    "kind": 11,
    "parameters": [
      {
        "kind": 2,
        "name": "a",
        "description": "first parameter to add"
      },
      {
        "kind": 2,
        "name": "b",
        "value": 1,
        "description": "second parameter to add"
      }
    ],
    "examples": [
      {
        "content": "```js\nimport { sum } from './sum';\n\nexpect(sum(1, 2)).toMatchObject({ a: 1, b: 2, result: 3});\n```"
      }
    ],
    "returns": {
      "description": "the sum of the two parameters",
      "kind": 2
    },
    "tags": [
      {
        "tag": "remarks",
        "content": "Unlike the summary, the remarks block may contain lengthy documentation content.\nThe remarks should not restate information from the summary, since the summary section\nwill always be displayed wherever the remarks section appears.  Other sections\n(e.g. an `@example` block) will be shown after the remarks section."
      }
    ],
    "description": "sum api function"
  }
}
````

# Using the CLI

You can also use structured-types to automatically generate markdown README.md-type files for your libraries.

More information about the [@structured-types/api-readme](https://github.com/ccontrols/structured-types/blob/master/packages/api-readme/README.md) package.

## 1. Installation

```bash
$ npm install @structured-types/api-readme --save-dev
```

## 2. Configure

In your `README.md` (or other markdown file) file, you will insert a `<api-readme />` tag to generate the API section:

```md
<api-readme />
```

## 3. Launch

You can launch directly from the command-line ie `yarn run api-readme` or from your `package.json` file by adding a script to launch the command line documentation tool.

```json
...
  "scripts": {
    "docs": "api-readme",
    ...
  },
...
```

# Typescript playground plugin

[Click to install](https://www.typescriptlang.org/play?install-plugin=@structured-types/playground-plugin) our TypeScript playground plugin which shows the type information for the current file.

More information about the [@structured-types/playground-plugin](https://github.com/ccontrols/structured-types/blob/master/packages/ts-playground-plugin/README.md) package.

# Roadmap

-   [x] JSDoc types
-   [x] Typescript types
-   [x] React plugin
-   [x] React "prop-types" plugin
-   [x] Typescript playground plugin
-   [x] Automatically generate README.md files (api-readme)
-   [x] VSCode plugin for instant documentation
-   [ ] [component-controls](https://github.com/ccontrols/component-controls) integration
-   [ ] Vue plugin
-   [ ] Angular plugin
