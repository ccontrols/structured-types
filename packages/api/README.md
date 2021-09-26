# Table of contents

-   [Overview](#overview)
-   [Getting Started](#getting-started)
    -   [Install](#install)
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
    -   [JSDocExample](#jsdocexample)
    -   [JSDocPropTag](#jsdocproptag)
    -   [ResolverReturnType](#resolverreturntype)
    -   [ISymbolParser](#isymbolparser)

# Overview

Markdown documentation generator/enhancer for javascript, typescript and react typescript projects. Can be used to generate API sections in your README.md files.

# Getting Started

## Install

```sh
yarn add @structured-types/api-readme --dev
```

# API

<api-readme extract="parseFiles,analyzeFiles" files="./src/index.ts" maxDepth=10/>

<!-- START-API-README -->

## parseFiles

_defined in [@structured-types/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L209)_

**`function`**

API to analyze the given files by also loading the local typescript options from tsconfig

**function** parseFiles(`files`\*: string\[], `options`\*: [DocsOptions](#docsoptions), `programOptions`: [ProgramOptions](#programoptions)) => [PropTypes](#proptypes)

### example
    import { parseFiles } from '@structured-types/api';

    const props = parseFiles(['index.ts'], {
     collectHelpers: true,
     collectFilePath: true,
     collectLinesOfCode: true,
    })

## analyzeFiles

_defined in [@structured-types/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L60)_

**`function`**

API to analyze the given files

**function** analyzeFiles(`files`\*: string\[], `options`\*: [DocsOptions](#docsoptions), `programOptions`\*: [ProgramOptions](#programoptions)) => [PropTypes](#proptypes)

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

_defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L316)_

**`type`**



| Name                 | Type                                                                 | Description                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsOptions`          | ts.CompilerOptions                                                   |                                                                                                                                                   |
| `internalTypes`      | Record&lt;string, [PropKind](#propkind)>                             | internal types - libs by default includes classes such as \`String\`, \`Function\`...                                                             |
| `extract`            | string\[]                                                            | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [PropType](#proptype)) => boolean                         | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`         | (`file`\*: ts.SourceFile, `node`\*: ts.Node) => boolean \| undefined | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`           | number                                                               | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | boolean                                                              | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | boolean                                                              | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | boolean                                                              | whether to collect function parameters                                                                                                            |
| `collectProperties`  | boolean                                                              | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | boolean                                                              | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | boolean                                                              | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | boolean                                                              | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | boolean                                                              | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [ParsePlugin](#parseplugin)\[]                                       | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | exports \| all                                                       | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | boolean                                                              | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | boolean                                                              | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the \`loc\` prop             |

## ParseOptions

_defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L194)_

**`interface`**

parsing options



| Name                 | Type                                                                 | Description                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `internalTypes`      | Record&lt;string, [PropKind](#propkind)>                             | internal types - libs by default includes classes such as \`String\`, \`Function\`...                                                             |
| `extract`            | string\[]                                                            | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [PropType](#proptype)) => boolean                         | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`         | (`file`\*: ts.SourceFile, `node`\*: ts.Node) => boolean \| undefined | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`           | number                                                               | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | boolean                                                              | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | boolean                                                              | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | boolean                                                              | whether to collect function parameters                                                                                                            |
| `collectProperties`  | boolean                                                              | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | boolean                                                              | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | boolean                                                              | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | boolean                                                              | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | boolean                                                              | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [ParsePlugin](#parseplugin)\[]                                       | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | exports \| all                                                       | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | boolean                                                              | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | boolean                                                              | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the \`loc\` prop             |

## ProgramOptions

_defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L317)_

**`type`**



| Name      | Type            | Description |
| --------- | --------------- | ----------- |
| `host`    | ts.CompilerHost |             |
| `program` | ts.Program      |             |

## PropTypes

_defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L574)_

**`type`**

Top-level prop type, with aded optional \_\_helpers and \_\_diagnostics fields.



| Name            | Type                                     | Description                                                                                                   |
| --------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
|                 | \[string]: [PropType](#proptype)         |                                                                                                               |
| `__helpers`     | Record&lt;string, [PropType](#proptype)> | Utility symbols such as parent types are stored here. Only available if option collectHelpers is set to true. |
| `__diagnostics` | [PropDiagnostic](#propdiagnostic)\[]     | Typescript program diagnostics / errors. Only available if option collectDiagnostics is set to true.          |

## PropType

_defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L65)_

**`interface`**

Base prop type interface



| Name          | Type                             | Description                                                                                    |
| ------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `kind`        | [PropKind](#propkind)            | The property type or kind                                                                      |
| `name`        | string                           | name of the property                                                                           |
| `parent`      | string                           | the name of the parent property, if combined props                                             |
| `optional`    | boolean                          | by default, properties are required                                                            |
| `readonly`    | boolean                          | readonly property                                                                              |
| `abstract`    | boolean                          | abstract property                                                                              |
| `async`       | boolean                          | async function                                                                                 |
| `visibility`  | private \| protected \| public   | property visibility                                                                            |
| `static`      | boolean                          | true, of the class property is static                                                          |
| `filePath`    | string                           | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { line: number, col: number }    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | string                           | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | string                           | used plugin name ie 'react'...                                                                 |
| `description` | string                           | jsdoc description                                                                              |
| `fires`       | string\[]                        | jsdoc fires events list                                                                        |
| `see`         | string\[]                        | jsdoc see links list                                                                           |
| `examples`    | [JSDocExample](#jsdocexample)\[] | jsdoc examples list                                                                            |
| `tags`        | [JSDocPropTag](#jsdocproptag)\[] | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | string                           | jsdoc summary                                                                                  |
| `deprecated`  | string \| true                   | jsdoc deprecated tag                                                                           |
| `ignore`      | boolean                          | jsdoc ignore tag, to be excluded from documentations                                           |

## PropKind

_defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L34)_

**`enum`**

The property type or kind



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
| `Namespace*`   | number | 27    |             |

## ParsePlugin

_defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L278)_

**`type`**



| Name                 | Type                                                                                                                                                                 | Description                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tsOptions`          | ts.CompilerOptions                                                                                                                                                   |                                                                                                                                                        |
| `internalTypes`      | Record&lt;string, [PropKind](#propkind)>                                                                                                                             | internal types - libs by default includes classes such as \`String\`, \`Function\`...                                                                  |
| `extract`            | string\[]                                                                                                                                                            | list of export names to be extracted. by default all exports are extracted                                                                             |
| `filter`             | (`prop`\*: [PropType](#proptype)) => boolean                                                                                                                         | filter properties function. By default filter out all props with ignore === true                                                                       |
| `maxDepth`           | number                                                                                                                                                               | max depth for extracting child props. default is 5                                                                                                     |
| `collectHelpers`     | boolean                                                                                                                                                              | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                              |
| `collectGenerics`    | boolean                                                                                                                                                              | whether to collect generics parameters                                                                                                                 |
| `collectParameters`  | boolean                                                                                                                                                              | whether to collect function parameters                                                                                                                 |
| `collectProperties`  | boolean                                                                                                                                                              | whether to collect object/type properties                                                                                                              |
| `collectInheritance` | boolean                                                                                                                                                              | whether to collect the inheritance properties                                                                                                          |
| `collectExtension`   | boolean                                                                                                                                                              | whether to collect the plugin/extension name                                                                                                           |
| `collectDiagnostics` | boolean                                                                                                                                                              | whether to collect errors/diagnostics                                                                                                                  |
| `collectInternals`   | boolean                                                                                                                                                              | whether to collect internal (typescript) symbols                                                                                                       |
| `plugins`            | [ParsePlugin](#parseplugin)\[]                                                                                                                                       | installed plugins can modify default options and install type resolvers                                                                                |
| `scope`              | exports \| all                                                                                                                                                       | by default collects only the exported symbols                                                                                                          |
| `collectFilePath`    | boolean                                                                                                                                                              | whether to collect the file path of objects                                                                                                            |
| `collectLinesOfCode` | boolean                                                                                                                                                              | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the \`loc\` prop                  |
| `typesResolve*`      | (`props`\*: { symbolType: ts.Type, declaration: ts.Declaration, parser: [ISymbolParser](#isymbolparser) }) => [ResolverReturnType](#resolverreturntype) \| undefined | type resolving custom function ie from a react component will return the props type if the plugin does not recognize the type, should return undefined |
| `pluginName`         | string                                                                                                                                                               | plugin name                                                                                                                                            |

## PropDiagnostic

_defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L548)_

**`type`**

diagnostics row data



| Name        | Type                  | Description                     |
| ----------- | --------------------- | ------------------------------- |
| `category*` | ts.DiagnosticCategory | error category                  |
| `message*`  | string                | error text message              |
| `row`       | number                | source code line of the error   |
| `column`    | number                | source code column of the error |
| `fileName`  | string                | source file name                |

## JSDocExample

_defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L6)_

**`interface`**

JSDoc example item



| Name      | Type   | Description            |
| --------- | ------ | ---------------------- |
| `caption` | string | example caption/title  |
| `content` | string | example source/content |

## JSDocPropTag

_defined in [@structured-types/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L20)_

**`interface`**

JSDoc generic tag item



| Name      | Type   | Description          |
| --------- | ------ | -------------------- |
| `tag*`    | string | tag name             |
| `content` | string | optional tag content |

## ResolverReturnType

_defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L321)_

**`type`**



| Name                 | Type                                                                 | Description                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type*`              | ts.Type \| undefined                                                 |                                                                                                                                                   |
| `initializer`        | ts.Node                                                              |                                                                                                                                                   |
| `declaration`        | ts.Node                                                              |                                                                                                                                                   |
| `prop`               | [PropType](#proptype)                                                |                                                                                                                                                   |
| `pluginName`         | string                                                               |                                                                                                                                                   |
| `isInternal`         | (`file`\*: ts.SourceFile, `node`\*: ts.Node) => boolean \| undefined | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `tsOptions`          | ts.CompilerOptions                                                   |                                                                                                                                                   |
| `internalTypes`      | Record&lt;string, [PropKind](#propkind)>                             | internal types - libs by default includes classes such as \`String\`, \`Function\`...                                                             |
| `extract`            | string\[]                                                            | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [PropType](#proptype)) => boolean                         | filter properties function. By default filter out all props with ignore === true                                                                  |
| `maxDepth`           | number                                                               | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | boolean                                                              | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | boolean                                                              | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | boolean                                                              | whether to collect function parameters                                                                                                            |
| `collectProperties`  | boolean                                                              | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | boolean                                                              | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | boolean                                                              | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | boolean                                                              | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | boolean                                                              | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [ParsePlugin](#parseplugin)\[]                                       | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | exports \| all                                                       | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | boolean                                                              | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | boolean                                                              | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the \`loc\` prop             |

## ISymbolParser

_defined in [@structured-types/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L386)_

**`interface`**



| Name                      | Type                                                                                                                                                           | Description |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `checker*`                | ts.TypeChecker                                                                                                                                                 |             |
| `options*`                | [ParseOptions](#parseoptions)                                                                                                                                  |             |
| `parseProperties*`        | (`properties`\*: ts.NodeArray&lt;union>, `options`\*: [ParseOptions](#parseoptions), `types`: [PropType](#proptype)\[]) => [PropType](#proptype)\[]            |             |
| `updateSymbolName*`       | (`prop`\*: [PropType](#proptype), `node`: ts.Declaration) => [PropType](#proptype)                                                                             |             |
| `parseType*`              | (`prop`\*: [PropType](#proptype), `options`\*: [ParseOptions](#parseoptions), `node`: ts.Node) => [PropType](#proptype)                                        |             |
| `parseTypeValueComments*` | (`prop`\*: [PropType](#proptype), `options`\*: [ParseOptions](#parseoptions), `declaration`: ts.Node, `initializer`: ts.Node) => [PropType](#proptype) \| null |             |
| `parseSymbol*`            | (`symbol`\*: ts.Symbol, `options`\*: [ParseOptions](#parseoptions)) => [PropType](#proptype) \| undefined                                                      |             |

<!-- END-API-README -->

```

```
