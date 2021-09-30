# Table of contents

-   [Overview](#overview)
-   [Getting Started](#getting-started)
    -   [Install](#install)
    -   [Configure](#configure)
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

In your `README.md` (or other markdown file) file, you will insert a `<api-readme />` tag to generate the API section:

```md
<api-readme />
```

### Options

-   `files`: a comma-separated list of the files to include in the documentation

```md
<api-readme files="./src/index.ts"/>
```

-   `extract`: a comma-separated list of API names to extract, by default all exports

```md
<api-readme extract="parse, ParseOptions" files="./src/index.ts"/>
```

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

-   `-t` or `--toc`: boolean (default: `true`). Generate/or not a table of contents in your markdown file. You will need to create the section title such as `# Table of contents` and `api-markdown` will generate the content within this section.

-   `-f` or `--file`: string (default: `MARKDOWN.md`). The markdown file that will be processed. Make sure you have inserted a `<api-readme />` tag within this file.

-   `-l` or `--log`: boolean (default: `true`). Display/or not the running logs.
