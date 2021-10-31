# Table of contents

-   [Overview](#overview)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Configuration](#configuration)
    -   [Configuration examples](#configuration-examples)
    -   [Sections](#sections)
        -   [1. List configuration](#1-list-configuration)
        -   [2. Object configuration](#2-object-configuration)
    -   [Override properties](#override-properties)
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
    collectSourceInfo: true,
    collectHelpers: true,
    // use react typescript and react prop-types extensions
    plugins: [propTypesPlugin, reactPlugin],
    ...config,
  });
  return propsToDocumentation(props, config);
};
```

# Configuration

You can configure api-docs by passing a configuration object or with an [external file](#configuration-file).

api-docs uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for external configurations in a file. The configuration is loaded by precedence:

-   a `api-docs` key in your package.json file
-   a `.api-docsrc` file for JSON or YAML configuration
-   a `.api-docsrc.json`, `.api-docsrc.yaml`, `.api-docsrc.yml` file for JSON or YAML configuration
-   a `.api-docsrc.js`, `.api-docsrc.cjs`, `api-docs.config.js` or `api-docs.config.cjs` javascript file that exports a configuration object using `module.exports`.

## Configuration examples

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
        }

YAML:

        visible:
          - LineChart
        sections:
          - props
        collapsed:
          - ViewProps

## Sections

You can show/hide or provide custom configuration for the documentation sections.

![sections](https://github.com/ccontrols/structured-types/raw/master/packages/api-docs/sections.jpg)

### 1. List configuration

The simplest way to only display some sections is by listing them in a list of strings. All sections that are not in the list will be removed.

Javascript:

        module.exports = {
          sections: ['title', 'props'],
        };

JSON

        {
          "sections": ["title", "props"],
        };

YAML

         sections:
          - title
          - props

### 2. Object configuration

Providing an object configuration allows you to modify the title and other properties of the section. When using a javascript configuration file, you can also provide callback for custom section titles or content.

Javascript:

        module.exports = {
          sections: {
            title: {
              title: 'Component',
              render: (prop) => [
                {
                  kind: 5,
                  children: [{ kind: 6, value: `The Name is: ${prop.name}` }],
                },
              ],
            },
            props: {
              title: 'Props'
            },
            type: {
              hidden: true,
            },
            examples: {
              title: (prop) =>
                prop.examples && prop.examples.length > 1 ? 'Samples' : 'Sample',
            },
        };

JSON

        {
          "sections": {
            "props", {
              "title": "Props"
            },
             "type": {
              "hidden": true,
            },
          },
        };

YAML

        sections:
          title:
            title: 'Component'
          type:
            hidden: true
            title: 'Types'

## Override properties

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

# API

<api-readme />

<!-- START-API-README -->

## propsToDocumentation

**`function`**

Creates a list of api documentation nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/index.ts#L16)_

**properties**

| Name      | Type                                                         | Description                                     |
| --------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `props*`  | { `index`, `__helpers`: `Record`, `__diagnostics`: `array` } | properties parsed from  `structured-types/api`  |
| `options` | [`DocumentationOptions`](#documentationoptions)              | Document page generation options                |
| `returns` | { `kind`: [`NodeKind`](#nodekind) }\[]                       | a list of documentation nodes                   |

## apiDocsConfig

**`function`**

Read the api-docs configuration file

_defined in [@structured-types/api-docs/packages/api-docs/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/index.ts#L30)_

**properties**

| Name             | Type              | Description                                                                                          |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `fileName*`      | `string`          | the file that is being analyzed, will be used the starting folder to search for configuration files. |
| `configFileName` | `string`          | pass directly the configuration file name                                                            |
| `returns`        | CosmiconfigResult | page generation options from the config file                                                         |

## getRepoPath

**`function`**

_defined in [@structured-types/api-docs/packages/api-docs/src/index.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/index.ts#L42)_

**properties**

| Name        | Type                                                                    | Description                                      |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| `filePath*` | `string`                                                                | file path to start the search for a package.json |
| `returns`   | { `repo`: `string`, `packageName`: `string`, `relativePath`: `string` } |                                                  |

## NodeKind

**`enum`**

Documentation node kinds

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L6)_

**properties**

| Name          | Type     | Default |
| ------------- | -------- | ------- |
| `Table*`      | `number` | `1`     |
| `TableRow*`   | `number` | `2`     |
| `TableCell*`  | `number` | `3`     |
| `Heading*`    | `number` | `4`     |
| `Paragraph*`  | `number` | `5`     |
| `Text*`       | `number` | `6`     |
| `Bold*`       | `number` | `7`     |
| `Emphasis*`   | `number` | `8`     |
| `Link*`       | `number` | `9`     |
| `Code*`       | `number` | `10`    |
| `InlineCode*` | `number` | `11`    |

## DocumentationNodeWithChildren

**`interface`**

Documentation node with children

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L30)_

**properties**

| Name       | Type                                        | Description              |
| ---------- | ------------------------------------------- | ------------------------ |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[]      |                          |
| `kind*`    | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 | Documentation node kinds |

## DocumentationNodeWithValue

**`interface`**

Documentation node with a value

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L55)_

**properties**

| Name     | Type                                        | Description              |
| -------- | ------------------------------------------- | ------------------------ |
| `value*` | `string`                                    |                          |
| `kind*`  | 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 | Documentation node kinds |

## TableNode

**`interface`**

Table node, where the first row is a table header row

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L75)_

**properties**

| Name        | Type                               | Parent                  | Default |
| ----------- | ---------------------------------- | ----------------------- | ------- |
| `kind*`     | `Table`                            | [`NodeKind`](#nodekind) | `1`     |
| `children*` | [`TableRowNode`](#tablerownode)\[] |                         | ``      |

## TableRowNode

**`interface`**

Table row node - can be a header or data row

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L91)_

**properties**

| Name        | Type                                 | Parent                  | Default |
| ----------- | ------------------------------------ | ----------------------- | ------- |
| `kind*`     | `TableRow`                           | [`NodeKind`](#nodekind) | `2`     |
| `children*` | [`TableCellNode`](#tablecellnode)\[] |                         | ``      |

## TableCellNode

**`interface`**

Table cell node, the content is a list of child nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L108)_

**properties**

| Name       | Type                                   | Parent                                                            | Default |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ------- |
| `kind*`    | `TableCell`                            | [`NodeKind`](#nodekind)                                           | `3`     |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``      |

## HeadingNode

**`interface`**

Heading node with a depth parameter, the content is a list of child nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L124)_

**properties**

| Name       | Type                                   | Parent                                                            | Default |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ------- |
| `kind*`    | `Heading`                              | [`NodeKind`](#nodekind)                                           | `4`     |
| `depth*`   | `number`                               |                                                                   | ``      |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``      |

## ParagraphNode

**`interface`**

Paragraph node, the content is a list of child nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L140)_

**properties**

| Name       | Type                                   | Parent                                                            | Default |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ------- |
| `kind*`    | `Paragraph`                            | [`NodeKind`](#nodekind)                                           | `5`     |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``      |

## TextNode

**`interface`**

Text node, the content string is in the value field

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L156)_

**properties**

| Name     | Type     | Parent                                                      | Default |
| -------- | -------- | ----------------------------------------------------------- | ------- |
| `kind*`  | `Text`   | [`NodeKind`](#nodekind)                                     | `6`     |
| `value*` | `string` | [`DocumentationNodeWithValue`](#documentationnodewithvalue) | ``      |

## BoldNode

**`interface`**

Bold/Strong node, the content is a list of child nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L170)_

**properties**

| Name       | Type                                   | Parent                                                            | Default |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ------- |
| `kind*`    | `Bold`                                 | [`NodeKind`](#nodekind)                                           | `7`     |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``      |

## EmphasisNode

**`interface`**

Emphasis/Italic node, the content is a list of child nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L184)_

**properties**

| Name       | Type                                   | Parent                                                            | Default |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ------- |
| `kind*`    | `Emphasis`                             | [`NodeKind`](#nodekind)                                           | `8`     |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[] | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``      |

## LinkNode

**`interface`**

Link node with url property, the content is a list of child nodes

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L201)_

**properties**

| Name       | Type                                    | Parent                                                            | Default |
| ---------- | --------------------------------------- | ----------------------------------------------------------------- | ------- |
| `kind*`    | `Link`                                  | [`NodeKind`](#nodekind)                                           | `9`     |
| `url`      | `string`                                |                                                                   | ``      |
| `loc`      | { `filePath`: `string`, `loc`: `type` } |                                                                   | ``      |
| `children` | { `kind`: [`NodeKind`](#nodekind) }\[]  | [`DocumentationNodeWithChildren`](#documentationnodewithchildren) | ``      |

## CodeNode

**`interface`**

Code node, the content string is in the value field

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L217)_

**properties**

| Name     | Type     | Parent                                                      | Default |
| -------- | -------- | ----------------------------------------------------------- | ------- |
| `kind*`  | `Code`   | [`NodeKind`](#nodekind)                                     | `10`    |
| `value*` | `string` | [`DocumentationNodeWithValue`](#documentationnodewithvalue) | ``      |

## InlineCodeNode

**`interface`**

Inline code node, the content string is in the value field

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L231)_

**properties**

| Name     | Type         | Parent                                                      | Default |
| -------- | ------------ | ----------------------------------------------------------- | ------- |
| `kind*`  | `InlineCode` | [`NodeKind`](#nodekind)                                     | `11`    |
| `value*` | `string`     | [`DocumentationNodeWithValue`](#documentationnodewithvalue) | ``      |

## DocumentationOptions

**`type`**

Document page generation options

_defined in [@structured-types/api-docs/packages/api-docs/src/types.ts](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/src/types.ts#L286)_

**properties**

| Name            | Type                                                                                                                | Description                                                                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collapsed`     | `string`\[]                                                                                                         | List of type names, that should not be expanded. For example, some internal React objects can be kept just as a string and will not be detailed in the documentation, instead of listing their internal properties.   |
| `extensions`    | `string`\[]                                                                                                         | List of plugins (or extensions). For example, for a react library, you can specify to include only react components, but not any additional types or utilities.                                                       |
| `visible`       | `string`\[]                                                                                                         | List of type names, that should be "visible". This will limit which of the parsed props to be documented.                                                                                                             |
| `columns`       | "name" \| "type" \| "parents" \| "default" \| "description" \| "all"\[]                                             | List of the columns in the property tables  `name`  \|  `type`  \|  `parents`  \|  `value`  \|  `description`  \|  `all` . By default, all columns will be visible.                                                   |
| `sections`      | "title" \| "type" \| "extends" \| "description" \| "location" \| "props" \| "examples"\[] \| `Partial`&lt;`Record`> | List of the  `sections`  to generate  `props`  \|  `description`  \|  `examples`  \|  `title`  \|  `location`  \|  `all` . By default, all sections are generated.                                                    |
| `skipInherited` | `boolean`                                                                                                           | Whether to skip properties that are "inherited", or "composed". For example,  `type OwnProps = { x: number } & React.LineProps`  will only output the  `x`  property and skip the inherited React library properties. |
| `overrides`     | `Record`&lt;`string`, `Record`>                                                                                     | Sections with custom properties                                                                                                                                                                                       |

<!-- END-API-README -->
