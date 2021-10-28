# Table of contents

-   [Overview](#overview)
-   [Components](#components)
    -   [Playground](#playground)
        -   [`react component`](#react-component)
    -   [Editor](#editor)
        -   [`react component`](#react-component-1)
-   [Panels](#panels)
    -   [PanelContainer](#panelcontainer)
        -   [`react component`](#react-component-2)
    -   [ConfigPanel](#configpanel)
        -   [`react component`](#react-component-3)
    -   [ExamplesPanel](#examplespanel)
        -   [`react component`](#react-component-4)
    -   [ParseConfigPanel](#parseconfigpanel)
        -   [`react component`](#react-component-5)
-   [Viewers](#viewers)
    -   [LoadingIndicator](#loadingindicator)
        -   [`react component`](#react-component-6)
    -   [JSONViewer](#jsonviewer)
        -   [`react component`](#react-component-7)
    -   [DataViewer](#dataviewer)
        -   [`react component`](#react-component-8)

# Overview

Playground site for structured-types

# Components

<api-readme files="./src/components/Playground.tsx,./src/components/Editor.tsx"/>

<!-- START-API-README -->

## Playground

### `react component`

_defined in [structured-types-site/site/src/components/Playground.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/Playground.tsx#L21)_

Top-level component that displays the editor, and the tabbed interface

## Editor

### `react component`

_defined in [structured-types-site/site/src/components/Editor.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/Editor.tsx#L11)_

Monaco editor component. Uses CodeContext for data repository.

<!-- END-API-README -->

# Panels

<api-readme visible="PanelContainer, ConfigPanel, ExamplesPanel, ParseConfigPanel" files="./src/components/panels/PanelContainer.tsx,./src/components/panels/ConfigPanel.tsx,./src/components/panels/ExamplesPanel.tsx,./src/components/panels/ParseConfigPanel.tsx"/>

<!-- START-API-README -->

## PanelContainer

### `react component`

_defined in [structured-types-site/site/src/components/panels/PanelContainer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/PanelContainer.tsx#L8)_

**properties**| Name       | Type         | Parent                |
| ---------- | ------------ | --------------------- |
| `onClose*` | () => `void` | `PanelContainerProps` |

## ConfigPanel

### `react component`

_defined in [structured-types-site/site/src/components/panels/ConfigPanel.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/ConfigPanel.tsx#L13)_

**properties**| Name       | Type         | Parent                |
| ---------- | ------------ | --------------------- |
| `onClose*` | () => `void` | `PanelContainerProps` |

## ExamplesPanel

### `react component`

_defined in [structured-types-site/site/src/components/panels/ExamplesPanel.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/ExamplesPanel.tsx#L13)_

**properties**| Name       | Type         | Parent                |
| ---------- | ------------ | --------------------- |
| `onClose*` | () => `void` | `PanelContainerProps` |

## ParseConfigPanel

### `react component`

_defined in [structured-types-site/site/src/components/panels/ParseConfigPanel.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/ParseConfigPanel.tsx#L12)_

**properties**| Name       | Type         | Parent                |
| ---------- | ------------ | --------------------- |
| `onClose*` | () => `void` | `PanelContainerProps` |

<!-- END-API-README -->

# Viewers

<api-readme visible="LoadingIndicator,JSONViewer,DataViewer" files="./src/components/viewers/LoadingIndicator.tsx,./src/components/viewers/JSONViewer.tsx,./src/components/viewers/DataViewer.tsx" collectHelpers=false/>

<!-- START-API-README -->

## LoadingIndicator

### `react component`

_defined in [structured-types-site/site/src/components/viewers/LoadingIndicator.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/LoadingIndicator.tsx#L7)_

Display a 'loading..' flex box

## JSONViewer

### `react component`

_defined in [structured-types-site/site/src/components/viewers/JSONViewer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/JSONViewer.tsx#L6)_

**properties**| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Parent                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `data*`             | `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `Props`                                            |
| `theme`             | `string` \| { `scheme`: `string`, `author`: `string`, `base00`: `string`, `base01`: `string`, `base02`: `string`, `base03`: `string`, `base04`: `string`, `base05`: `string`, `base06`: `string`, `base07`: `string`, `base08`: `string`, `base09`: `string`, `base0A`: `string`, `base0B`: `string`, `base0C`: `string`, `base0D`: `string`, `base0E`: `string`, `base0F`: `string` } \| { `index`, `extend`: `union` }                                                                                                                      | `Props`                                            |
| `invertTheme*`      | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `Props`                                            |
| `keyPath*`          | `string` \| `number`\[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `SharedCircularPropsPassedThroughJSONTree`         |
| `labelRenderer*`    | (`keyPath`\*: `string` \| `number`\[], `nodeType`\*: `string`, `expanded`\*: `boolean`, `expandable`\*: `boolean`) => { `type`: `T`, `props`: `P`, `key`: `union` } \| `string` \| `number` \|  \| { `index` } \| { `key`: `union`, `children`: `ReactNode`, `type`: `T`, `props`: `P` } \| `boolean` \| `null` \| `undefined`                                                                                                                                                                                                                | `SharedCircularPropsPassedThroughJSONTree`         |
| `valueRenderer*`    | (`valueAsString`\*: `any`, `value`\*: `any`, `keyPath`\*: `string` \| `number`\[]) => { `type`: `T`, `props`: `P`, `key`: `union` } \| `string` \| `number` \|  \| { `index` } \| { `key`: `union`, `children`: `ReactNode`, `type`: `T`, `props`: `P` } \| `boolean` \| `null` \| `undefined`                                                                                                                                                                                                                                                | `JSONValueNodeCircularPropsPassedThroughJSONTree`  |
| `shouldExpandNode*` | (`keyPath`\*: `string` \| `number`\[], `data`\*: `any`, `level`\*: `number`) => `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `hideRoot*`         | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `getItemString*`    | (`nodeType`\*: `string`, `data`\*: `any`, `itemType`\*: { `type`: `T`, `props`: `P`, `key`: `union` } \| `string` \| `number` \|  \| { `index` } \| { `key`: `union`, `children`: `ReactNode`, `type`: `T`, `props`: `P` } \| `boolean` \| `null` \| `undefined`, `itemString`\*: `string`, `keyPath`\*: `string` \| `number`\[]) => { `type`: `T`, `props`: `P`, `key`: `union` } \| `string` \| `number` \|  \| { `index` } \| { `key`: `union`, `children`: `ReactNode`, `type`: `T`, `props`: `P` } \| `boolean` \| `null` \| `undefined` | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `postprocessValue*` | (`value`\*: `any`) => `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `isCustomNode*`     | (`value`\*: `any`) => `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `collectionLimit*`  | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |
| `sortObjectKeys`    | (`a`\*: `any`, `b`\*: `any`) => `number` \| `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `JSONNestedNodeCircularPropsPassedThroughJSONTree` |

## DataViewer

### `react component`

_defined in [structured-types-site/site/src/components/viewers/DataViewer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/DataViewer.tsx#L15)_

**properties**| Name        | Type                                                                                                                                                                                                                                                                                                                                                                     | Parent            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `jsonTree*` | { `data`: `any`, `theme`: `Theme`, `invertTheme`: `boolean`, `keyPath`: `array`, `labelRenderer`: `function`, `valueRenderer`: `function`, `shouldExpandNode`: `function`, `hideRoot`: `boolean`, `getItemString`: `function`, `postprocessValue`: `function`, `isCustomNode`: `function`, `collectionLimit`: `number`, `sortObjectKeys`: `union`, `children`: `union` } | `DataViewerProps` |
| `label*`    | "structured-types" \| "react-docgen-typescript" \| "react-docgen" \| "jsdoc" \| "typedoc" \| "ts-json-schema-generator" \| "documentation"                                                                                                                                                                                                                               | `DataViewerProps` |
| `link*`     | `string`                                                                                                                                                                                                                                                                                                                                                                 | `DataViewerProps` |

<!-- END-API-README -->
