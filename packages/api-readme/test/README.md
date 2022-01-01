# Table of contents

-   [API](#api)
    -   [STRING_CONST](#string_const)
    -   [MyComponent](#mycomponent)
    -   [Kind](#kind)
    -   [IndexedProps](#indexedprops)
    -   [OwnProps](#ownprops)
    -   [TConfig](#tconfig)
    -   [ReactPortal](#reactportal)
    -   [ReactElement](#reactelement)

# API

<api-readme files="./component.tsx"/>

<!-- START-API-README -->

## STRING_CONST

**`string` = "my string"**

a string global constant

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L7)_

## MyComponent

**`react component`**

MyComponent special component

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L77)_

**properties**

| Name          | Type                                                                                                                                                                                                                                                                                                                                      | Parent                  | Default  | Description            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ---------------------- |
| `record`      | `Record`&lt;`string`, [`TConfig`](#tconfig)>                                                                                                                                                                                                                                                                                              | [`OwnProps`](#ownprops) |          | Record prop            |
| `el`          | `ReactChild` \| `ReactFragment` \| [`ReactPortal`](#reactportal) \| `boolean` \| `null` \| `undefined`                                                                                                                                                                                                                                    | [`OwnProps`](#ownprops) |          | external type          |
| `stringProp`  | `string`                                                                                                                                                                                                                                                                                                                                  | [`OwnProps`](#ownprops) | `"test"` | stringProp description |
| `numberProp*` | `number`                                                                                                                                                                                                                                                                                                                                  | [`OwnProps`](#ownprops) | `4`      | numberProp description |
| `config*`     | [`TConfig`](#tconfig)                                                                                                                                                                                                                                                                                                                     | [`OwnProps`](#ownprops) |          | linked type            |
| `objectProp*` | <details><summary>`type`</summary><blockquote>`name`\*: `string`<br />`sex`\*: `"male"` \| `"female"`<br />`c`\*: [`TConfig`](#tconfig)</blockquote></details>                                                                                                                                                                            | [`OwnProps`](#ownprops) |          | objectProp description |
| `fnProp*`     | **function** (<br /><details><summary>`p`\*</summary><blockquote>`config`\*: [`TConfig`](#tconfig)</blockquote></details>`b`\*: `boolean`<br />`a`\*: `boolean`<br />) => <details><summary>`type`</summary><blockquote><details><summary>`state`\*</summary><blockquote>`name`\*: `string`</blockquote></details></blockquote></details> | [`OwnProps`](#ownprops) |          | function property      |
| `fnType*`     | **function** (<br />`kind`\*: [`Kind`](#kind)<br />) => `string`                                                                                                                                                                                                                                                                          | [`OwnProps`](#ownprops) |          | linked function        |
| `arrProp*`    | \[`string`, `number`]                                                                                                                                                                                                                                                                                                                     | [`OwnProps`](#ownprops) |          | array property         |
| `arrType*`    | [`TConfig`](#tconfig)\[]                                                                                                                                                                                                                                                                                                                  | [`OwnProps`](#ownprops) |          |                        |

## Kind

**`enum`**

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L85)_

**properties**

| Name        | Type     | Value |
| ----------- | -------- | ----- |
| `Table*`    | `number` | `1`   |
| `TableRow*` | `number` | `2`   |

## IndexedProps

**`type`**

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L94)_

**properties**

| Name     | Type                                     |
| -------- | ---------------------------------------- |
| `index*` | \[`string`]: [`TConfig`](#tconfig)<br /> |

## OwnProps

**`type`**

MyComponent properties.

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L25)_

**properties**

| Name          | Type                                                                                                                                                                                                                                                                                                                                      | Default | Description            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------- |
| `record`      | `Record`&lt;`string`, [`TConfig`](#tconfig)>                                                                                                                                                                                                                                                                                              |         | Record prop            |
| `el`          | `ReactChild` \| `ReactFragment` \| [`ReactPortal`](#reactportal) \| `boolean` \| `null` \| `undefined`                                                                                                                                                                                                                                    |         | external type          |
| `stringProp`  | `string`                                                                                                                                                                                                                                                                                                                                  |         | stringProp description |
| `numberProp*` | `number`                                                                                                                                                                                                                                                                                                                                  | `4`     | numberProp description |
| `config*`     | [`TConfig`](#tconfig)                                                                                                                                                                                                                                                                                                                     |         | linked type            |
| `objectProp*` | <details><summary>`type`</summary><blockquote>`name`\*: `string`<br />`sex`\*: `"male"` \| `"female"`<br />`c`\*: [`TConfig`](#tconfig)</blockquote></details>                                                                                                                                                                            |         | objectProp description |
| `fnProp*`     | **function** (<br /><details><summary>`p`\*</summary><blockquote>`config`\*: [`TConfig`](#tconfig)</blockquote></details>`b`\*: `boolean`<br />`a`\*: `boolean`<br />) => <details><summary>`type`</summary><blockquote><details><summary>`state`\*</summary><blockquote>`name`\*: `string`</blockquote></details></blockquote></details> |         | function property      |
| `fnType*`     | **function** (<br />`kind`\*: [`Kind`](#kind)<br />) => `string`                                                                                                                                                                                                                                                                          |         | linked function        |
| `arrProp*`    | \[`string`, `number`]                                                                                                                                                                                                                                                                                                                     |         | array property         |
| `arrType*`    | [`TConfig`](#tconfig)\[]                                                                                                                                                                                                                                                                                                                  |         |                        |

## TConfig

**`type`**

configuration object

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L12)_

**properties**

| Name        | Type                                                                                                                                                       | Default | Description                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------ |
| `system*`   | `boolean`                                                                                                                                                  | `true`  | is this a system configuration |
| `compiler*` | <details><summary>`CompilerOptions`</summary><blockquote>\[`string`]: `CompilerOptionsValue` \| `TsConfigSourceFile` \| `undefined`</blockquote></details> |         |                                |
| `kind*`     | [`Kind`](#kind)                                                                                                                                            |         |                                |

## ReactPortal

**`interface`**

_defined in [@types/react/types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react/index.d.ts)_

**extends**

[`ReactElement`](#reactelement)

**properties**

| Name        | Type                                                                                                   | Parent                          |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `key*`      | `Key` \| `null`                                                                                        |                                 |
| `children*` | `ReactChild` \| `ReactFragment` \| [`ReactPortal`](#reactportal) \| `boolean` \| `null` \| `undefined` |                                 |
| `type*`     | `T`                                                                                                    | [`ReactElement`](#reactelement) |
| `props*`    | `P`                                                                                                    | [`ReactElement`](#reactelement) |

## ReactElement

**`interface`**

_defined in [@types/react/types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react/index.d.ts)_

**properties**

| Name     | Type            |
| -------- | --------------- |
| `type*`  | `T`             |
| `props*` | `P`             |
| `key*`   | `Key` \| `null` |

<!-- END-API-README -->
