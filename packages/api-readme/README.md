# Table of contents

-   [Overview](#overview)
-   [Getting Started](#getting-started)
    -   [Install](#install)
    -   [Configure](#configure)
        -   [API docs section](#api-docs-section)
        -   [Table of contents](#table-of-contents-1)
        -   [Options](#options)
    -   [Launch](#launch)
        -   [Command-line options](#command-line-options)

# Overview

Markdown documentation generator/enhancer for javascript, typescript and react typescript projects. Can be used to generate API sections in your README.md files.

# Getting Started

## Install

```sh
yarn add @structured-types/api-readme --dev
```

## Configure

### API docs section

In your `README.md` (or other markdown file) file, you will insert a `<api-readme />` tag to generate the API section:

```md
<api-readme />
```

### Table of contents

In your `README.md` (or other markdown file) file, you can insert a `# Table of contents` header and it will be automatically filled with an extracted table of contents

### Options

-   `files`: a comma-separated list of the files to include in the documentation

```md
<api-readme files="./src/index.ts"/>
```

-   `extract`: a comma-separated list of API names to extract. By default all the exports will be documented.

```md
<api-readme extract="parse, ParseOptions" files="./src/index.ts"/>
```

-   `collapsed`: a comma-separated list of type names, that should not be expanded. For example some internal React object can be kept just as string, instead of listing their internal properties.

```md
<api-readme collapsed="React.ReactNode"/>
```

-   `extensions`: a comma-separated list of plugins (or extensions). For example for a react library, you can specify to include only react components, but not any additional types or utilities.

```md
<api-readme extensions="react"/>
```

="react"

-   `collectHelpers`: boolean, to specify whether to document also helper props (parents, inherited etc) or just the main extracted exports. By default the helper props will be documented and linked to from the main props.

```md
<api-readme files="./src/index.ts" collectHelpers=false/>
```

-   `maxDepth`: number, how deep to parse child props. By default this is set to 6.

```md
<api-readme files="./src/index.ts" maxDepth=10/>
```

-   other options from the [@structured-types/api](https://github.com/ccontrols/structured-types/blob/master/packages/api/README.md) package.

## Launch

You can launch directly from the command-line or integrate in `package.json` by adding a script to launch the command line documentation tool.

```json
...
  "scripts": {
    "docs": "api-readme",
    ...
  },
...
```

### Command-line options

-   `-t` or `--toc`: boolean (default: `true`). Whether to generate a table of contents in your markdown file. You will need to create the section title such as `# Table of contents` and `api-readme` will generate the content within this section.

```bash
yarn(npm) run api-readme -t=false
```

-   `-f` or `--file`: string (default: `MARKDOWN.md`). The markdown file that will be processed. Make sure you have inserted a `<api-readme />` tag within this file.

```bash
yarn(npm) run api-readme -f=./src/test.md
```

-   `-l` or `--log`: boolean (default: `true`). Display/or not the running logs.

```bash
yarn(npm) run api-readme -l=false
```
