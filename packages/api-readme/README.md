# Table of contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Install](#install)
  - [Configure](#configure)
    - [Options](#options)
  - [Launch](#launch)
- [API](#api)
  - [default](#default)

# Overview

Markdown documentation generator/enhancer tailored for README.md files

# Getting Started

## Install

```sh
yarn add @structured-types/api-readme --dev
```

## Configure

In your `README.md` file, you can insert a `<api-readme />` tag to generate the API section:

```md
<api-readme files="./src/index.ts"/>
```

### Options

- `files`: a comma-separated list of the files to include in the documentation
- `extract`: a comma-separated list of API names to extract, by default all exports

## Launch

In `package.json`, you can add a script to launch the command line documentation tool

```json
...
  "scripts": {
    "docs": "api-readme",
    ...
  },
...
```

# API

<api-readme />

<!-- START-API-README -->

## default

create markdown pages from README.md type files

command-line arguments

**function** default(`f`\*: string, `t`\*: boolean, `l`\*: boolean): void;

### parameters

| Name | Type    | Description                                              |
| ---- | ------- | -------------------------------------------------------- |
| `f*` | string  | input file name to be processed, default is README.md    |
| `t*` | boolean | whether to generate a table of contents, default is true |
| `l*` | boolean | whether to output logs, default is true                  |

<!-- END-API-README -->
