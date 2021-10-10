# Table of contents

- [Overview](#overview)
- [Comparable libraries](#comparable-libraries)
- [Motivation](#motivation)
- [Getting started](#getting-started)
  - - [1. Installation](#1-installation)
    - [2. Your API source file (sum.js):](#2-your-api-source-file-sumjs)
    - [3. Your documentation extraction](#3-your-documentation-extraction)
    - [4. The result](#4-the-result)
- [API](#api)
  - [parseFiles](#parsefiles)
  - [analyzeFiles](#analyzefiles)
  - [DocsOptions](#docsoptions)
  - [ParseOptions](#parseoptions)
  - [ProgramOptions](#programoptions)
  - [PropTypes](#proptypes)
  - [PropType](#proptype)
  - [PropKind](#propkind)
  - [ParsePlugin](#parseplugin)
  - [PropDiagnostic](#propdiagnostic)
  - [JSDocExample](#jsdocexample)
  - [JSDocPropTag](#jsdocproptag)
  - [ResolverReturnType](#resolverreturntype)
  - [ISymbolParser](#isymbolparser)

# Overview

Extract structured documentation from javascript and typescript files using a combination of typescript types and jsdoc comments.

# Comparable libraries

[jsdoc](https://github.com/jsdoc2md/jsdoc-api)
[typedoc](https://github.com/TypeStrong/typedoc)
[ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator)
[documentation.js](https://github.com/documentationjs/documentation)
[react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
[react-docgen](https://github.com/reactjs/react-docgen)

# Motivation

The creation of `structured-types` comes from the need for a library that can be used to document as well as instrument typescript and javascript code. The currently existing libraries are mostly meant just for documenting code.

- Extract fully structured types, that can be used to fully interact with the analyzed code - this can be used to automatically create tests, examples, etc.
- Use typescript types if available and supplement the type information with any jsdoc comments.
- Extract documentation down to the member-level - for example for an enum extract comments for the enum type, as well as for the individual enum member fields.
- Swiss-army extensible architecture using resolution plugins, where the library can be used to analyze typescript files, as well as extract react, angular, and more framework-specific types.

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

<api-readme extract="parseFiles,analyzeFiles" files="./src/index.ts" maxDepth=10/>

<!-- START-API-README -->

## parseFiles

**`function`** _defined in [@structured-types/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L209)_

API to analyze the given files by also loading the local typescript options from tsconfig

### **parameters**

| Name             | Type                                | Description                               |
| ---------------- | ----------------------------------- | ----------------------------------------- |
| `files*`         | `string`\[]                         | list of files to be processed             |
| `options*`       | [`DocsOptions`](#docsoptions)       | parsing options                           |
| `programOptions` | [`ProgramOptions`](#programoptions) | typescript ts.program and ts.compilerHost |
| `returns`        | [`PropTypes`](#proptypes)           | the parsed types                          |

### example

    import { parseFiles } from '@structured-types/api';

    const props = parseFiles(['index.ts'], {
     collectHelpers: true,
     collectFilePath: true,
     collectLinesOfCode: true,
    })

## analyzeFiles

**`function`** _defined in [@structured-types/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L60)_

API to analyze the given files

### **parameters**

| Name              | Type                                | Description                               |
| ----------------- | ----------------------------------- | ----------------------------------------- |
| `files*`          | `string`\[]                         | list of files to be processed             |
| `options*`        | [`DocsOptions`](#docsoptions)       | parsing options                           |
| `programOptions*` | [`ProgramOptions`](#programoptions) | typescript ts.program and ts.compilerHost |
| `returns`         | [`PropTypes`](#proptypes)           | the parsed types                          |

### example

    import { analyzeFiles } from '@structured-types/api';

    const props = analyzeFiles(['index.ts'], {
     collectHelpers: true,
     collectFilePath: true,
     collectLinesOfCode: true,
     tsOptions: {
       allowJs: true,
     }
    })

## DocsOptions

**`type`** _defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L316)_

### **properties**

| Name                 | Type                                                               | Parent                          | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsOptions`          | ts.CompilerOptions                                                 |                                 |                                                                                                                                                   |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as `String` , `Function` ...                                                               |
| `extract`            | `string`\[]                                                        | [`ParseOptions`](#parseoptions) | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [`PropType`](#proptype)) => `boolean`                   | [`ParseOptions`](#parseoptions) | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`         | (`file`\*: SourceFile, `node`\*: Node) => `boolean` \| `undefined` | [`ParseOptions`](#parseoptions) | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`           | `number`                                                           | [`ParseOptions`](#parseoptions) | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect function parameters                                                                                                            |
| `collectProperties`  | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [`ParsePlugin`](#parseplugin)\[]                                   | [`ParseOptions`](#parseoptions) | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | `"exports"` \| `"all"`                                             | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the `loc` prop               |

## ParseOptions

**`interface`** _defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L194)_

parsing options

### **properties**

| Name                 | Type                                                               | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | internal types - libs by default includes classes such as `String` , `Function` ...                                                               |
| `extract`            | `string`\[]                                                        | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [`PropType`](#proptype)) => `boolean`                   | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`         | (`file`\*: SourceFile, `node`\*: Node) => `boolean` \| `undefined` | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`           | `number`                                                           | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | `boolean`                                                          | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | `boolean`                                                          | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | `boolean`                                                          | whether to collect function parameters                                                                                                            |
| `collectProperties`  | `boolean`                                                          | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | `boolean`                                                          | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | `boolean`                                                          | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | `boolean`                                                          | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | `boolean`                                                          | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [`ParsePlugin`](#parseplugin)\[]                                   | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | `"exports"` \| `"all"`                                             | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the `loc` prop               |

## ProgramOptions

**`type`** _defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L317)_

### **properties**

| Name      | Type            |
| --------- | --------------- |
| `host`    | ts.CompilerHost |
| `program` | ts.Program      |

## PropTypes

**`type`** _defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L576)_

Top-level prop type, with added optional \_\_helpers and \_\_diagnostics fields.

### **properties**

| Name            | Type                                           | Description                                                                                                   |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
|                 | \[`string`]: [`PropType`](#proptype)           |                                                                                                               |
| `__helpers`     | `Record`&lt;`string`, [`PropType`](#proptype)> | Utility symbols such as parent types are stored here. Only available if option collectHelpers is set to true. |
| `__diagnostics` | [`PropDiagnostic`](#propdiagnostic)\[]         | Typescript program diagnostics / errors. Only available if option collectDiagnostics is set to true.          |

## PropType

**`interface`** _defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L65)_

Base prop type interface

### **properties**

| Name          | Type                                                                                                                                                                | Description                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `kind`        | `1` & `2` & `3` & `4` & `5` & `6` & `7` & `8` & `9` & `10` & `11` & `12` & `13` & `14` & `15` & `16` & `17` & `20` & `21` & `22` & `23` & `24` & `25` & `26` & `27` | The property type or kind                                                                      |
| `name`        | `string`                                                                                                                                                            | name of the property                                                                           |
| `parent`      | `string`                                                                                                                                                            | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                                                                           | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                                                                           | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                                                                           | abstract property                                                                              |
| `async`       | `boolean`                                                                                                                                                           | async function                                                                                 |
| `visibility`  | `"private"` \| `"protected"` \| `"public"`                                                                                                                          | property visibility                                                                            |
| `static`      | `boolean`                                                                                                                                                           | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                                                                            | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                                                                               | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                                                                            | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                                                                            | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                                                                            | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                                                                         | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                                                                         | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                                                                  | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                                                                  | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                                                                            | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| `true`                                                                                                                                                  | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                                                                           | jsdoc ignore tag, to be excluded from documentations                                           |

## PropKind

**`enum`** _defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L34)_

The property type or kind

### **properties**

| Name           | Type     | Value |
| -------------- | -------- | ----- |
| `String*`      | `number` | `1`   |
| `Number*`      | `number` | `2`   |
| `Boolean*`     | `number` | `3`   |
| `Union*`       | `number` | `4`   |
| `Enum*`        | `number` | `5`   |
| `Tuple*`       | `number` | `6`   |
| `Rest*`        | `number` | `7`   |
| `Undefined*`   | `number` | `8`   |
| `Unknown*`     | `number` | `9`   |
| `Null*`        | `number` | `10`  |
| `Function*`    | `number` | `11`  |
| `Void*`        | `number` | `12`  |
| `Class*`       | `number` | `13`  |
| `Interface*`   | `number` | `14`  |
| `Type*`        | `number` | `15`  |
| `Array*`       | `number` | `16`  |
| `Any*`         | `number` | `17`  |
| `Index*`       | `number` | `20`  |
| `Constructor*` | `number` | `21`  |
| `Getter*`      | `number` | `22`  |
| `Setter*`      | `number` | `23`  |
| `BigInt*`      | `number` | `24`  |
| `Component*`   | `number` | `25`  |
| `Object*`      | `number` | `26`  |
| `Namespace*`   | `number` | `27`  |

## ParsePlugin

**`type`** _defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L278)_

### **properties**

| Name                 | Type                                                                                                                                                                              | Parent                          | Description                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tsOptions`          | ts.CompilerOptions                                                                                                                                                                | [`DocsOptions`](#docsoptions)   |                                                                                                                                                        |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                                                                                                                                    | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as `String` , `Function` ...                                                                    |
| `extract`            | `string`\[]                                                                                                                                                                       | [`ParseOptions`](#parseoptions) | list of export names to be extracted. by default all exports are extracted                                                                             |
| `filter`             | (`prop`\*: [`PropType`](#proptype)) => `boolean`                                                                                                                                  | [`ParseOptions`](#parseoptions) | filter properties function. By default filter out all props with ignore === true                                                                       |
| `maxDepth`           | `number`                                                                                                                                                                          | [`ParseOptions`](#parseoptions) | max depth for extracting child props. default is 5                                                                                                     |
| `collectHelpers`     | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                              |
| `collectGenerics`    | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect generics parameters                                                                                                                 |
| `collectParameters`  | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect function parameters                                                                                                                 |
| `collectProperties`  | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect object/type properties                                                                                                              |
| `collectInheritance` | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect the inheritance properties                                                                                                          |
| `collectExtension`   | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect the plugin/extension name                                                                                                           |
| `collectDiagnostics` | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect errors/diagnostics                                                                                                                  |
| `collectInternals`   | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect internal (typescript) symbols                                                                                                       |
| `plugins`            | [`ParsePlugin`](#parseplugin)\[]                                                                                                                                                  | [`ParseOptions`](#parseoptions) | installed plugins can modify default options and install type resolvers                                                                                |
| `scope`              | `"exports"` \| `"all"`                                                                                                                                                            | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                          |
| `collectFilePath`    | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect the file path of objects                                                                                                            |
| `collectLinesOfCode` | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the `loc` prop                    |
| `typesResolve*`      | (`props`\*: { `symbolType`: `Type`, `declaration`: `ts.Declaration`, `parser`: [`ISymbolParser`](#isymbolparser) }) => [`ResolverReturnType`](#resolverreturntype) \| `undefined` |                                 | type resolving custom function ie from a react component will return the props type if the plugin does not recognize the type, should return undefined |
| `pluginName`         | `string`                                                                                                                                                                          |                                 | plugin name                                                                                                                                            |

## PropDiagnostic

**`type`** _defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L550)_

diagnostics row data

### **properties**

| Name        | Type                    | Description                     |
| ----------- | ----------------------- | ------------------------------- |
| `category*` | `ts.DiagnosticCategory` | error category                  |
| `message*`  | `string`                | error text message              |
| `row`       | `number`                | source code line of the error   |
| `column`    | `number`                | source code column of the error |
| `fileName`  | `string`                | source file name                |

## JSDocExample

**`interface`** _defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L6)_

JSDoc example item

### **properties**

| Name      | Type     | Description            |
| --------- | -------- | ---------------------- |
| `caption` | `string` | example caption/title  |
| `content` | `string` | example source/content |

## JSDocPropTag

**`interface`** _defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L20)_

JSDoc generic tag item

### **properties**

| Name      | Type     | Description          |
| --------- | -------- | -------------------- |
| `tag*`    | `string` | tag name             |
| `content` | `string` | optional tag content |

## ResolverReturnType

**`type`** _defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L321)_

### **properties**

| Name                 | Type                                                               | Parent                          | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type*`              | ts.Type \| `undefined`                                             |                                 |                                                                                                                                                   |
| `initializer`        | ts.Node                                                            |                                 |                                                                                                                                                   |
| `declaration`        | ts.Node                                                            |                                 |                                                                                                                                                   |
| `prop`               | [`PropType`](#proptype)                                            |                                 | Base prop type interface                                                                                                                          |
| `pluginName`         | `string`                                                           |                                 |                                                                                                                                                   |
| `isInternal`         | (`file`\*: SourceFile, `node`\*: Node) => `boolean` \| `undefined` | [`ParseOptions`](#parseoptions) | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `tsOptions`          | ts.CompilerOptions                                                 | [`DocsOptions`](#docsoptions)   |                                                                                                                                                   |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as `String` , `Function` ...                                                               |
| `extract`            | `string`\[]                                                        | [`ParseOptions`](#parseoptions) | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [`PropType`](#proptype)) => `boolean`                   | [`ParseOptions`](#parseoptions) | filter properties function. By default filter out all props with ignore === true                                                                  |
| `maxDepth`           | `number`                                                           | [`ParseOptions`](#parseoptions) | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect function parameters                                                                                                            |
| `collectProperties`  | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [`ParsePlugin`](#parseplugin)\[]                                   | [`ParseOptions`](#parseoptions) | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | `"exports"` \| `"all"`                                             | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the `loc` prop               |

## ISymbolParser

**`interface`** _defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L386)_

### **properties**

| Name                      | Type                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checker*`                | TypeChecker                                                                                                                                                            |
| `options*`                | [`ParseOptions`](#parseoptions)                                                                                                                                        |
| `parseProperties*`        | (`properties`\*: { `index` }, `options`\*: [`ParseOptions`](#parseoptions), `types`: [`PropType`](#proptype)\[]) => [`PropType`](#proptype)\[]                         |
| `updateSymbolName*`       | (`prop`\*: [`PropType`](#proptype), `node`: ts.Declaration) => [`PropType`](#proptype)                                                                                 |
| `parseType*`              | (`prop`\*: [`PropType`](#proptype), `options`\*: [`ParseOptions`](#parseoptions), `node`: ts.Node) => [`PropType`](#proptype)                                          |
| `parseTypeValueComments*` | (`prop`\*: [`PropType`](#proptype), `options`\*: [`ParseOptions`](#parseoptions), `declaration`: ts.Node, `initializer`: ts.Node) => [`PropType`](#proptype) \| `null` |
| `parseSymbol*`            | (`symbol`\*: Symbol, `options`\*: [`ParseOptions`](#parseoptions)) => [`PropType`](#proptype) \| `undefined`                                                           |

<!-- END-API-README -->

```

```
