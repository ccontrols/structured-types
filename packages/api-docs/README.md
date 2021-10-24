# Table of contents

-   [Overview](#overview)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
    -   [propsToDocumentation](#propstodocumentation)
    -   [apiDocsConfig](#apidocsconfig)
    -   [getRepoPath](#getrepopath)
    -   [NodeKind](#nodekind)
    -   [DocumentationNodeWithChildren](#documentationnodewithchildren)
    -   [DocumentationNodeWithValue](#documentationnodewithvalue)
    -   [TableNode](#tablenode)
    -   [TableRowNode](#tablerownode)
    -   [TableCellNode](#tablecellnode)
    -   [HeadingNode](#headingnode)
    -   [ParagraphNode](#paragraphnode)
    -   [TextNode](#textnode)
    -   [BoldNode](#boldnode)
    -   [EmphasisNode](#emphasisnode)
    -   [LinkNode](#linknode)
    -   [CodeNode](#codenode)
    -   [InlineCodeNode](#inlinecodenode)
    -   [DocumentationOptions](#documentationoptions)
-   [Configuration](#configuration)
    -   -   [Configuration examples](#configuration-examples)
        -   [Override properties](#override-properties)

# Overview

Create abstract api documentation nodes using props parsed from `structured-types/api`. Can be used to generate markdown or html documentation pages.

# Installation

```sh
yarn add @structured-types/api-readme --dev
```

# Usage

You can launch directly from the command-line ie `yarn run api-readme` or from your `package.json` file by adding a script to launch the command line documentation tool.

```ts
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import {
  propsToDocumentation,
  DocumentationOptions,
} from '@structured-types/api-docs';

export const extractProps = (
  files: string[],
  config?: DocsOptions & DocumentationOptions,
): ReturnType<typeof propsToDocumentation> => {
  /**
   * parse props using @structured-types/api
   */
  const props = parseFiles(files, {
    collectFilePath: true,
    collectHelpers: true,
    collectLinesOfCode: true,
    // use react typescript and react prop-types extensions
    plugins: [propTypesPlugin, reactPlugin],
    ...config,
  });
  return propsToDocumentation(props, config);
};
```

# API

<api-readme />

<!-- START-API-README -->

## propsToDocumentation

**`function`** _defined in [@structured-types/api-docs/packages/api-docs/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/index.ts#L16)_

Creates a list of api documentation nodes

**parameters**

| Name      | Type                                                         | Description                                     |
| --------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `props*`  | { `index`, `__helpers`: `Record`, `__diagnostics`: `array` } | properties parsed from  `structured-types/api`  |
| `options` | [`DocumentationOptions`](#documentationoptions)              | Document page generation options                |
| `returns` | { `kind`: [`NodeKind`](#nodekind) }\[]                       | a list of documentation nodes                   |

## apiDocsConfig

**`function`** _defined in [@structured-types/api-docs/packages/api-docs/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/index.ts#L30)_

Read the api-docs configuration file

**parameters**

| Name             | Type              | Description                                                                                          |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `fileName*`      | `string`          | the file that is being analyzed, will be used the starting folder to search for configuration files. |
| `configFileName` | `string`          | pass directly the configuration file name                                                            |
| `returns`        | CosmiconfigResult | page generation options from the config file                                                         |

## getRepoPath

**`function`** _defined in [@structured-types/api-docs/packages/api-docs/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/index.ts#L42)_

**parameters**

| Name        | Type                                                                    | Description                                      |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| `filePath*` | `string`                                                                | file path to start the search for a package.json |
| `returns`   | { `repo`: `string`, `packageName`: `string`, `relativePath`: `string` } |                                                  |

## NodeKind

**`enum`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L6)_

Documentation node kinds

**properties**

| Name          | Type     | Value |
| ------------- | -------- | ----- |
| `Table*`      | `number` | `1`   |
| `TableRow*`   | `number` | `2`   |
| `TableCell*`  | `number` | `3`   |
| `Heading*`    | `number` | `4`   |
| `Paragraph*`  | `number` | `5`   |
| `Text*`       | `number` | `6`   |
| `Bold*`       | `number` | `7`   |
| `Emphasis*`   | `number` | `8`   |
| `Link*`       | `number` | `9`   |
| `Code*`       | `number` | `10`  |
| `InlineCode*` | `number` | `11`  |

## DocumentationNodeWithChildren

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L31)_

Documentation node with children

extends DocumentationNode

**properties**

| Name       | Type                                        | Description              |
| ---------- | ------------------------------------------- | ------------------------ |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[]      |                          |
| `kind*`    | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 | Documentation node kinds |

## DocumentationNodeWithValue

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L56)_

Documentation node with a value

extends DocumentationNode

**properties**

| Name     | Type                                        | Description              |
| -------- | ------------------------------------------- | ------------------------ |
| `value*` | `string`                                    |                          |
| `kind*`  | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 | Documentation node kinds |

## TableNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L76)_

Table node, where the first row is a table header row

extends DocumentationNode

**properties**

| Name        | Type                               | Parent                  | Value |
| ----------- | ---------------------------------- | ----------------------- | ----- |
| `kind*`     | [`NodeKind`](#nodekind).Table      | [`NodeKind`](#nodekind) | `1`   |
| `children*` | [`TableRowNode`](#tablerownode)\[] |                         | ``    |

## TableRowNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L92)_

Table row node - can be a header or data row

extends DocumentationNode

**properties**

| Name        | Type                                 | Parent                  | Value |
| ----------- | ------------------------------------ | ----------------------- | ----- |
| `kind*`     | [`NodeKind`](#nodekind).TableRow     | [`NodeKind`](#nodekind) | `2`   |
| `children*` | [`TableCellNode`](#tablecellnode)\[] |                         | ``    |

## TableCellNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L109)_

Table cell node, the content is a list of child nodes

extends [`DocumentationNodeWithChildren`](#documentationnodewithchildren)

**properties**

| Name       | Type                                   | Parent                                                            | Value |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ----- |
| `kind*`    | [`NodeKind`](#nodekind).TableCell      | [`NodeKind`](#nodekind)                                           | `3`   |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``    |

## HeadingNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L125)_

Heading node with a depth parameter, the content is a list of child nodes

extends [`DocumentationNodeWithChildren`](#documentationnodewithchildren)

**properties**

| Name       | Type                                   | Parent                                                            | Value |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ----- |
| `kind*`    | [`NodeKind`](#nodekind).Heading        | [`NodeKind`](#nodekind)                                           | `4`   |
| `depth*`   | `number`                               |                                                                   | ``    |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``    |

## ParagraphNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L141)_

Paragraph node, the content is a list of child nodes

extends [`DocumentationNodeWithChildren`](#documentationnodewithchildren)

**properties**

| Name       | Type                                   | Parent                                                            | Value |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ----- |
| `kind*`    | [`NodeKind`](#nodekind).Paragraph      | [`NodeKind`](#nodekind)                                           | `5`   |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``    |

## TextNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L157)_

Text node, the content string is in the value field

extends [`DocumentationNodeWithValue`](#documentationnodewithvalue)

**properties**

| Name     | Type                         | Parent                                                      | Value |
| -------- | ---------------------------- | ----------------------------------------------------------- | ----- |
| `kind*`  | [`NodeKind`](#nodekind).Text | [`NodeKind`](#nodekind)                                     | `6`   |
| `value*` | `string`                     | [`DocumentationNodeWithValue`](#documentationnodewithvalue) | ``    |

## BoldNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L171)_

Bold/Strong node, the content is a list of child nodes

extends [`DocumentationNodeWithChildren`](#documentationnodewithchildren)

**properties**

| Name       | Type                                   | Parent                                                            | Value |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ----- |
| `kind*`    | [`NodeKind`](#nodekind).Bold           | [`NodeKind`](#nodekind)                                           | `7`   |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``    |

## EmphasisNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L185)_

Emphasis/Italic node, the content is a list of child nodes

extends [`DocumentationNodeWithChildren`](#documentationnodewithchildren)

**properties**

| Name       | Type                                   | Parent                                                            | Value |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ----- |
| `kind*`    | [`NodeKind`](#nodekind).Emphasis       | [`NodeKind`](#nodekind)                                           | `8`   |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``    |

## LinkNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L202)_

Link node with url property, the content is a list of child nodes

extends [`DocumentationNodeWithChildren`](#documentationnodewithchildren)

**properties**

| Name       | Type                                   | Parent                                                            | Value |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ----- |
| `kind*`    | [`NodeKind`](#nodekind).Link           | [`NodeKind`](#nodekind)                                           | `9`   |
| `url`      | `string`                               |                                                                   | ``    |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``    |

## CodeNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L217)_

Code node, the content string is in the value field

extends [`DocumentationNodeWithValue`](#documentationnodewithvalue)

**properties**

| Name     | Type                         | Parent                                                      | Value |
| -------- | ---------------------------- | ----------------------------------------------------------- | ----- |
| `kind*`  | [`NodeKind`](#nodekind).Code | [`NodeKind`](#nodekind)                                     | `10`  |
| `value*` | `string`                     | [`DocumentationNodeWithValue`](#documentationnodewithvalue) | ``    |

## InlineCodeNode

**`interface`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L231)_

Inline code node, the content string is in the value field

extends [`DocumentationNodeWithValue`](#documentationnodewithvalue)

**properties**

| Name     | Type                               | Parent                                                      | Value |
| -------- | ---------------------------------- | ----------------------------------------------------------- | ----- |
| `kind*`  | [`NodeKind`](#nodekind).InlineCode | [`NodeKind`](#nodekind)                                     | `11`  |
| `value*` | `string`                           | [`DocumentationNodeWithValue`](#documentationnodewithvalue) | ``    |

## DocumentationOptions

**`type`** _defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L270)_

Document page generation options

**properties**

| Name            | Type                                                                        | Description                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collapsed`     | `string`\[]                                                                 | List of type names, that should not be expanded. For example, some internal React objects can be kept just as a string and will not be detailed in the documentation, instead of listing their internal properties.   |
| `extensions`    | `string`\[]                                                                 | List of plugins (or extensions). For example, for a react library, you can specify to include only react components, but not any additional types or utilities.                                                       |
| `visible`       | `string`\[]                                                                 | List of type names, that should be "visible". This will limit which of the parsed props to be documented.                                                                                                             |
| `columns`       | "name" \| "type" \| "parents" \| "value" \| "description" \| "all"\[]       | List of the columns in the property tables  `name`  \|  `type`  \|  `parents`  \|  `value`  \|  `description`  \|  `all` . By default, all columns will be visible.                                                   |
| `sections`      | "props" \| "description" \| "examples" \| "title" \| "location" \| "all"\[] | List of the sections to generate  `props`  \|  `description`  \|  `examples`  \|  `title`  \|  `location`  \|  `all` . By default, all sections are generated.                                                        |
| `skipInherited` | `boolean`                                                                   | Whether to skip properties that are "inherited", or "composed". For example,  `type OwnProps = { x: number } & React.LineProps`  will only output the  `x`  property and skip the inherited React library properties. |
| `overrides`     | `Record`&lt;`string`, `Record`>                                             | Sections with custom properties                                                                                                                                                                                       |

<!-- END-API-README -->

# Configuration

You can configure api-docs by passing a configuration object or with an [external file](#configuration-file).

api-docs uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for external configurations in a file. The configuration is loaded by precedence:

-   a `api-docs` key in your package.json file
-   a `.api-docsrc` file for JSON or YAML configuration
-   a `.api-docsrc.json`, `.api-docsrc.yaml`, `.api-docsrc.yml` file for JSON or YAML configuration
-   a `.api-docsrc.js`, `.api-docsrc.cjs`, `api-docs.config.js` or `api-docs.config.cjs` javascript file that exports a configuration object using `module.exports`.

### Configuration examples

Javascript:

    module.exports = {
      visible: ['LineChart'],
      sections: ['props'],
      collapsed: ['ViewProps'],
    };

JSON:

    {
      "visible": ["LineChart"],
      "sections": ["props"],
      "collapsed": ["ViewProps"],
      "overrides": {
        "LineChart": {
          "yGutter": {
            "value": 30
            "type": "(x, y) => x + y",
            "parent": null
          }
        }
      }
    }

YAML:

    visible:
      - LineChart
    sections:
      - props
    collapsed:
      - ViewProps
    overrides:
      LineChart:
        yGutter:
          value: 30

### Override properties

You can override specific properties in cases where the actual parsed properties are not "optimal" and you would like to change their display. The format to override a [property](https://github.com/ccontrols/structured-types/tree/master/packages/api#proptype) is

Pseudocode

```
overrides: {
  [parent name]: {
    [property name]: {
      [propname]: {
        xx: 10
      }
    }
  }
}

```

Javascript:

    module.exports = {
      visible: ['LineChart'],
      overrides: {
        LineChart: {
          yGutter: {
            value: 30,
            type: '(x, y) => x + y',
            parent: null,
          },
        },
      },
    };

JSON

    {
      "visible": ["LineChart"],
      "overrides": {
        "LineChart": {
          "yGutter": {
            "value": 30,
            "type": "(x, y) => x + y",
            "parent": null
          }
        }
      }
    };

YAML

    visible:
      - LineChart
    overrides:
      LineChart:
        yGutter:
          value: 30
          type: '(x, y) => x + y'
          parent: null
