# Table of contents

-   [API](#api)
    -   [STRING_CONST](#string_const)
    -   [Fn](#fn)
    -   [getDefaultStore](#getdefaultstore)
    -   [anonParamFn](#anonparamfn)
    -   [FileType](#filetype)
    -   [defFileType](#deffiletype)
    -   [ConfigNoTypeArr](#confignotypearr)
    -   [MyComponent](#mycomponent)
    -   [Kind](#kind)
    -   [IndexedProps](#indexedprops)

# API

<api-readme files="./component.tsx"/>

<!-- START-API-README -->

## STRING_CONST

**`string` = "my string"**

a string global constant

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L7)_

## Fn

**`react component`**

Function without parameters

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L13)_

## getDefaultStore

**`function`**

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L25)_

**parameters**

| Name      | Type                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `returns` | <details><summary>`Store`</summary><blockquote><details><summary>`components`\*</summary><blockquote>`name`: `string`</blockquote></details></blockquote></details> |

## anonParamFn

**`react component`**

anonymous parameter

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L30)_

**properties**

| Name          | Type                                                                                  | Parent  |
| ------------- | ------------------------------------------------------------------------------------- | ------- |
| `components*` | <details><summary>`type`</summary><blockquote>`name`: `string`</blockquote></details> | `Store` |

## FileType

**`union`**

Exported union type

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L36)_

**values**

`"file"` \| `"folder"` \| `"unknown"`

## defFileType

**`union` = "file"**

Exported union type

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L38)_

**values**

`"file"` \| `"folder"` \| `"unknown"`

## ConfigNoTypeArr

**`interface`**

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L53)_

**properties**

| Name   | Type                                                   |
| ------ | ------------------------------------------------------ |
| `key*` | \[`string`]: (`Omit`&lt;`TConfig`, `"kind"`>)\[]<br /> |

## MyComponent

**`react component`**

MyComponent special component

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L111)_

**properties**

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                              | Parent     | Default  | Description            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------- |
| `record`      | `Record`&lt;`string`, `TConfig`>                                                                                                                                                                                                                                                                                                                                                                                                  | `OwnProps` |          | Record prop            |
| `el`          | `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`                                                                                                                                                                                                                                                                                                                                            | `OwnProps` |          | external type          |
| `stringProp`  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                          | `OwnProps` | `"test"` | stringProp description |
| `numberProp*` | `number`                                                                                                                                                                                                                                                                                                                                                                                                                          | `OwnProps` | `4`      | numberProp description |
| `config*`     | <details><summary>`TConfig`</summary><blockquote>`system`\*: `boolean`<br /><details><summary>`compiler`\*</summary><blockquote>\[`string`]: `CompilerOptionsValue` \| `TsConfigSourceFile` \| `undefined`</blockquote></details>`kind`\*: [`Kind`](#kind)</blockquote></details>                                                                                                                                                 | `OwnProps` |          | linked type            |
| `objectProp*` | <details><summary>`type`</summary><blockquote>`name`\*: `string`<br />`sex`\*: `"male"` \| `"female"`<br /><details><summary>`c`\*</summary><blockquote>`system`\*: <br />`compiler`\*: <br />`kind`\*: </blockquote></details></blockquote></details>                                                                                                                                                                            | `OwnProps` |          | objectProp description |
| `fnProp*`     | **function** (<br /><details><summary>`p`\*</summary><blockquote><details><summary>`config`\*</summary><blockquote>`system`\*: <br />`compiler`\*: <br />`kind`\*: </blockquote></details></blockquote></details>`b`\*: `boolean`<br />`a`\*: `boolean`<br />) => <details><summary>`type`</summary><blockquote><details><summary>`state`\*</summary><blockquote>`name`\*: `string`</blockquote></details></blockquote></details> | `OwnProps` |          | function property      |
| `fnType*`     | **function** (<br />`kind`\*: [`Kind`](#kind)<br />) => `string`                                                                                                                                                                                                                                                                                                                                                                  | `OwnProps` |          | linked function        |
| `arrProp*`    | \[`string`, `number`]                                                                                                                                                                                                                                                                                                                                                                                                             | `OwnProps` |          | array property         |
| `arrType*`    | `TConfig`\[]                                                                                                                                                                                                                                                                                                                                                                                                                      | `OwnProps` |          |                        |

## Kind

**`enum`**

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L119)_

**properties**

| Name        | Type     | Value |
| ----------- | -------- | ----- |
| `Table*`    | `number` | `1`   |
| `TableRow*` | `number` | `2`   |

## IndexedProps

**`type`**

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L128)_

**properties**

| Name     | Type                                                                                                                                                                                                                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index*` | \[`string`]: <details><summary>`TConfig`</summary><blockquote>`system`\*: `boolean`<br /><details><summary>`compiler`\*</summary><blockquote>\[`string`]: `CompilerOptionsValue` \| `TsConfigSourceFile` \| `undefined`</blockquote></details>`kind`\*: [`Kind`](#kind)</blockquote></details><br /> |

<!-- END-API-README -->
