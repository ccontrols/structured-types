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
    -   [PanelContainerProps](#panelcontainerprops)
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

**`react component`** _defined in [structured-types-site/src/components/Playground.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/Playground.tsx#L21)_

Top-level component that displays the editor, and the tabbed interface



## Editor

**`react component`** _defined in [structured-types-site/src/components/Editor.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/Editor.tsx#L10)_

Monaco editor component. Uses CodeContext for data repository.



<!-- END-API-README -->

# Panels

<api-readme extract="PanelContainer, ConfigPanel, ExamplesPanel, ParseConfigPanel" files="./src/components/panels/PanelContainer.tsx,./src/components/panels/ConfigPanel.tsx,./src/components/panels/ExamplesPanel.tsx,./src/components/panels/ParseConfigPanel.tsx"/>

<!-- START-API-README -->

## PanelContainer

**`react component`** _defined in [@types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)_



### **properties**

| Name       | Type       | Description |
| ---------- | ---------- | ----------- |
| `onClose*` | () => void |             |

## ConfigPanel

**`react component`** _defined in [@types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)_



### **properties**

| Name       | Type       | Description |
| ---------- | ---------- | ----------- |
| `onClose*` | () => void |             |

## ExamplesPanel

**`react component`** _defined in [@types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)_



### **properties**

| Name       | Type       | Description |
| ---------- | ---------- | ----------- |
| `onClose*` | () => void |             |

## ParseConfigPanel

**`react component`** _defined in [@types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)_



### **properties**

| Name       | Type       | Description |
| ---------- | ---------- | ----------- |
| `onClose*` | () => void |             |

## PanelContainerProps

**`interface`** _defined in [structured-types-site/src/components/panels/PanelContainer.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/panels/PanelContainer.tsx#L5)_



### **properties**

| Name       | Type       | Description |
| ---------- | ---------- | ----------- |
| `onClose*` | () => void |             |

<!-- END-API-README -->

# Viewers

<api-readme extract="LoadingIndicator,JSONViewer,DataViewer" files="./src/components/viewers/LoadingIndicator.tsx,./src/components/viewers/JSONViewer.tsx,./src/components/viewers/DataViewer.tsx" collectHelpers=false/>

<!-- START-API-README -->

## LoadingIndicator

**`react component`** _defined in [structured-types-site/src/components/viewers/LoadingIndicator.tsx](https://github.com/ccontrols/structured-types/tree/master/site/src/components/viewers/LoadingIndicator.tsx#L7)_

Display a 'loading..' flex box



## JSONViewer

**`react component`** _defined in [@types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)_



### **properties**

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Description |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `data*`             | any (Props)                                                                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| `theme`             | Props.Theme                                                                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| `invertTheme*`      | boolean (Props)                                                                                                                                                                                                                                                                                                                                                                                                                                                       |             |
| `keyPath*`          | string \| number\[]                                                                                                                                                                                                                                                                                                                                                                                                                                                   |             |
| `labelRenderer*`    | (`keyPath`\*: string \| number\[], `nodeType`\*: string, `expanded`\*: boolean, `expandable`\*: boolean) => { type: T, props: P, key: union } \| string \| number \| undefined \| { index } \| { key: union, children: ReactNode, type: T, props: P } \| boolean \| null \| undefined                                                                                                                                                                                 |             |
| `valueRenderer*`    | (`valueAsString`\*: any, `value`\*: any, `keyPath`\*: string \| number\[]) => { type: T, props: P, key: union } \| string \| number \| undefined \| { index } \| { key: union, children: ReactNode, type: T, props: P } \| boolean \| null \| undefined                                                                                                                                                                                                               |             |
| `shouldExpandNode*` | (`keyPath`\*: string \| number\[], `data`\*: any, `level`\*: number) => boolean                                                                                                                                                                                                                                                                                                                                                                                       |             |
| `hideRoot*`         | boolean (JSONNestedNodeCircularPropsPassedThroughJSONTree)                                                                                                                                                                                                                                                                                                                                                                                                            |             |
| `getItemString*`    | (`nodeType`\*: string, `data`\*: any, `itemType`\*: { type: T, props: P, key: union } \| string \| number \| undefined \| { index } \| { key: union, children: ReactNode, type: T, props: P } \| boolean \| null \| undefined, `itemString`\*: string, `keyPath`\*: string \| number\[]) => { type: T, props: P, key: union } \| string \| number \| undefined \| { index } \| { key: union, children: ReactNode, type: T, props: P } \| boolean \| null \| undefined |             |
| `postprocessValue*` | (`value`\*: any) => any                                                                                                                                                                                                                                                                                                                                                                                                                                               |             |
| `isCustomNode*`     | (`value`\*: any) => boolean                                                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| `collectionLimit*`  | number (JSONNestedNodeCircularPropsPassedThroughJSONTree)                                                                                                                                                                                                                                                                                                                                                                                                             |             |
| `sortObjectKeys`    | (`a`\*: any, `b`\*: any) => number \| boolean                                                                                                                                                                                                                                                                                                                                                                                                                         |             |

## DataViewer

**`react component`** _defined in [@types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)_



### **properties**

| Name        | Type                                                                                                                                                                                                                                                                                                             | Description |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `jsonTree*` | { data: any, theme: Theme, invertTheme: boolean, keyPath: array, labelRenderer: function, valueRenderer: function, shouldExpandNode: function, hideRoot: boolean, getItemString: function, postprocessValue: function, isCustomNode: function, collectionLimit: number, sortObjectKeys: union, children: union } |             |
| `label*`    | DataViewerProps.ParserNames                                                                                                                                                                                                                                                                                      |             |
| `link*`     | string (DataViewerProps)                                                                                                                                                                                                                                                                                         |             |

<!-- END-API-README -->
