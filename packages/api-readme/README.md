# Table of contents

- [Overview](#overview)
- [Installation](#installation)
- [Markdown](#markdown)
  - [API docs section](#api-docs-section)
  - [Table of contents](#table-of-contents-1)
- [Configuration](#configuration)
  - [Inline configuration](#inline-configuration)
  - [Configuration file](#configuration-file)
    - [Multiple elements](#multiple-elements)
    - [Override properties](#override-properties)
- [Launch](#launch)
  - [Command-line options](#command-line-options)

# Overview

Markdown documentation generator/enhancer for javascript, typescript and react typescript projects. Can be used to generate API sections in your README.md files.

# Installation

```sh
yarn add @structured-types/api-readme --dev
```

# Markdown

## API docs section

In your `README.md` (or another markdown file) file, you will insert a `<api-readme />` tag to generate the API section:

```md
<api-readme />
```

## Table of contents

In your `README.md` (or another markdown file) file, you can insert a `# Table of contents` header and it will be automatically filled with an extracted table of contents

# Configuration

The configuration file options are documented in `@structured-types/api-docs` [DocumentOptions](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#documentationoptions)

You can configure api-readme either directly in your markdown file with [inline configuration](#inline-configuration) or with an [external file](#configuration-file).

## Inline configuration

- `files`: a comma-separated list of the files to include in the documentation

```md
<api-readme files="./src/index.ts"/>
```

- `id`: a string that should be linked to an element with options in the [configuration file](#configuration-file).

```md
<api-readme id="my-section"/>
```

- `extract`: a comma-separated list of API names to extract. By default, all the exports will be documented.

```md
<api-readme extract="parse, ParseOptions" files="./src/index.ts"/>
```

- `visible`: a comma-separated list of the properties to be visible. By default, all the extracted properties will be visible.

```md
<api-readme visible="ParseOptions" files="./src/index.ts"/>
```

- `collapsed`: a comma-separated list of type names, that should not be expanded. For example, some internal React objects can be kept just as a string and will not be detailed in the documentation, instead of listing their internal properties.

```md
<api-readme collapsed="React.ReactNode"/>
```

- `extensions`: a comma-separated list of plugins (or extensions). For example, for a react library, you can specify to include only react components, but not any additional types or utilities.

```md
<api-readme extensions="react"/>
```

- `sections`: a comma-separated list of the sections to generate `props` \| `description` \| `examples` \| `title` \| `location` \| `all`. By default, all sections are generated.

```md
<api-readme sections="description,props"/>
```

- `columns`: a comma-separated list of the columns in the property tables `name` \| `type` \| `parents` \| `value` \| `description` \| `all`. By default, all columns will be visible.

```md
<api-readme columns="name,type,value,description"/>
```

- `collectHelpers`: boolean, to specify whether to document also helper props (parents, inherited, etc) or just the main extracted exports. By default, the helper props will be documented and linked from the main props.

```md
<api-readme files="./src/index.ts" collectHelpers=false/>
```

- `skipInherited`: boolean, to specify whether to skip properties that are "inherited", or "composed". For example, `type OwnProps = { x: number } & React.LineProps` will only output the `x` property and skip the inherited React library properties.

```md
<api-readme files="./src/index.ts" skipInherited=true/>
```

- `maxDepth`: number, how deep to parse child props. By default, this is set to 6.

```md
<api-readme files="./src/index.ts" maxDepth=10/>
```

- other options from the [@structured-types/api](https://github.com/ccontrols/structured-types/tree/master/packages/api#parseoptions) package.

## Configuration file

The configuration file options are documented in [@structured-types/api-docs](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#configuration)

### Multiple elements

You can have [multiple elements](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#multiple-elements) configured within the same configuration file.

For example, you have two components to document `LineChart` and `RadarChart`:

You can custom specify the element ids in README.md

    <api-readme id="linechart">

    ...

    <api-readme id="radarchart">

In your configuration file, you can specify distinct options for each element. The per-element options will be merged with the global options.

Javascript

    module.exports = {
      sections: ['props'],
      elements: {
        linechart: {
          files: ['./src/charts/line/Chart.tsx'],
          visible: ['LineChart'],
        },
        radarchart: {
          files: ['./src/charts/radar/Chart.tsx'],
          visible: ['RadarChart'],

        }
      }
    };

JSON

    module.exports = {
      "sections": ["props"],
      "elements": {
        "linechart": {
          "files": ["./src/charts/line/Chart.tsx"],
          "visible": ["LineChart"]
        },
        "radarchart": {
          "files": ["./src/charts/radar/Chart.tsx"],
          "visible": ["RadarChart"]
        }
      }
    };

YAML:

    sections:
      - props
    elements:
      linechart:
        files:
          - ./src/charts/line/Chart.tsx
        visible:
          - LineChart
      radarchart:
        files:
          - ./src/charts/radar/Chart.tsx
        visible:
          - RadarChart

# Launch

You can launch directly from the command-line ie `yarn run api-readme` or from your `package.json` file by adding a script to launch the command line documentation tool.

```json
...
  "scripts": {
    "docs": "api-readme",
    ...
  },
...
```

## Command-line options

- `-t` or `--toc`: boolean (default: `true`). Whether to generate a table of contents in your markdown file. You will need to create the section title such as `# Table of contents` and `api-readme` will generate the content within this section.

```bash
yarn(npm) run api-readme -t=false
```

- `-f` or `--file`: string (default: `MARKDOWN.md`). The name of the markdown file to be processed. Make sure you have inserted a `<api-readme />` tag within this file.

```bash
yarn(npm) run api-readme -f=./src/test.md
```

- `-c` or `--config`: string. The api-docs [configuration file](#configuration-file) full path and name.

```bash
yarn(npm) run api-readme -f=./src/test.md
```

- `-l` or `--log`: boolean (default: `true`). Display/or not the running logs.

```bash
yarn(npm) run api-readme -l=false
```
