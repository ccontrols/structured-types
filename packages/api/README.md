# Table of contents

-   [Overview](#overview)
-   [Comparable libraries](#comparable-libraries)
-   [Motivation](#motivation)
-   [Getting started](#getting-started)
    -   [1. Installation](#1-installation)
    -   [2. Your API source file (sum.js):](#2-your-api-source-file-sumjs)
    -   [3. Your documentation extraction](#3-your-documentation-extraction)
    -   [4. The result](#4-the-result)
-   [API](#api)
    -   [parseFiles](#parsefiles)
    -   [analyzeFiles](#analyzefiles)
    -   [DocsOptions](#docsoptions)
    -   [ParseOptions](#parseoptions)
    -   [ProgramOptions](#programoptions)
    -   [PropTypes](#proptypes)
    -   [PropType](#proptype)
    -   [PropKind](#propkind)
    -   [ParsePlugin](#parseplugin)
    -   [PropDiagnostic](#propdiagnostic)
    -   [PropParent](#propparent)
    -   [SourceLocation](#sourcelocation)
    -   [JSDocExample](#jsdocexample)
    -   [JSDocPropTag](#jsdocproptag)
    -   [ResolverReturnType](#resolverreturntype)
    -   [ISymbolParser](#isymbolparser)
    -   [SourcePosition](#sourceposition)

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

-   Extract fully structured types, that can be used to fully interact with the analyzed code - this can be used to automatically create tests, examples, etc.
-   Use typescript types if available and supplement the type information with any jsdoc comments.
-   Extract documentation down to the member-level - for example for an enum extract comments for the enum type, as well as for the individual enum member fields.
-   Swiss-army extensible architecture using resolution plugins, where the library can be used to analyze typescript files, as well as extract react, angular, and more framework-specific types.

# Getting started

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

# API

<api-readme />

<!-- START-API-README -->

## parseFiles

**`function`**

API to analyze the given files by also loading the local typescript options from tsconfig

_defined in [@structured-types/api/packages/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L226)_

**parameters**

| Name             | Type                                | Description                               |
| ---------------- | ----------------------------------- | ----------------------------------------- |
| `files*`         | `string`\[]                         | list of files to be processed             |
| `options*`       | [`DocsOptions`](#docsoptions)       | parsing options                           |
| `programOptions` | [`ProgramOptions`](#programoptions) | typescript ts.program and ts.compilerHost |
| `returns`        | [`PropTypes`](#proptypes)           | the parsed types                          |

**example**

    import { parseFiles } from '@structured-types/api';

    const props = parseFiles(['index.ts'], {
     collectHelpers: true,
     collectSourceInfo: true,
    })

## analyzeFiles

**`function`**

API to analyze the given files

_defined in [@structured-types/api/packages/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L63)_

**parameters**

| Name              | Type                                | Description                               |
| ----------------- | ----------------------------------- | ----------------------------------------- |
| `files*`          | `string`\[]                         | list of files to be processed             |
| `options*`        | [`DocsOptions`](#docsoptions)       | parsing options                           |
| `programOptions*` | [`ProgramOptions`](#programoptions) | typescript ts.program and ts.compilerHost |
| `returns`         | [`PropTypes`](#proptypes)           | the parsed types                          |

**example**

    import { analyzeFiles } from '@structured-types/api';

    const props = analyzeFiles(['index.ts'], {
     collectHelpers: true,
     collectSourceInfo: true,
     tsOptions: {
       allowJs: true,
     }
    })

## DocsOptions

**`type`**

_defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L319)_

**properties**

| Name                    | Type                                                                                            | Parent                          | Description                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsOptions`             | ts.CompilerOptions                                                                              |                                 |                                                                                                                                                   |
| `internalTypes`         | `Record`&lt;`string`, [`PropKind`](#propkind)>                                                  | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
| `extract`               | `string`\[]                                                                                     | [`ParseOptions`](#parseoptions) | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`                | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />) => `boolean`                       | [`ParseOptions`](#parseoptions) | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`            | **function** (<br />`file`\*: SourceFile<br />`node`\*: Node<br />) => `boolean` \| `undefined` | [`ParseOptions`](#parseoptions) | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`              | `number`                                                                                        | [`ParseOptions`](#parseoptions) | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`        | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`       | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect generics parameters                                                                                                            |
| `collectParameters`     | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect function parameters                                                                                                            |
| `collectProperties`     | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect object/type properties                                                                                                         |
| `collectInheritance`    | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`      | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics`    | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`      | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`               | [`ParsePlugin`](#parseplugin)\[]                                                                | [`ParseOptions`](#parseoptions) | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`                 | `"exports"` \| `"all"`                                                                          | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                     |
| `collectSourceInfo`     | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the file path and the source code location for the symbol declarations                                                         |
| `collectInnerLocations` | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the source code location for inner symbol declarations if set to true, the data will be collected in the  `loc`  prop          |

## ParseOptions

**`interface`**

parsing options

_defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L195)_

**properties**

| Name                    | Type                                                                                            | Description                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `internalTypes`         | `Record`&lt;`string`, [`PropKind`](#propkind)>                                                  | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
| `extract`               | `string`\[]                                                                                     | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`                | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />) => `boolean`                       | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`            | **function** (<br />`file`\*: SourceFile<br />`node`\*: Node<br />) => `boolean` \| `undefined` | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`              | `number`                                                                                        | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`        | `boolean`                                                                                       | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`       | `boolean`                                                                                       | whether to collect generics parameters                                                                                                            |
| `collectParameters`     | `boolean`                                                                                       | whether to collect function parameters                                                                                                            |
| `collectProperties`     | `boolean`                                                                                       | whether to collect object/type properties                                                                                                         |
| `collectInheritance`    | `boolean`                                                                                       | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`      | `boolean`                                                                                       | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics`    | `boolean`                                                                                       | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`      | `boolean`                                                                                       | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`               | [`ParsePlugin`](#parseplugin)\[]                                                                | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`                 | `"exports"` \| `"all"`                                                                          | by default collects only the exported symbols                                                                                                     |
| `collectSourceInfo`     | `boolean`                                                                                       | whether to collect the file path and the source code location for the symbol declarations                                                         |
| `collectInnerLocations` | `boolean`                                                                                       | whether to collect the source code location for inner symbol declarations if set to true, the data will be collected in the  `loc`  prop          |

## ProgramOptions

**`type`**

_defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L320)_

**properties**

| Name      | Type            |
| --------- | --------------- |
| `host`    | ts.CompilerHost |
| `program` | ts.Program      |

## PropTypes

**`type`**

Top-level prop type, with aded optional \_\_helpers and \_\_diagnostics fields.

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L594)_

**properties**

| Name            | Type                                           | Description                                                                                                   |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
|                 | \[`string`]: [`PropType`](#proptype)<br />     |                                                                                                               |
| `__helpers`     | `Record`&lt;`string`, [`PropType`](#proptype)> | Utility symbols such as parent types are stored here. Only available if option collectHelpers is set to true. |
| `__diagnostics` | [`PropDiagnostic`](#propdiagnostic)\[]         | Typescript program diagnostics / errors. Only available if option collectDiagnostics is set to true.          |

## PropType

**`interface`**

Base prop type interface

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L103)_

**properties**

| Name          | Type                                       | Description                                                                                                           |
| ------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `kind`        | [`PropKind`](#propkind)                    | The property type or kind                                                                                             |
| `name`        | `string`                                   | name of the property                                                                                                  |
| `parent`      | [`PropParent`](#propparent)                | Parent of a property field                                                                                            |
| `loc`         | [`SourceLocation`](#sourcelocation)        | source location of the symbol and source file position will be available when collectSourceInfo option is set to true |
| `optional`    | `boolean`                                  | by default, properties are required                                                                                   |
| `readonly`    | `boolean`                                  | readonly property                                                                                                     |
| `abstract`    | `boolean`                                  | abstract property                                                                                                     |
| `async`       | `boolean`                                  | async function                                                                                                        |
| `visibility`  | `"private"` \| `"protected"` \| `"public"` | property visibility                                                                                                   |
| `static`      | `boolean`                                  | true, of the class property is static                                                                                 |
| `type`        | `string`                                   | type name of the property or lookup into \_\_helpers list of symbols                                                  |
| `extension`   | `string`                                   | used plugin name ie 'react'...                                                                                        |
| `description` | `string`                                   | jsdoc description                                                                                                     |
| `fires`       | `string`\[]                                | jsdoc fires events list                                                                                               |
| `see`         | `string`\[]                                | jsdoc see links list                                                                                                  |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]         | jsdoc examples list                                                                                                   |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]         | jsdoc generic tags, not covered by other props                                                                        |
| `summary`     | `string`                                   | jsdoc summary                                                                                                         |
| `deprecated`  | `string` \| `true`                         | jsdoc deprecated tag                                                                                                  |
| `ignore`      | `boolean`                                  | jsdoc ignore tag, to be excluded from documentations                                                                  |

## PropKind

**`enum`**

The property type or kind

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L34)_

**properties**

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
| `RegEx*`       | `number` | `28`  |

## ParsePlugin

**`type`**

_defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L280)_

**properties**

| Name                    | Type                                                                                                                                                                                                                                                                                                   | Parent                                                                                                                                                 | Description                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `tsOptions`             | ts.CompilerOptions                                                                                                                                                                                                                                                                                     | [`DocsOptions`](#docsoptions)                                                                                                                          |                                                                                                                                          |
| `internalTypes`         | `Record`&lt;`string`, [`PropKind`](#propkind)>                                                                                                                                                                                                                                                         | [`ParseOptions`](#parseoptions)                                                                                                                        | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                    |
| `extract`               | `string`\[]                                                                                                                                                                                                                                                                                            | [`ParseOptions`](#parseoptions)                                                                                                                        | list of export names to be extracted. by default all exports are extracted                                                               |
| `filter`                | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />) => `boolean`                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | filter properties function. By default filter out all props with ignore === true                                                         |
| `maxDepth`              | `number`                                                                                                                                                                                                                                                                                               | [`ParseOptions`](#parseoptions)                                                                                                                        | max depth for extracting child props. default is 5                                                                                       |
| `collectHelpers`        | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                |
| `collectGenerics`       | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect generics parameters                                                                                                   |
| `collectParameters`     | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect function parameters                                                                                                   |
| `collectProperties`     | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect object/type properties                                                                                                |
| `collectInheritance`    | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect the inheritance properties                                                                                            |
| `collectExtension`      | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect the plugin/extension name                                                                                             |
| `collectDiagnostics`    | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect errors/diagnostics                                                                                                    |
| `collectInternals`      | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect internal (typescript) symbols                                                                                         |
| `plugins`               | [`ParsePlugin`](#parseplugin)\[]                                                                                                                                                                                                                                                                       | [`ParseOptions`](#parseoptions)                                                                                                                        | installed plugins can modify default options and install type resolvers                                                                  |
| `scope`                 | `"exports"` \| `"all"`                                                                                                                                                                                                                                                                                 | [`ParseOptions`](#parseoptions)                                                                                                                        | by default collects only the exported symbols                                                                                            |
| `collectSourceInfo`     | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect the file path and the source code location for the symbol declarations                                                |
| `collectInnerLocations` | `boolean`                                                                                                                                                                                                                                                                                              | [`ParseOptions`](#parseoptions)                                                                                                                        | whether to collect the source code location for inner symbol declarations if set to true, the data will be collected in the  `loc`  prop |
| `typesResolve*`         | **function** (<br /><details><summary>`props`\*</summary><blockquote>`symbolType`\*: Type<br />`declaration`: ts.Declaration<br />`parser`\*: [`ISymbolParser`](#isymbolparser)<br />`expression`: ts.Expression</blockquote></details>) => [`ResolverReturnType`](#resolverreturntype) \| `undefined` | type resolving custom function ie from a react component will return the props type if the plugin does not recognize the type, should return undefined |                                                                                                                                          |
| `pluginName`            | `string`                                                                                                                                                                                                                                                                                               | plugin name                                                                                                                                            |                                                                                                                                          |

## PropDiagnostic

**`type`**

diagnostics row data

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L568)_

**properties**

| Name        | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `category*` |          | error category                  |
| `message*`  | `string` | error text message              |
| `row`       | `number` | source code line of the error   |
| `column`    | `number` | source code column of the error |
| `fileName`  | `string` | source file name                |

## PropParent

**`interface`**

Parent of a property field

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L89)_

**properties**

| Name    | Type                                | Description                                                                              |
| ------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `name*` | `string`                            | the parent type name                                                                     |
| `loc`   | [`SourceLocation`](#sourcelocation) | optional source location. will be available when collectSourceInfo option is set to true |

## SourceLocation

**`interface`**

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L74)_

**properties**

| Name       | Type                                                                                                                                                                  | Description                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `filePath` | `string`                                                                                                                                                              | name of the file where the symbol is defined only if different from the default file path |
| `loc`      | <details><summary>`type`</summary><blockquote>`start`\*: [`SourcePosition`](#sourceposition)<br />`end`\*: [`SourcePosition`](#sourceposition)</blockquote></details> | source code location for the symbol declaration                                           |

## JSDocExample

**`interface`**

JSDoc example item

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L6)_

**properties**

| Name      | Type     | Description            |
| --------- | -------- | ---------------------- |
| `caption` | `string` | example caption/title  |
| `content` | `string` | example source/content |

## JSDocPropTag

**`interface`**

JSDoc generic tag item

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L20)_

**properties**

| Name      | Type     | Description          |
| --------- | -------- | -------------------- |
| `tag*`    | `string` | tag name             |
| `content` | `string` | optional tag content |

## ResolverReturnType

**`type`**

_defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L324)_

**properties**

| Name                    | Type                                                                                            | Parent                          | Description                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type*`                 | `ts.Type` \| `undefined`                                                                        |                                 |                                                                                                                                                   |
| `initializer`           | ts.Node                                                                                         |                                 |                                                                                                                                                   |
| `declaration`           | ts.Node                                                                                         |                                 |                                                                                                                                                   |
| `prop`                  | [`PropType`](#proptype)                                                                         | Base prop type interface        |                                                                                                                                                   |
| `pluginName`            | `string`                                                                                        |                                 |                                                                                                                                                   |
| `isInternal`            | **function** (<br />`file`\*: SourceFile<br />`node`\*: Node<br />) => `boolean` \| `undefined` | [`ParseOptions`](#parseoptions) | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `tsOptions`             | ts.CompilerOptions                                                                              | [`DocsOptions`](#docsoptions)   |                                                                                                                                                   |
| `internalTypes`         | `Record`&lt;`string`, [`PropKind`](#propkind)>                                                  | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
| `extract`               | `string`\[]                                                                                     | [`ParseOptions`](#parseoptions) | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`                | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />) => `boolean`                       | [`ParseOptions`](#parseoptions) | filter properties function. By default filter out all props with ignore === true                                                                  |
| `maxDepth`              | `number`                                                                                        | [`ParseOptions`](#parseoptions) | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`        | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`       | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect generics parameters                                                                                                            |
| `collectParameters`     | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect function parameters                                                                                                            |
| `collectProperties`     | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect object/type properties                                                                                                         |
| `collectInheritance`    | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`      | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics`    | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`      | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`               | [`ParsePlugin`](#parseplugin)\[]                                                                | [`ParseOptions`](#parseoptions) | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`                 | `"exports"` \| `"all"`                                                                          | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                     |
| `collectSourceInfo`     | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the file path and the source code location for the symbol declarations                                                         |
| `collectInnerLocations` | `boolean`                                                                                       | [`ParseOptions`](#parseoptions) | whether to collect the source code location for inner symbol declarations if set to true, the data will be collected in the  `loc`  prop          |

## ISymbolParser

**`interface`**

_defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L389)_

**properties**

| Name                      | Type                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checker*`                | TypeChecker                                                                                                                                                                                                                                 |
| `options*`                | [`ParseOptions`](#parseoptions)                                                                                                                                                                                                             |
| `parseProperties*`        | **function** (<br /><details><summary>`properties`\*</summary><blockquote>\[`number`]: `T`</blockquote></details>`options`\*: [`ParseOptions`](#parseoptions)<br />`types`: [`PropType`](#proptype)\[]<br />) => [`PropType`](#proptype)\[] |
| `updateSymbolName*`       | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />`node`: ts.Declaration<br />) => [`PropType`](#proptype)                                                                                                                         |
| `parseType*`              | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />`options`\*: [`ParseOptions`](#parseoptions)<br />`node`: ts.Node<br />) => [`PropType`](#proptype)                                                                              |
| `parseTypeValueComments*` | **function** (<br />`prop`\*: [`PropType`](#proptype)<br />`options`\*: [`ParseOptions`](#parseoptions)<br />`declaration`: ts.Node<br />`initializer`: ts.Node<br />) => [`PropType`](#proptype) \| `null`                                 |
| `parseSymbol*`            | **function** (<br />`symbol`\*: Symbol<br />`options`\*: [`ParseOptions`](#parseoptions)<br />) => [`PropType`](#proptype) \| `undefined`                                                                                                   |

## SourcePosition

**`interface`**

_defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L63)_

**properties**

| Name    | Type     | Description                 |
| ------- | -------- | --------------------------- |
| `line*` | `number` | source line of the symbol   |
| `col*`  | `number` | source column of the symbol |

<!-- END-API-README -->
