# Table of contents

-   [Overview](#overview)
-   [Motivation](#motivation)
-   [Getting started](#getting-started)
    -   -   [1. Installation](#1-installation)
        -   [2. Your API source file (sum.js):](#2-your-api-source-file-sumjs)
        -   [3. Your documentation extraction](#3-your-documentation-extraction)
        -   [4. The result](#4-the-result)
-   [API](#api)
    -   [ObjectProp](#objectprop)
    -   [isObjectProp](#isobjectprop)
    -   [PropKind](#propkind)
    -   [PropType](#proptype)

# Overview

Extract structured documentation from javascript and typescript files using a combination of typescript types and jsdoc comments.

Libraries in the same space:
[react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
[react-docgen](https://github.com/reactjs/react-docgen)
[jsdoc](https://github.com/jsdoc2md/jsdoc-api)
[typedoc](https://github.com/TypeStrong/typedoc)
[ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator)

# Motivation

The creation of `structured-types` come from the need of a library that can be used to document as well as instrument typescript and javascript code. The currently existing libraries are mostly meant just for documenting code.

-   Extract fully structured types, that can be used to fully interact with the analyzed code - this can be used to automatically create tests, examples etc.
-   Use typescript types where available and supplement the type information with any jsdoc comments.
-   Exctract documentation down to the member-level - for example for an enum extract comments for the enum type, as well as for the individual enum member fields.
-   Swiss-army extensible architecture using resolution plugins, where the library can be used to analyze typescript files, as well as extract react, angular and more framework-specific types.

# Getting started

### 1. Installation

```bash
$ npm install @structured-types/api --save-dev
```

### 2. Your API source file (sum.js):

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

### 3. Your documentation extraction

```ts
import { parseFiles } from '@structured-types/api';

const docs = parseFiles(['../src/sum.js']);
```

### 4. The result

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

# API

<api-readme extract="isObjectProp,ObjectProp" files="./src/types.ts"/>

<!-- START-API-README -->

## ObjectProp

Object property



### properties

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                    | Value | Description                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------- |
| `kind*`       | Object                                                                                                                                                                                                                                                                                                                                                                                  | 26    | generic properties                                                                          |
| `properties`  | [PropType](#proptype)&lt;kind: [PropKind](#propkind), name: string, parent: string, optional: boolean, readonly: boolean, abstract: boolean, async: boolean, visibility: union, static: boolean, filePath: string, type: union, extension: string, description: string, fires: array, see: array, examples: array, tags: array, summary: string, deprecated: union, ignore: boolean>\[] |       | object properties list                                                                      |
| `value`       | [PropType](#proptype)&lt;kind: [PropKind](#propkind), name: string, parent: string, optional: boolean, readonly: boolean, abstract: boolean, async: boolean, visibility: union, static: boolean, filePath: string, type: union, extension: string, description: string, fires: array, see: array, examples: array, tags: array, summary: string, deprecated: union, ignore: boolean>\[] |       | value, if the object is initialized                                                         |
| `name`        | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | name of the property                                                                        |
| `parent`      | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | the name of the parent property, if combined props                                          |
| `optional`    | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | by default, properties are required                                                         |
| `readonly`    | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | readonly property                                                                           |
| `abstract`    | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | abstract property                                                                           |
| `async`       | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | async function                                                                              |
| `visibility`  | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | property visibility                                                                         |
| `static`      | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | true, of the class property is static                                                       |
| `filePath`    | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | name of the file where the property is defined only if different from the default file path |
| `type`        | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | type name of the property                                                                   |
| `extension`   | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | used plugin name ie 'react'...                                                              |
| `description` | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc description                                                                           |
| `fires`       | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc fires events list                                                                     |
| `see`         | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc see links list                                                                        |
| `examples`    | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc examples list                                                                         |
| `tags`        | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc generic tags, not covered by other props                                              |
| `summary`     | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc summary                                                                               |
| `deprecated`  | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc deprecated tag                                                                        |
| `ignore`      | [:PropType](#proptype)                                                                                                                                                                                                                                                                                                                                                                  |       | jsdoc ignore tag, to be excluded from documentations                                        |

## isObjectProp

ObjectProp type guard predicate

**function** isObjectProp(`prop`\*: [PropType](#proptype)): [ObjectProp](#objectprop);

### parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Description     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `prop*`   | [PropType](#proptype)&lt;kind: [PropKind](#propkind), name: [:PropType](#proptype), parent: [:PropType](#proptype), optional: [:PropType](#proptype), readonly: [:PropType](#proptype), abstract: [:PropType](#proptype), async: [:PropType](#proptype), visibility: [:PropType](#proptype), static: [:PropType](#proptype), filePath: [:PropType](#proptype), type: [:PropType](#proptype), extension: [:PropType](#proptype), description: [:PropType](#proptype), fires: [:PropType](#proptype), see: [:PropType](#proptype), examples: [:PropType](#proptype), tags: [:PropType](#proptype), summary: [:PropType](#proptype), deprecated: [:PropType](#proptype), ignore: [:PropType](#proptype)>                       |                 |
| `returns` | [ObjectProp](#objectprop)&lt;kind: Object, properties: array, value: array, name: [:PropType](#proptype), parent: [:PropType](#proptype), optional: [:PropType](#proptype), readonly: [:PropType](#proptype), abstract: [:PropType](#proptype), async: [:PropType](#proptype), visibility: [:PropType](#proptype), static: [:PropType](#proptype), filePath: [:PropType](#proptype), type: [:PropType](#proptype), extension: [:PropType](#proptype), description: [:PropType](#proptype), fires: [:PropType](#proptype), see: [:PropType](#proptype), examples: [:PropType](#proptype), tags: [:PropType](#proptype), summary: [:PropType](#proptype), deprecated: [:PropType](#proptype), ignore: [:PropType](#proptype)> | Object property |

## PropKind

The property type or kind



### properties

| Name           | Type   | Value | Description |
| -------------- | ------ | ----- | ----------- |
| `String*`      | number | 1     |             |
| `Number*`      | number | 2     |             |
| `Boolean*`     | number | 3     |             |
| `Union*`       | number | 4     |             |
| `Enum*`        | number | 5     |             |
| `Tuple*`       | number | 6     |             |
| `Rest*`        | number | 7     |             |
| `Undefined*`   | number | 8     |             |
| `Unknown*`     | number | 9     |             |
| `Null*`        | number | 10    |             |
| `Function*`    | number | 11    |             |
| `Void*`        | number | 12    |             |
| `Class*`       | number | 13    |             |
| `Interface*`   | number | 14    |             |
| `Type*`        | number | 15    |             |
| `Array*`       | number | 16    |             |
| `Any*`         | number | 17    |             |
| `Index*`       | number | 20    |             |
| `Constructor*` | number | 21    |             |
| `Getter*`      | number | 22    |             |
| `Setter*`      | number | 23    |             |
| `BigInt*`      | number | 24    |             |
| `Component*`   | number | 25    |             |
| `Object*`      | number | 26    |             |

## PropType

Base prop type interface



### properties

| Name          | Type                                                                                                                                                                                                                                    | Description                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `kind`        | [PropKind](#propkind)                                                                                                                                                                                                                   | The property type or kind                                                                   |
| `name`        | string                                                                                                                                                                                                                                  | name of the property                                                                        |
| `parent`      | string                                                                                                                                                                                                                                  | the name of the parent property, if combined props                                          |
| `optional`    | boolean                                                                                                                                                                                                                                 | by default, properties are required                                                         |
| `readonly`    | boolean                                                                                                                                                                                                                                 | readonly property                                                                           |
| `abstract`    | boolean                                                                                                                                                                                                                                 | abstract property                                                                           |
| `async`       | boolean                                                                                                                                                                                                                                 | async function                                                                              |
| `visibility`  | private \| protected \| public                                                                                                                                                                                                          | property visibility                                                                         |
| `static`      | boolean                                                                                                                                                                                                                                 | true, of the class property is static                                                       |
| `filePath`    | string                                                                                                                                                                                                                                  | name of the file where the property is defined only if different from the default file path |
| `type`        | [PropType](#proptype)&lt;kind: [PropKind](#propkind), name, parent, optional, readonly, abstract, async, visibility, static, filePath, type, extension, description, fires, see, examples, tags, summary, deprecated, ignore> \| string | type name of the property                                                                   |
| `extension`   | string                                                                                                                                                                                                                                  | used plugin name ie 'react'...                                                              |
| `description` | string                                                                                                                                                                                                                                  | jsdoc description                                                                           |
| `fires`       | string\[]                                                                                                                                                                                                                               | jsdoc fires events list                                                                     |
| `see`         | string\[]                                                                                                                                                                                                                               | jsdoc see links list                                                                        |
| `examples`    | JSDocExample&lt;caption: string, content: string>\[]                                                                                                                                                                                    | jsdoc examples list                                                                         |
| `tags`        | JSDocPropTag&lt;tag: string, content: string>\[]                                                                                                                                                                                        | jsdoc generic tags, not covered by other props                                              |
| `summary`     | string                                                                                                                                                                                                                                  | jsdoc summary                                                                               |
| `deprecated`  | string \| true                                                                                                                                                                                                                          | jsdoc deprecated tag                                                                        |
| `ignore`      | boolean                                                                                                                                                                                                                                 | jsdoc ignore tag, to be excluded from documentations                                        |

<!-- END-API-README -->
