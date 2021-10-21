# Table of contents

-   [Overview](#overview)
-   [Comparable libraries](#comparable-libraries)
-   [Motivation](#motivation)
-   [Getting started](#getting-started)
    -   -   [1. Installation](#1-installation)
        -   [2. Your API source file (sum.js):](#2-your-api-source-file-sumjs)
        -   [3. Your documentation extraction](#3-your-documentation-extraction)
        -   [4. The result](#4-the-result)
-   [API](#api)
    -   [analyzeFiles](#analyzefiles)
    -   [parseFiles](#parsefiles)
    -   [mergeJSDoc](#mergejsdoc)
    -   [mergeNodeComments](#mergenodecomments)
    -   [cleanJSDocText](#cleanjsdoctext)
    -   [tagCommentToString](#tagcommenttostring)
    -   [parseJSDocTag](#parsejsdoctag)
    -   [parseJSDocTags](#parsejsdoctags)
    -   [resolveType](#resolvetype)
    -   [getInitializer](#getinitializer)
    -   [JSDocExample](#jsdocexample)
    -   [JSDocPropTag](#jsdocproptag)
    -   [PropKind](#propkind)
    -   [PropType](#proptype)
    -   [ObjectProp](#objectprop)
    -   [isObjectProp](#isobjectprop)
    -   [StringProp](#stringprop)
    -   [isStringProp](#isstringprop)
    -   [NumberProp](#numberprop)
    -   [isNumberProp](#isnumberprop)
    -   [BooleanProp](#booleanprop)
    -   [isBooleanProp](#isbooleanprop)
    -   [UnionProp](#unionprop)
    -   [isUnionProp](#isunionprop)
    -   [HasValueProp](#hasvalueprop)
    -   [hasValue](#hasvalue)
    -   [EnumProp](#enumprop)
    -   [isEnumProp](#isenumprop)
    -   [RestProp](#restprop)
    -   [isRestProp](#isrestprop)
    -   [TupleProp](#tupleprop)
    -   [isTupleProp](#istupleprop)
    -   [UndefinedProp](#undefinedprop)
    -   [isUndefinedProp](#isundefinedprop)
    -   [UnknownProp](#unknownprop)
    -   [isUnknownProp](#isunknownprop)
    -   [NullProp](#nullprop)
    -   [isNullProp](#isnullprop)
    -   [BaseFunctionProp](#basefunctionprop)
    -   [FunctionProp](#functionprop)
    -   [ConstructorProp](#constructorprop)
    -   [GetterProp](#getterprop)
    -   [SetterProp](#setterprop)
    -   [isFunctionProp](#isfunctionprop)
    -   [isFunctionBaseType](#isfunctionbasetype)
    -   [VoidProp](#voidprop)
    -   [isVoidProp](#isvoidprop)
    -   [ClassProp](#classprop)
    -   [ComponentProp](#componentprop)
    -   [isClassProp](#isclassprop)
    -   [InterfaceProp](#interfaceprop)
    -   [isInterfaceProp](#isinterfaceprop)
    -   [TypeProp](#typeprop)
    -   [isTypeProp](#istypeprop)
    -   [HasGenericsProp](#hasgenericsprop)
    -   [hasGenerics](#hasgenerics)
    -   [HasPropertiesProp](#haspropertiesprop)
    -   [hasProperties](#hasproperties)
    -   [ArrayProp](#arrayprop)
    -   [isArrayProp](#isarrayprop)
    -   [AnyProp](#anyprop)
    -   [isAnyProp](#isanyprop)
    -   [IndexProp](#indexprop)
    -   [isIndexProp](#isindexprop)
    -   [ValueProp](#valueprop)
    -   [isValueProp](#isvalueprop)
    -   [ClassLikeProp](#classlikeprop)
    -   [isClassLikeProp](#isclasslikeprop)
    -   [ObjectLikeProp](#objectlikeprop)
    -   [isObjectLikeProp](#isobjectlikeprop)
    -   [PropDiagnostic](#propdiagnostic)
    -   [PropTypes](#proptypes)
    -   [typeNameToPropKind](#typenametopropkind)
    -   [JSDocInfoType](#jsdocinfotype)
    -   [propValue](#propvalue)
    -   [trimQuotes](#trimquotes)
    -   [isVariableLikeDeclaration](#isvariablelikedeclaration)
    -   [isHasType](#ishastype)
    -   [isSignatureDeclaration](#issignaturedeclaration)
    -   [tsKindToPropKind](#tskindtopropkind)
    -   [ObjectTypeDeclaration](#objecttypedeclaration)
    -   [isObjectTypeDeclaration](#isobjecttypedeclaration)
    -   [TypeParameterType](#typeparametertype)
    -   [isTypeParameterType](#istypeparametertype)
    -   [GenericsType](#genericstype)
    -   [isGenericsType](#isgenericstype)
    -   [FunctionLike](#functionlike)
    -   [isFunctionLike](#isfunctionlike)
    -   [ArrayLike](#arraylike)
    -   [isArrayLike](#isarraylike)
    -   [tsDefaults](#tsdefaults)
    -   [ParseOptions](#parseoptions)
    -   [ParsePlugin](#parseplugin)
    -   [defaultParseOptions](#defaultparseoptions)
    -   [DocsOptions](#docsoptions)
    -   [ProgramOptions](#programoptions)
    -   [ResolverReturnType](#resolverreturntype)
    -   [TypeResolver](#typeresolver)
    -   [getTypeKind](#gettypekind)
    -   [getSymbolType](#getsymboltype)
    -   [ISymbolParser](#isymbolparser)
    -   [updateModifiers](#updatemodifiers)
    -   [getFunctionLike](#getfunctionlike)
    -   [getObjectStaticProp](#getobjectstaticprop)

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

<api-readme />

<!-- START-API-README -->

## analyzeFiles

**`function`** _defined in [@structured-types/api/packages/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L60)_

API to analyze the given files

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
     collectFilePath: true,
     collectLinesOfCode: true,
     tsOptions: {
       allowJs: true,
     }
    })

## parseFiles

**`function`** _defined in [@structured-types/api/packages/api/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/index.ts#L224)_

API to analyze the given files by also loading the local typescript options from tsconfig

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
     collectFilePath: true,
     collectLinesOfCode: true,
    })

## mergeJSDoc

**`function`** _defined in [@structured-types/api/packages/api/src/jsdoc/mergeJSDoc.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/jsdoc/mergeJSDoc.ts#L32)_

**parameters**

| Name       | Type                              |
| ---------- | --------------------------------- |
| `parser*`  | [`ISymbolParser`](#isymbolparser) |
| `prop*`    | [`PropType`](#proptype)           |
| `options*` | [`ParseOptions`](#parseoptions)   |
| `node`     | ts.Node                           |
| `returns`  | [`PropType`](#proptype)           |

## mergeNodeComments

**`function`** _defined in [@structured-types/api/packages/api/src/jsdoc/mergeJSDoc.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/jsdoc/mergeJSDoc.ts#L45)_

**parameters**

| Name       | Type                              |
| ---------- | --------------------------------- |
| `parser*`  | [`ISymbolParser`](#isymbolparser) |
| `prop*`    | [`PropType`](#proptype)           |
| `options*` | [`ParseOptions`](#parseoptions)   |
| `node`     | ts.Node                           |
| `returns`  | [`PropType`](#proptype) \| `null` |

## cleanJSDocText

**`function`** _defined in [@structured-types/api/packages/api/src/jsdoc/parseJSDocTags.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/jsdoc/parseJSDocTags.ts#L13)_

**parameters**

| Name      | Type     |
| --------- | -------- |
| `s*`      | `string` |
| `returns` | `string` |

## tagCommentToString

**`function`** _defined in [@structured-types/api/packages/api/src/jsdoc/parseJSDocTags.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/jsdoc/parseJSDocTags.ts#L31)_

**parameters**

| Name      | Type                                       |
| --------- | ------------------------------------------ |
| `comment` | `string` \| `NodeArray`&lt;`JSDocComment`> |
| `returns` | `string` \| `undefined`                    |

## parseJSDocTag

**`function`** _defined in [@structured-types/api/packages/api/src/jsdoc/parseJSDocTags.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/jsdoc/parseJSDocTags.ts#L84)_

**parameters**

| Name       | Type                              |
| ---------- | --------------------------------- |
| `parser*`  | [`ISymbolParser`](#isymbolparser) |
| `options*` | [`ParseOptions`](#parseoptions)   |
| `prop*`    | [`PropType`](#proptype)           |
| `tag*`     | JSDocTag                          |
| `returns`  | [`PropType`](#proptype)           |

## parseJSDocTags

**`function`** _defined in [@structured-types/api/packages/api/src/jsdoc/parseJSDocTags.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/jsdoc/parseJSDocTags.ts#L228)_

**parameters**

| Name          | Type                                   |
| ------------- | -------------------------------------- |
| `parser*`     | [`ISymbolParser`](#isymbolparser)      |
| `options*`    | [`ParseOptions`](#parseoptions)        |
| `declaration` | ts.Node                                |
| `returns`     | [`PropType`](#proptype) \| `undefined` |

## resolveType

**`function`** _defined in [@structured-types/api/packages/api/src/ts/resolveType.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts/resolveType.ts#L4)_

**parameters**

| Name      | Type                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `props*`  | { `symbolType`: `Type`, `declaration`: `ts.Declaration`, `parser`: [`ISymbolParser`](#isymbolparser) } |
| `options` | [`DocsOptions`](#docsoptions)                                                                          |
| `returns` | [`ResolverReturnType`](#resolverreturntype)                                                            |

## getInitializer

**`function`** _defined in [@structured-types/api/packages/api/src/ts/getInitializer.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts/getInitializer.ts#L4)_

**parameters**

| Name          | Type                         |
| ------------- | ---------------------------- |
| `declaration` | ts.Node                      |
| `returns`     | ts.Expression \| `undefined` |

## JSDocExample

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L6)_

JSDoc example item

**properties**

| Name      | Type     | Description            |
| --------- | -------- | ---------------------- |
| `caption` | `string` | example caption/title  |
| `content` | `string` | example source/content |

## JSDocPropTag

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L20)_

JSDoc generic tag item

**properties**

| Name      | Type     | Description          |
| --------- | -------- | -------------------- |
| `tag*`    | `string` | tag name             |
| `content` | `string` | optional tag content |

## PropKind

**`enum`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L34)_

The property type or kind

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

## PropType

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L65)_

Base prop type interface

**properties**

| Name          | Type                                                                                                              | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | jsdoc ignore tag, to be excluded from documentations                                           |

## ObjectProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L160)_

Object property

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Object        | [`PropKind`](#propkind) | `26`  | generic properties                                                                             |
| `properties`  | [`PropType`](#proptype)\[]            |                         | ``    | object properties list                                                                         |
| `value`       | [`PropType`](#proptype)\[]            |                         | ``    | value, if the object is initialized                                                            |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isObjectProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L175)_

ObjectProp type guard predicate

**parameters**

| Name      | Type                        |
| --------- | --------------------------- |
| `prop*`   | [`PropType`](#proptype)     |
| `returns` | [`ObjectProp`](#objectprop) |

## StringProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L182)_

String property

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).String        | [`PropKind`](#propkind) | `1`   | generic properties                                                                             |
| `value`       | `string`                              |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isStringProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L190)_

StringProp type guard predicate

**parameters**

| Name      | Type                        |
| --------- | --------------------------- |
| `prop*`   | [`PropType`](#proptype)     |
| `returns` | [`StringProp`](#stringprop) |

## NumberProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L194)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Number        | [`PropKind`](#propkind) | `2`   | generic properties                                                                             |
| `value`       | `number`                              |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isNumberProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L202)_

NumberProp type guard predicate

**parameters**

| Name      | Type                        |
| --------- | --------------------------- |
| `prop*`   | [`PropType`](#proptype)     |
| `returns` | [`NumberProp`](#numberprop) |

## BooleanProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L206)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Boolean       | [`PropKind`](#propkind) | `3`   | generic properties                                                                             |
| `value`       | `boolean`                             |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isBooleanProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L214)_

BooleanProp type guard predicate

**parameters**

| Name      | Type                          |
| --------- | ----------------------------- |
| `prop*`   | [`PropType`](#proptype)       |
| `returns` | [`BooleanProp`](#booleanprop) |

## UnionProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L218)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Union         | [`PropKind`](#propkind) | `4`   | generic properties                                                                             |
| `properties`  | [`PropType`](#proptype)\[]            |                         | ``    |                                                                                                |
| `value`       | `any`                                 |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isUnionProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L227)_

UnionProp type guard predicate

**parameters**

| Name      | Type                      |
| --------- | ------------------------- |
| `prop*`   | [`PropType`](#proptype)   |
| `returns` | [`UnionProp`](#unionprop) |

## HasValueProp

**`union`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L231)_

[`StringProp`](#stringprop)

 \| 

[`NumberProp`](#numberprop)

 \| 

[`BooleanProp`](#booleanprop)

 \| 

[`UnionProp`](#unionprop)

## hasValue

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L236)_

type guard predicate to determine if the prop has a value field

**parameters**

| Name      | Type                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `prop*`   | [`PropType`](#proptype)                                                                                                  |
| `returns` | [`StringProp`](#stringprop) \| [`NumberProp`](#numberprop) \| [`BooleanProp`](#booleanprop) \| [`UnionProp`](#unionprop) |

## EnumProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L244)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `properties`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isEnumProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L251)_

EnumProp type guard predicate

**parameters**

| Name      | Type                    |
| --------- | ----------------------- |
| `prop*`   | [`PropType`](#proptype) |
| `returns` | [`EnumProp`](#enumprop) |

## RestProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L255)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Rest          | [`PropKind`](#propkind) | `7`   | generic properties                                                                             |
| `prop`        | [`PropType`](#proptype)               |                         | ``    | Base prop type interface                                                                       |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isRestProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L263)_

RestProp type guard predicate

**parameters**

| Name      | Type                    |
| --------- | ----------------------- |
| `prop*`   | [`PropType`](#proptype) |
| `returns` | [`RestProp`](#restprop) |

## TupleProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L267)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Tuple         | [`PropKind`](#propkind) | `6`   | generic properties                                                                             |
| `properties`  | [`PropType`](#proptype)\[]            |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isTupleProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L275)_

TupleProp type guard predicate

**parameters**

| Name      | Type                      |
| --------- | ------------------------- |
| `prop*`   | [`PropType`](#proptype)   |
| `returns` | [`TupleProp`](#tupleprop) |

## UndefinedProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L279)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Undefined     | [`PropKind`](#propkind) | `8`   | generic properties                                                                             |
| `value`       | `undefined`                           |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isUndefinedProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L287)_

UndefinedProp type guard predicate

**parameters**

| Name      | Type                              |
| --------- | --------------------------------- |
| `prop*`   | [`PropType`](#proptype)           |
| `returns` | [`UndefinedProp`](#undefinedprop) |

## UnknownProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L291)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Unknown       | [`PropKind`](#propkind) | `9`   | generic properties                                                                             |
| `value`       | `unknown`                             |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isUnknownProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L299)_

UnknownProp type guard predicate

**parameters**

| Name      | Type                          |
| --------- | ----------------------------- |
| `prop*`   | [`PropType`](#proptype)       |
| `returns` | [`UnknownProp`](#unknownprop) |

## NullProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L303)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                  | Parent                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ----------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Null          | [`PropKind`](#propkind) | `10`  | generic properties                                                                             |
| `value`       | `null`                                |                         | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype) | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype) | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype) | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype) | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype) | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype) | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype) | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype) | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype) | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype) | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype) | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype) | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype) | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype) | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype) | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype) | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype) | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype) | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype) | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isNullProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L311)_

NullProp type guard predicate

**parameters**

| Name      | Type                    |
| --------- | ----------------------- |
| `prop*`   | [`PropType`](#proptype) |
| `returns` | [`NullProp`](#nullprop) |

## BaseFunctionProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L315)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `parameters`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `returns`     | [`PropType`](#proptype)                                                                                           |                         | Base prop type interface                                                                       |
| `types`       | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## FunctionProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L321)_

extends [`BaseFunctionProp`](#basefunctionprop)

**properties**

| Name          | Type                                  | Parent                                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | --------------------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Function      | [`PropKind`](#propkind)                 | `11`  | generic properties                                                                             |
| `properties`  | [`PropType`](#proptype)\[]            |                                         | ``    |                                                                                                |
| `parameters`  | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `returns`     | [`PropType`](#proptype)               | [`BaseFunctionProp`](#basefunctionprop) | ``    | Base prop type interface                                                                       |
| `types`       | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype)                 | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype)                 | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype)                 | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype)                 | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype)                 | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype)                 | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype)                 | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype)                 | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype)                 | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## ConstructorProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L326)_

extends [`BaseFunctionProp`](#basefunctionprop)

**properties**

| Name          | Type                                  | Parent                                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | --------------------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Constructor   | [`PropKind`](#propkind)                 | `21`  | generic properties                                                                             |
| `parameters`  | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `returns`     | [`PropType`](#proptype)               | [`BaseFunctionProp`](#basefunctionprop) | ``    | Base prop type interface                                                                       |
| `types`       | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype)                 | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype)                 | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype)                 | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype)                 | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype)                 | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype)                 | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype)                 | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype)                 | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype)                 | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## GetterProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L330)_

extends [`BaseFunctionProp`](#basefunctionprop)

**properties**

| Name          | Type                                  | Parent                                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | --------------------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Getter        | [`PropKind`](#propkind)                 | `22`  | generic properties                                                                             |
| `parameters`  | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `returns`     | [`PropType`](#proptype)               | [`BaseFunctionProp`](#basefunctionprop) | ``    | Base prop type interface                                                                       |
| `types`       | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype)                 | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype)                 | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype)                 | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype)                 | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype)                 | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype)                 | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype)                 | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype)                 | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype)                 | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## SetterProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L333)_

extends [`BaseFunctionProp`](#basefunctionprop)

**properties**

| Name          | Type                                  | Parent                                  | Value | Description                                                                                    |
| ------------- | ------------------------------------- | --------------------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Getter        | [`PropKind`](#propkind)                 | `22`  | generic properties                                                                             |
| `parameters`  | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `returns`     | [`PropType`](#proptype)               | [`BaseFunctionProp`](#basefunctionprop) | ``    | Base prop type interface                                                                       |
| `types`       | [`PropType`](#proptype)\[]            | [`BaseFunctionProp`](#basefunctionprop) | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype)                 | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype)                 | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype)                 | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype)                 | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype)                 | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype)                 | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype)                 | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype)                 | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype)                 | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype)                 | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype)                 | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype)                 | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype)                 | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype)                 | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isFunctionProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L340)_

FunctionProp type guard predicate

**parameters**

| Name      | Type                            |
| --------- | ------------------------------- |
| `prop*`   | [`PropType`](#proptype)         |
| `returns` | [`FunctionProp`](#functionprop) |

## isFunctionBaseType

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L347)_

BaseFunctionProp type guard predicate

**parameters**

| Name      | Type                                    |
| --------- | --------------------------------------- |
| `prop*`   | [`PropType`](#proptype)                 |
| `returns` | [`BaseFunctionProp`](#basefunctionprop) |

## VoidProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L358)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `value`       | `void`                                                                                                            |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isVoidProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L365)_

VoidProp type guard predicate

**parameters**

| Name      | Type                    |
| --------- | ----------------------- |
| `prop*`   | [`PropType`](#proptype) |
| `returns` | [`VoidProp`](#voidprop) |

## ClassProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L369)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `implements`  | [`InterfaceProp`](#interfaceprop)\[]                                                                              |                         |                                                                                                |
| `extends`     | `string`\[]                                                                                                       |                         |                                                                                                |
| `generics`    | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `properties`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## ComponentProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L375)_

extends [`ClassProp`](#classprop)

**properties**

| Name          | Type                                  | Parent                    | Value | Description                                                                                    |
| ------------- | ------------------------------------- | ------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `kind*`       | [`PropKind`](#propkind).Component     | [`PropKind`](#propkind)   | `25`  | generic properties                                                                             |
| `implements`  | [`InterfaceProp`](#interfaceprop)\[]  | [`ClassProp`](#classprop) | ``    |                                                                                                |
| `extends`     | `string`\[]                           | [`ClassProp`](#classprop) | ``    |                                                                                                |
| `generics`    | [`PropType`](#proptype)\[]            | [`ClassProp`](#classprop) | ``    |                                                                                                |
| `properties`  | [`PropType`](#proptype)\[]            | [`ClassProp`](#classprop) | ``    |                                                                                                |
| `name`        | `string`                              | [`PropType`](#proptype)   | ``    | name of the property                                                                           |
| `parent`      | `string`                              | [`PropType`](#proptype)   | ``    | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                             | [`PropType`](#proptype)   | ``    | by default, properties are required                                                            |
| `readonly`    | `boolean`                             | [`PropType`](#proptype)   | ``    | readonly property                                                                              |
| `abstract`    | `boolean`                             | [`PropType`](#proptype)   | ``    | abstract property                                                                              |
| `async`       | `boolean`                             | [`PropType`](#proptype)   | ``    | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"  | [`PropType`](#proptype)   | ``    | property visibility                                                                            |
| `static`      | `boolean`                             | [`PropType`](#proptype)   | ``    | true, of the class property is static                                                          |
| `filePath`    | `string`                              | [`PropType`](#proptype)   | ``    | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` } | [`PropType`](#proptype)   | ``    | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                              | [`PropType`](#proptype)   | ``    | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                              | [`PropType`](#proptype)   | ``    | used plugin name ie 'react'...                                                                 |
| `description` | `string`                              | [`PropType`](#proptype)   | ``    | jsdoc description                                                                              |
| `fires`       | `string`\[]                           | [`PropType`](#proptype)   | ``    | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                           | [`PropType`](#proptype)   | ``    | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]    | [`PropType`](#proptype)   | ``    | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]    | [`PropType`](#proptype)   | ``    | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                              | [`PropType`](#proptype)   | ``    | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                      | [`PropType`](#proptype)   | ``    | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                             | [`PropType`](#proptype)   | ``    | jsdoc ignore tag, to be excluded from documentations                                           |

## isClassProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L381)_

ClassProp type guard predicate

**parameters**

| Name      | Type                      |
| --------- | ------------------------- |
| `prop*`   | [`PropType`](#proptype)   |
| `returns` | [`ClassProp`](#classprop) |

## InterfaceProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L385)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `extends`     | `string`\[]                                                                                                       |                         |                                                                                                |
| `properties`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `generics`    | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isInterfaceProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L394)_

InterfaceProp type guard predicate

**parameters**

| Name      | Type                              |
| --------- | --------------------------------- |
| `prop*`   | [`PropType`](#proptype)           |
| `returns` | [`InterfaceProp`](#interfaceprop) |

## TypeProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L398)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `extends`     | `string`\[]                                                                                                       |                         |                                                                                                |
| `properties`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `generics`    | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isTypeProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L407)_

TypeProp type guard predicate

**parameters**

| Name      | Type                    |
| --------- | ----------------------- |
| `prop*`   | [`PropType`](#proptype) |
| `returns` | [`TypeProp`](#typeprop) |

## HasGenericsProp

**`union`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L411)_

[`TypeProp`](#typeprop)

 \| 

[`InterfaceProp`](#interfaceprop)

 \| 

[`ClassProp`](#classprop)

## hasGenerics

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L416)_

HasGenericsProp predicate to determine if a prop has a generics field

**parameters**

| Name      | Type                                                                                      |
| --------- | ----------------------------------------------------------------------------------------- |
| `prop*`   | [`PropType`](#proptype)                                                                   |
| `returns` | [`TypeProp`](#typeprop) \| [`InterfaceProp`](#interfaceprop) \| [`ClassProp`](#classprop) |

## HasPropertiesProp

**`union`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L425)_

[`UnionProp`](#unionprop)

 \| 

[`ObjectProp`](#objectprop)

 \| 

[`EnumProp`](#enumprop)

 \| 

[`TupleProp`](#tupleprop)

 \| 

[`FunctionProp`](#functionprop)

 \| 

[`TypeProp`](#typeprop)

 \| 

[`InterfaceProp`](#interfaceprop)

 \| 

[`ComponentProp`](#componentprop)

 \| 

[`ClassProp`](#classprop)

## hasProperties

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L439)_

HasPropertiesProp predicate to determine if a prop has a properties field

**parameters**

| Name      | Type                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prop*`   | [`PropType`](#proptype)                                                                                                                                                                                                                                                               |
| `returns` | [`UnionProp`](#unionprop) \| [`ObjectProp`](#objectprop) \| [`EnumProp`](#enumprop) \| [`TupleProp`](#tupleprop) \| [`FunctionProp`](#functionprop) \| [`TypeProp`](#typeprop) \| [`InterfaceProp`](#interfaceprop) \| [`ComponentProp`](#componentprop) \| [`ClassProp`](#classprop) |

## ArrayProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L453)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `properties`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `value`       | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isArrayProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L461)_

ArrayProp type guard predicate

**parameters**

| Name      | Type                      |
| --------- | ------------------------- |
| `prop*`   | [`PropType`](#proptype)   |
| `returns` | [`ArrayProp`](#arrayprop) |

## AnyProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L465)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `value`       | `any`                                                                                                             |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isAnyProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L472)_

AnyProp type guard predicate

**parameters**

| Name      | Type                    |
| --------- | ----------------------- |
| `prop*`   | [`PropType`](#proptype) |
| `returns` | [`AnyProp`](#anyprop)   |

## IndexProp

**`interface`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L476)_

extends [`PropType`](#proptype)

**properties**

| Name          | Type                                                                                                              | Parent                  | Description                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `index*`      | [`PropType`](#proptype)                                                                                           |                         |                                                                                                |
| `prop`        | [`PropType`](#proptype)                                                                                           |                         | Base prop type interface                                                                       |
| `properties`  | [`PropType`](#proptype)\[]                                                                                        |                         |                                                                                                |
| `kind`        | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 | [`PropType`](#proptype) | The property type or kind                                                                      |
| `name`        | `string`                                                                                                          | [`PropType`](#proptype) | name of the property                                                                           |
| `parent`      | `string`                                                                                                          | [`PropType`](#proptype) | the name of the parent property, if combined props                                             |
| `optional`    | `boolean`                                                                                                         | [`PropType`](#proptype) | by default, properties are required                                                            |
| `readonly`    | `boolean`                                                                                                         | [`PropType`](#proptype) | readonly property                                                                              |
| `abstract`    | `boolean`                                                                                                         | [`PropType`](#proptype) | abstract property                                                                              |
| `async`       | `boolean`                                                                                                         | [`PropType`](#proptype) | async function                                                                                 |
| `visibility`  | "private" \| "protected" \| "public"                                                                              | [`PropType`](#proptype) | property visibility                                                                            |
| `static`      | `boolean`                                                                                                         | [`PropType`](#proptype) | true, of the class property is static                                                          |
| `filePath`    | `string`                                                                                                          | [`PropType`](#proptype) | name of the file where the property is defined only if different from the default file path    |
| `loc`         | { `line`: `number`, `col`: `number` }                                                                             | [`PropType`](#proptype) | source code location for the symbol declaration available if collectLinesOfCode is set to true |
| `type`        | `string`                                                                                                          | [`PropType`](#proptype) | type name of the property or lookup into \_\_helpers list of symbols                           |
| `extension`   | `string`                                                                                                          | [`PropType`](#proptype) | used plugin name ie 'react'...                                                                 |
| `description` | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc description                                                                              |
| `fires`       | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc fires events list                                                                        |
| `see`         | `string`\[]                                                                                                       | [`PropType`](#proptype) | jsdoc see links list                                                                           |
| `examples`    | [`JSDocExample`](#jsdocexample)\[]                                                                                | [`PropType`](#proptype) | jsdoc examples list                                                                            |
| `tags`        | [`JSDocPropTag`](#jsdocproptag)\[]                                                                                | [`PropType`](#proptype) | jsdoc generic tags, not covered by other props                                                 |
| `summary`     | `string`                                                                                                          | [`PropType`](#proptype) | jsdoc summary                                                                                  |
| `deprecated`  | `string` \| true                                                                                                  | [`PropType`](#proptype) | jsdoc deprecated tag                                                                           |
| `ignore`      | `boolean`                                                                                                         | [`PropType`](#proptype) | jsdoc ignore tag, to be excluded from documentations                                           |

## isIndexProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L485)_

IndexProp type guard predicate

**parameters**

| Name      | Type                      |
| --------- | ------------------------- |
| `prop*`   | [`PropType`](#proptype)   |
| `returns` | [`IndexProp`](#indexprop) |

## ValueProp

**`union`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L489)_

[`AnyProp`](#anyprop)

 \| 

[`ArrayProp`](#arrayprop)

 \| 

[`VoidProp`](#voidprop)

 \| 

[`UnionProp`](#unionprop)

 \| 

[`NullProp`](#nullprop)

 \| 

[`UnknownProp`](#unknownprop)

 \| 

[`UndefinedProp`](#undefinedprop)

 \| 

[`BooleanProp`](#booleanprop)

 \| 

[`NumberProp`](#numberprop)

 \| 

[`StringProp`](#stringprop)

 \| 

[`ObjectProp`](#objectprop)

## isValueProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L505)_

ValueProp predicate to determine if a prop has a value field

**parameters**

| Name      | Type                                                                                                                                                                                                                                                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prop*`   | [`PropType`](#proptype)                                                                                                                                                                                                                                                                                                                   |
| `returns` | [`AnyProp`](#anyprop) \| [`ArrayProp`](#arrayprop) \| [`VoidProp`](#voidprop) \| [`UnionProp`](#unionprop) \| [`NullProp`](#nullprop) \| [`UnknownProp`](#unknownprop) \| [`UndefinedProp`](#undefinedprop) \| [`BooleanProp`](#booleanprop) \| [`NumberProp`](#numberprop) \| [`StringProp`](#stringprop) \| [`ObjectProp`](#objectprop) |

## ClassLikeProp

**`union`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L521)_

[`ClassProp`](#classprop)

 \| 

[`InterfaceProp`](#interfaceprop)

 \| 

[`TypeProp`](#typeprop)

## isClassLikeProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L526)_

ClassLikeProp predicate to determine if a prop is class-like

**parameters**

| Name      | Type                                                                                      |
| --------- | ----------------------------------------------------------------------------------------- |
| `prop*`   | [`PropType`](#proptype)                                                                   |
| `returns` | [`ClassProp`](#classprop) \| [`InterfaceProp`](#interfaceprop) \| [`TypeProp`](#typeprop) |

## ObjectLikeProp

**`union`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L533)_

[`ClassProp`](#classprop)

 \| 

[`InterfaceProp`](#interfaceprop)

 \| 

[`TypeProp`](#typeprop)

 \| 

[`EnumProp`](#enumprop)

 \| 

[`ObjectProp`](#objectprop)

 \| 

[`IndexProp`](#indexprop)

## isObjectLikeProp

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L538)_

ObjectLikeProp predicate to determine if a prop is object-like

**parameters**

| Name      | Type                                                                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prop*`   | [`PropType`](#proptype)                                                                                                                                                          |
| `returns` | [`ClassProp`](#classprop) \| [`InterfaceProp`](#interfaceprop) \| [`TypeProp`](#typeprop) \| [`EnumProp`](#enumprop) \| [`ObjectProp`](#objectprop) \| [`IndexProp`](#indexprop) |

## PropDiagnostic

**`type`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L550)_

diagnostics row data

**properties**

| Name        | Type                    | Description                     |
| ----------- | ----------------------- | ------------------------------- |
| `category*` | `ts.DiagnosticCategory` | error category                  |
| `message*`  | `string`                | error text message              |
| `row`       | `number`                | source code line of the error   |
| `column`    | `number`                | source code column of the error |
| `fileName`  | `string`                | source file name                |

## PropTypes

**`type`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L576)_

Top-level prop type, with aded optional \_\_helpers and \_\_diagnostics fields.

**properties**

| Name            | Type                                           | Description                                                                                                   |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `__helpers`     | `Record`&lt;`string`, [`PropType`](#proptype)> | Utility symbols such as parent types are stored here. Only available if option collectHelpers is set to true. |
| `__diagnostics` | [`PropDiagnostic`](#propdiagnostic)\[]         | Typescript program diagnostics / errors. Only available if option collectDiagnostics is set to true.          |

## typeNameToPropKind

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L593)_

**parameters**

| Name      | Type                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `type*`   | `string`                                                                                                                         |
| `returns` | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 \| `undefined` |

## JSDocInfoType

**`type`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L613)_

Helper class to extract jsdoc comments from typescript compiler

**properties**

| Name      | Type                                       |
| --------- | ------------------------------------------ |
| `comment` | `string` \| `NodeArray`&lt;`JSDocComment`> |

## propValue

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L623)_

assign the value of a property, with type conversion

**parameters**

| Name      | Type                    | Description           |
| --------- | ----------------------- | --------------------- |
| `prop*`   | [`PropType`](#proptype) | the input property    |
| `value`   | `string`                | the value as a string |
| `returns` | [`PropType`](#proptype) | the modified property |

## trimQuotes

**`function`** _defined in [@structured-types/api/packages/api/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/types.ts#L641)_

remove single and double quotes around a string

**parameters**

| Name      | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| `txt*`    | `string` | the input text                        |
| `returns` | `string` | the text without the enclosing quotes |

## isVariableLikeDeclaration

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L13)_

**parameters**

| Name      | Type                                                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node*`   | Node                                                                                                                                                         |
| `returns` | ts.VariableDeclaration \| ts.ParameterDeclaration \| ts.BindingElement \| ts.PropertyDeclaration \| ts.PropertySignature \| ts.JsxAttribute \| ts.EnumMember |

## isHasType

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L28)_

**parameters**

| Name      | Type                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node*`   | Node                                                                                                                                                                                                                                                                                                                                                             |
| `returns` | SignatureDeclaration \| VariableDeclaration \| ParameterDeclaration \| PropertySignature \| PropertyDeclaration \| TypePredicateNode \| ParenthesizedTypeNode \| TypeOperatorNode \| MappedTypeNode \| AssertionExpression \| TypeAliasDeclaration \| JSDocTypeExpression \| JSDocNonNullableType \| JSDocNullableType \| JSDocOptionalType \| JSDocVariadicType |

## isSignatureDeclaration

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L55)_

**parameters**

| Name      | Type                                                                                                                                                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node*`   | Node                                                                                                                                                                                                                                                                                                          |
| `returns` | CallSignatureDeclaration \| ConstructSignatureDeclaration \| MethodSignature \| IndexSignatureDeclaration \| FunctionTypeNode \| ConstructorTypeNode \| JSDocFunctionType \| FunctionDeclaration \| MethodDeclaration \| ConstructorDeclaration \| AccessorDeclaration \| FunctionExpression \| ArrowFunction |

## tsKindToPropKind

**`enum`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L75)_

The property type or kind

**properties**

| Name           | Type                               | Parent                  | Value |
| -------------- | ---------------------------------- | ----------------------- | ----- |
| `String*`      | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `1`   |
| `Number*`      | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `2`   |
| `Boolean*`     | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `3`   |
| `Union*`       | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `4`   |
| `Enum*`        | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `5`   |
| `Tuple*`       | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `6`   |
| `Rest*`        | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `7`   |
| `Undefined*`   | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `8`   |
| `Unknown*`     | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `9`   |
| `Null*`        | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `10`  |
| `Function*`    | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `11`  |
| `Void*`        | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `12`  |
| `Class*`       | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `13`  |
| `Interface*`   | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `14`  |
| `Type*`        | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `15`  |
| `Array*`       | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `16`  |
| `Any*`         | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `17`  |
| `Index*`       | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `20`  |
| `Constructor*` | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `21`  |
| `Getter*`      | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `22`  |
| `Setter*`      | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `23`  |
| `BigInt*`      | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `24`  |
| `Component*`   | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `25`  |
| `Object*`      | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `26`  |
| `Namespace*`   | `number` ([`PropKind`](#propkind)) | [`PropKind`](#propkind) | `27`  |

## ObjectTypeDeclaration

**`union`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L113)_

ts.ClassDeclaration | ts.ClassExpression | ts.InterfaceDeclaration

## isObjectTypeDeclaration

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L117)_

**parameters**

| Name      | Type                                                                 |
| --------- | -------------------------------------------------------------------- |
| `node*`   | Node                                                                 |
| `returns` | ts.ClassDeclaration \| ts.ClassExpression \| ts.InterfaceDeclaration |

## TypeParameterType

**`union`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L127)_

ts.ClassDeclaration | ts.ClassExpression | ts.InterfaceDeclaration | ts.TypeAliasDeclaration

## isTypeParameterType

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L128)_

**parameters**

| Name      | Type                                                                                            |
| --------- | ----------------------------------------------------------------------------------------------- |
| `node*`   | Node                                                                                            |
| `returns` | ts.ClassDeclaration \| ts.ClassExpression \| ts.InterfaceDeclaration \| ts.TypeAliasDeclaration |

## GenericsType

**`union`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L132)_

ts.ClassDeclaration | ts.ClassExpression | ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.TypeLiteralNode

## isGenericsType

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L134)_

**parameters**

| Name      | Type                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| `node*`   | Node                                                                                                                  |
| `returns` | ts.ClassDeclaration \| ts.ClassExpression \| ts.InterfaceDeclaration \| ts.TypeAliasDeclaration \| ts.TypeLiteralNode |

## FunctionLike

**`union`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L137)_

ts.FunctionDeclaration | ts.ConstructorDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.ArrowFunction | ts.FunctionTypeNode | ts.MethodSignature | ts.MethodDeclaration

## isFunctionLike

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L147)_

**parameters**

| Name      | Type                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node*`   | Node                                                                                                                                                                                                   |
| `returns` | ts.FunctionDeclaration \| ts.ConstructorDeclaration \| ts.GetAccessorDeclaration \| ts.SetAccessorDeclaration \| ts.ArrowFunction \| ts.FunctionTypeNode \| ts.MethodSignature \| ts.MethodDeclaration |

## ArrayLike

**`union`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L160)_

ts.ArrayTypeNode | ts.ArrayLiteralExpression | ts.TypeReferenceNode

## isArrayLike

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L165)_

**parameters**

| Name      | Type                                                                  |
| --------- | --------------------------------------------------------------------- |
| `node*`   | Node                                                                  |
| `returns` | ts.ArrayTypeNode \| ts.ArrayLiteralExpression \| ts.TypeReferenceNode |

## tsDefaults

**`interface`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L174)_

**properties**

| Name                            | Type      | Value  |
| ------------------------------- | --------- | ------ |
| `jsx*`                          | `any`     | ``     |
| `module*`                       | `any`     | ``     |
| `target*`                       | `any`     | ``     |
| `noImplicitAny*`                | `boolean` | `true` |
| `noImplicitReturns*`            | `boolean` | `true` |
| `strictNullChecks*`             | `boolean` | `true` |
| `strictFunctionTypes*`          | `boolean` | `true` |
| `strictBindCallApply*`          | `boolean` | `true` |
| `strictPropertyInitialization*` | `boolean` | `true` |
| `esModuleInterop*`              | `boolean` | `true` |
| `noImplicitThis*`               | `boolean` | `true` |
| `alwaysStrict*`                 | `boolean` | `true` |
| `allowJs*`                      | `boolean` | `true` |
| `checkJs*`                      | `boolean` | `true` |

## ParseOptions

**`interface`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L194)_

parsing options

**properties**

| Name                 | Type                                                               | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
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
| `scope`              | "exports" \| "all"                                                 | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the  `loc`  prop             |

## ParsePlugin

**`type`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L278)_

**properties**

| Name                 | Type                                                                                                                                                                              | Parent                          | Description                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tsOptions`          | ts.CompilerOptions                                                                                                                                                                | [`DocsOptions`](#docsoptions)   |                                                                                                                                                        |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                                                                                                                                    | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                                  |
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
| `scope`              | "exports" \| "all"                                                                                                                                                                | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                          |
| `collectFilePath`    | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect the file path of objects                                                                                                            |
| `collectLinesOfCode` | `boolean`                                                                                                                                                                         | [`ParseOptions`](#parseoptions) | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the  `loc`  prop                  |
| `typesResolve*`      | (`props`\*: { `symbolType`: `Type`, `declaration`: `ts.Declaration`, `parser`: [`ISymbolParser`](#isymbolparser) }) => [`ResolverReturnType`](#resolverreturntype) \| `undefined` |                                 | type resolving custom function ie from a react component will return the props type if the plugin does not recognize the type, should return undefined |
| `pluginName`         | `string`                                                                                                                                                                          |                                 | plugin name                                                                                                                                            |

## defaultParseOptions

**`interface`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L291)_

**properties**

| Name                 | Type                                                               | Parent                          | Value  | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | [`ParseOptions`](#parseoptions) | ``     | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
| `extract`            | `string`\[]                                                        | [`ParseOptions`](#parseoptions) | ``     | list of export names to be extracted. by default all exports are extracted                                                                        |
| `filter`             | (`prop`\*: [`PropType`](#proptype)) => `boolean`                   | [`ParseOptions`](#parseoptions) | ``     | filter properties function. By default filter out all props with ignore === true                                                                  |
| `isInternal`         | (`file`\*: SourceFile, `node`\*: Node) => `boolean` \| `undefined` | [`ParseOptions`](#parseoptions) | ``     | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `maxDepth`           | `number`                                                           | [`ParseOptions`](#parseoptions) | ``     | max depth for extracting child props. default is 5                                                                                                |
| `collectHelpers`     | `boolean`                                                          | [`ParseOptions`](#parseoptions) | `true` | whether to save "helper" props that are used by the main parsed props if set to false will result in a smaller result set                         |
| `collectGenerics`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | `true` | whether to collect generics parameters                                                                                                            |
| `collectParameters`  | `boolean`                                                          | [`ParseOptions`](#parseoptions) | `true` | whether to collect function parameters                                                                                                            |
| `collectProperties`  | `boolean`                                                          | [`ParseOptions`](#parseoptions) | `true` | whether to collect object/type properties                                                                                                         |
| `collectInheritance` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | `true` | whether to collect the inheritance properties                                                                                                     |
| `collectExtension`   | `boolean`                                                          | [`ParseOptions`](#parseoptions) | `true` | whether to collect the plugin/extension name                                                                                                      |
| `collectDiagnostics` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | ``     | whether to collect errors/diagnostics                                                                                                             |
| `collectInternals`   | `boolean`                                                          | [`ParseOptions`](#parseoptions) | ``     | whether to collect internal (typescript) symbols                                                                                                  |
| `plugins`            | [`ParsePlugin`](#parseplugin)\[]                                   | [`ParseOptions`](#parseoptions) | ``     | installed plugins can modify default options and install type resolvers                                                                           |
| `scope`              | "exports" \| "all"                                                 | [`ParseOptions`](#parseoptions) | ``     | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | ``     | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | ``     | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the  `loc`  prop             |

## DocsOptions

**`type`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L316)_

**properties**

| Name                 | Type                                                               | Parent                          | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsOptions`          | ts.CompilerOptions                                                 |                                 |                                                                                                                                                   |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
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
| `scope`              | "exports" \| "all"                                                 | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the  `loc`  prop             |

## ProgramOptions

**`type`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L317)_

**properties**

| Name      | Type            |
| --------- | --------------- |
| `host`    | ts.CompilerHost |
| `program` | ts.Program      |

## ResolverReturnType

**`type`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L321)_

**properties**

| Name                 | Type                                                               | Parent                          | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type*`              | ts.Type \| `undefined`                                             |                                 |                                                                                                                                                   |
| `initializer`        | ts.Node                                                            |                                 |                                                                                                                                                   |
| `declaration`        | ts.Node                                                            |                                 |                                                                                                                                                   |
| `prop`               | [`PropType`](#proptype)                                            |                                 | Base prop type interface                                                                                                                          |
| `pluginName`         | `string`                                                           |                                 |                                                                                                                                                   |
| `isInternal`         | (`file`\*: SourceFile, `node`\*: Node) => `boolean` \| `undefined` | [`ParseOptions`](#parseoptions) | callback function to determine if a node is an internal (typescript) symbol return undefined if you need to use the default isInternal processing |
| `tsOptions`          | ts.CompilerOptions                                                 | [`DocsOptions`](#docsoptions)   |                                                                                                                                                   |
| `internalTypes`      | `Record`&lt;`string`, [`PropKind`](#propkind)>                     | [`ParseOptions`](#parseoptions) | internal types - libs by default includes classes such as  `String` ,  `Function` ...                                                             |
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
| `scope`              | "exports" \| "all"                                                 | [`ParseOptions`](#parseoptions) | by default collects only the exported symbols                                                                                                     |
| `collectFilePath`    | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the file path of objects                                                                                                       |
| `collectLinesOfCode` | `boolean`                                                          | [`ParseOptions`](#parseoptions) | whether to collect the source code location for the symbol declaration if set to true, the data will be collected in the  `loc`  prop             |

## TypeResolver

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L328)_

**parameters**

| Name      | Type                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `props*`  | { `symbolType`: `Type`, `declaration`: `ts.Declaration`, `parser`: [`ISymbolParser`](#isymbolparser) } |
| `returns` | [`ResolverReturnType`](#resolverreturntype) \| `undefined`                                             |

## getTypeKind

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L334)_

**parameters**

| Name       | Type                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `typeNode` | ts.Type                                                                                                                          |
| `returns`  | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 20 & 21 & 22 & 23 & 24 & 25 & 26 & 27 \| `undefined` |

## getSymbolType

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L361)_

**parameters**

| Name       | Type                   |
| ---------- | ---------------------- |
| `checker*` | TypeChecker            |
| `symbol*`  | Symbol                 |
| `returns`  | ts.Type \| `undefined` |

## ISymbolParser

**`interface`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L386)_

**properties**

| Name                      | Type                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checker*`                | TypeChecker                                                                                                                                                            |
| `options*`                | [`ParseOptions`](#parseoptions)                                                                                                                                        |
| `parseProperties*`        | (`properties`\*: NodeArray, `options`\*: [`ParseOptions`](#parseoptions), `types`: [`PropType`](#proptype)\[]) => [`PropType`](#proptype)\[]                           |
| `updateSymbolName*`       | (`prop`\*: [`PropType`](#proptype), `node`: ts.Declaration) => [`PropType`](#proptype)                                                                                 |
| `parseType*`              | (`prop`\*: [`PropType`](#proptype), `options`\*: [`ParseOptions`](#parseoptions), `node`: ts.Node) => [`PropType`](#proptype)                                          |
| `parseTypeValueComments*` | (`prop`\*: [`PropType`](#proptype), `options`\*: [`ParseOptions`](#parseoptions), `declaration`: ts.Node, `initializer`: ts.Node) => [`PropType`](#proptype) \| `null` |
| `parseSymbol*`            | (`symbol`\*: Symbol, `options`\*: [`ParseOptions`](#parseoptions)) => [`PropType`](#proptype) \| `undefined`                                                           |

## updateModifiers

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L418)_

**parameters**

| Name          | Type                    |
| ------------- | ----------------------- |
| `prop*`       | [`PropType`](#proptype) |
| `declaration` | ts.Declaration          |
| `returns`     | [`PropType`](#proptype) |

## getFunctionLike

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L459)_

**parameters**

| Name       | Type                                                                                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checker*` | TypeChecker                                                                                                                                                                                                                                |
| `input*`   | Node                                                                                                                                                                                                                                       |
| `returns`  | ts.FunctionDeclaration \| ts.ConstructorDeclaration \| ts.GetAccessorDeclaration \| ts.SetAccessorDeclaration \| ts.ArrowFunction \| ts.FunctionTypeNode \| ts.MethodSignature \| ts.MethodDeclaration \| ts.CallExpression \| `undefined` |

## getObjectStaticProp

**`function`** _defined in [@structured-types/api/packages/api/src/ts-utils.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api/src/ts-utils.ts#L482)_

**parameters**

| Name        | Type                         |
| ----------- | ---------------------------- |
| `obj*`      | Node                         |
| `propName*` | `string`                     |
| `returns`   | ts.Expression \| `undefined` |

<!-- END-API-README -->
