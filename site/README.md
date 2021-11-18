# Table of contents

-   [Overview](#overview)
-   [Components](#components)
    -   [Playground](#playground)
    -   [Editor](#editor)
-   [Panels](#panels)
    -   [PanelContainer](#panelcontainer)
    -   [ConfigPanel](#configpanel)
    -   [ExamplesPanel](#examplespanel)
    -   [ParseConfigPanel](#parseconfigpanel)
-   [Viewers](#viewers)
    -   [LoadingIndicator](#loadingindicator)
    -   [JSONViewer](#jsonviewer)
    -   [DataViewer](#dataviewer)

# Overview

Playground site for structured-types

# Components

<api-readme files="./src/components/Playground.tsx,./src/components/Editor.tsx"/>

<!-- START-API-README -->

## Playground

**`react component`**

Top-level component that displays the editor, and the tabbed interface

_defined in [structured-types-site/site/src/components/Playground.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/Playground.tsx#L21)_

## Editor

**`react component`**

Monaco editor component. Uses CodeContext for data repository.

_defined in [structured-types-site/site/src/components/Editor.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/Editor.tsx#L11)_

<!-- END-API-README -->

# Panels

<api-readme visible="PanelContainer, ConfigPanel, ExamplesPanel, ParseConfigPanel" files="./src/components/panels/PanelContainer.tsx,./src/components/panels/ConfigPanel.tsx,./src/components/panels/ExamplesPanel.tsx,./src/components/panels/ParseConfigPanel.tsx"/>

<!-- START-API-README -->

## PanelContainer

**`react component`**

_defined in [structured-types-site/site/src/components/panels/PanelContainer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/PanelContainer.tsx#L8)_

**properties**

| Name       | Type                            | Parent                |
| ---------- | ------------------------------- | --------------------- |
| `onClose*` | **function** (<br />) => `void` | `PanelContainerProps` |

## ConfigPanel

**`react component`**

_defined in [structured-types-site/site/src/components/panels/ConfigPanel.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/ConfigPanel.tsx#L13)_

**properties**

| Name       | Type                            | Parent                |
| ---------- | ------------------------------- | --------------------- |
| `onClose*` | **function** (<br />) => `void` | `PanelContainerProps` |

## ExamplesPanel

**`react component`**

_defined in [structured-types-site/site/src/components/panels/ExamplesPanel.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/ExamplesPanel.tsx#L13)_

**properties**

| Name       | Type                            | Parent                |
| ---------- | ------------------------------- | --------------------- |
| `onClose*` | **function** (<br />) => `void` | `PanelContainerProps` |

## ParseConfigPanel

**`react component`**

_defined in [structured-types-site/site/src/components/panels/ParseConfigPanel.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/ParseConfigPanel.tsx#L12)_

**properties**

| Name       | Type                            | Parent                |
| ---------- | ------------------------------- | --------------------- |
| `onClose*` | **function** (<br />) => `void` | `PanelContainerProps` |

<!-- END-API-README -->

# Viewers

<api-readme visible="LoadingIndicator,JSONViewer,DataViewer" files="./src/components/viewers/LoadingIndicator.tsx,./src/components/viewers/JSONViewer.tsx,./src/components/viewers/DataViewer.tsx" collectHelpers=false/>

<!-- START-API-README -->

## LoadingIndicator

**`react component`**

Display a 'loading..' flex box

_defined in [structured-types-site/site/src/components/viewers/LoadingIndicator.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/LoadingIndicator.tsx#L7)_

## JSONViewer

**`react component`**

_defined in [structured-types-site/site/src/components/viewers/JSONViewer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/JSONViewer.tsx#L6)_

**properties**

| Name                | Type                                                                                                                                                                                                                                                                                                                                  | Parent                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `data*`             | `any`                                                                                                                                                                                                                                                                                                                                 | `Props`                                            |
| `theme`             | `string` \| `Base16Theme` \| `StylingConfig`                                                                                                                                                                                                                                                                                          | `Props`                                            |
| `invertTheme*`      | `boolean`                                                                                                                                                                                                                                                                                                                             | `Props`                                            |
| `keyPath*`          | `union`\[]                                                                                                                                                                                                                                                                                                                            | `SharedCircularPropsPassedThroughJSONTree`         |
| `labelRenderer*`    | **function** (<br />`keyPath`\*: `union`\[]<br />`nodeType`\*: `string`<br />`expanded`\*: `boolean`<br />`expandable`\*: `boolean`<br />) => `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`                                                                                                  | `SharedCircularPropsPassedThroughJSONTree`         |
| `valueRenderer*`    | **function** (<br />`valueAsString`\*: `any`<br />`value`\*: `any`<br />`keyPath`\*: `union`\[]<br />) => `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`                                                                                                                                      | `JSONValueNodeCircularPropsPassedThroughJSONTree`  |
| `shouldExpandNode*` | **function** (<br />`keyPath`\*: `union`\[]<br />`data`\*: `any`<br />`level`\*: `number`<br />) => `boolean`                                                                                                                                                                                                                         | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `hideRoot*`         | `boolean`                                                                                                                                                                                                                                                                                                                             | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `getItemString*`    | **function** (<br />`nodeType`\*: `string`<br />`data`\*: `any`<br />`itemType`\*: `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`<br />`itemString`\*: `string`<br />`keyPath`\*: `union`\[]<br />) => `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined` | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `postprocessValue*` | **function** (<br />`value`\*: `any`<br />) => `any`                                                                                                                                                                                                                                                                                  | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `isCustomNode*`     | **function** (<br />`value`\*: `any`<br />) => `boolean`                                                                                                                                                                                                                                                                              | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `collectionLimit*`  | `number`                                                                                                                                                                                                                                                                                                                              | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `sortObjectKeys`    | `function` \| `boolean`                                                                                                                                                                                                                                                                                                               | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |

## DataViewer

**`react component`**

_defined in [structured-types-site/site/src/components/viewers/DataViewer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/DataViewer.tsx#L15)_

**properties**

| Name        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Parent            |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `jsonTree*` | <details><summary>`Partial`</summary><blockquote>`data`\*: `any`<br />`theme`: `string` \| `Base16Theme` \| `StylingConfig`<br />`invertTheme`\*: `boolean`<br />`keyPath`\*: `union`\[]<br />`labelRenderer`\*: **function** (<br />`keyPath`\*: `union`\[]<br />`nodeType`\*: `string`<br />`expanded`\*: `boolean`<br />`expandable`\*: `boolean`<br />) => `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`<br />`valueRenderer`\*: **function** (<br />`valueAsString`\*: `any`<br />`value`\*: `any`<br />`keyPath`\*: `union`\[]<br />) => `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`<br />`shouldExpandNode`\*: **function** (<br />`keyPath`\*: `union`\[]<br />`data`\*: `any`<br />`level`\*: `number`<br />) => `boolean`<br />`hideRoot`\*: `boolean`<br />`getItemString`\*: **function** (<br />`nodeType`\*: `string`<br />`data`\*: `any`<br />`itemType`\*: `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`<br />`itemString`\*: `string`<br />`keyPath`\*: `union`\[]<br />) => `ReactChild` \| `ReactFragment` \| `ReactPortal` \| `boolean` \| `null` \| `undefined`<br />`postprocessValue`\*: **function** (<br />`value`\*: `any`<br />) => `any`<br />`isCustomNode`\*: **function** (<br />`value`\*: `any`<br />) => `boolean`<br />`collectionLimit`\*: `number`<br />`sortObjectKeys`: `function` \| `boolean`<br />`children`: `ReactNode` \| `undefined`</blockquote></details> | `DataViewerProps` |
| `label*`    | `"structured-types"` \| `"react-docgen-typescript"` \| `"react-docgen"` \| `"jsdoc"` \| `"typedoc"` \| `"ts-json-schema-generator"` \| `"documentation"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `DataViewerProps` |
| `link*`     | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `DataViewerProps` |

<!-- END-API-README -->
