# Table of contents

-   [API](#api)
    -   [MyComponent](#mycomponent)
    -   [OwnProps](#ownprops)
    -   [TConfig](#tconfig)

# API

<api-readme files="./component.tsx"/>

<!-- START-API-README -->

## MyComponent

**`react component`**

MyComponent special component

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L46)_

**properties**

| Name          | Type                                                                                                                                                                                                                                                                        | Parent                  | Default  | Description            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ---------------------- |
| `stringProp`  | `string`<br />                                                                                                                                                                                                                                                              | [`OwnProps`](#ownprops) | `"test"` | stringProp description |
| `numberProp*` | `number`<br />                                                                                                                                                                                                                                                              | [`OwnProps`](#ownprops) | `4`      | numberProp description |
| `objectProp*` | <details><summary>...3 properties</summary><blockquote>`name`: `string`<br />`sex`: "male"<br /> \| "female"<br /><br />[`TConfig`](#tconfig)</blockquote></details>                                                                                                        | [`OwnProps`](#ownprops) |          | objectProp description |
| `fnProp*`     | (<details><summary>`p`\*: </summary><blockquote>[`TConfig`](#tconfig)</blockquote></details>) => <details><summary>returns</summary><blockquote><details><summary>`state`: </summary><blockquote>`name`: `string`<br /></blockquote></details></blockquote></details><br /> | [`OwnProps`](#ownprops) |          | function property      |
| `arrProp*`    | \[`string`<br />, `number`<br />]<br />                                                                                                                                                                                                                                     | [`OwnProps`](#ownprops) |          | array property         |

## OwnProps

**`type`**

MyComponent properties.

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L16)_

**properties**

| Name          | Type                                                                                                                                                                                                                                                                        | Default | Description            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------- |
| `stringProp`  | `string`<br />                                                                                                                                                                                                                                                              |         | stringProp description |
| `numberProp*` | `number`<br />                                                                                                                                                                                                                                                              | `4`     | numberProp description |
| `objectProp*` | <details><summary>...3 properties</summary><blockquote>`name`: `string`<br />`sex`: "male"<br /> \| "female"<br /><br />[`TConfig`](#tconfig)</blockquote></details>                                                                                                        |         | objectProp description |
| `fnProp*`     | (<details><summary>`p`\*: </summary><blockquote>[`TConfig`](#tconfig)</blockquote></details>) => <details><summary>returns</summary><blockquote><details><summary>`state`: </summary><blockquote>`name`: `string`<br /></blockquote></details></blockquote></details><br /> |         | function property      |
| `arrProp*`    | \[`string`<br />, `number`<br />]<br />                                                                                                                                                                                                                                     |         | array property         |

## TConfig

**`type`**

configuration object

_defined in [@structured-types/api-readme/packages/api-readme/test/component.tsx](https://github.com/ccontrols/structured-types/tree/master/packages/api-readme/test/component.tsx#L6)_

**properties**

| Name      | Type            | Default | Description                    |
| --------- | --------------- | ------- | ------------------------------ |
| `system*` | `boolean`<br /> | `true`  | is this a system configuration |

<!-- END-API-README -->
