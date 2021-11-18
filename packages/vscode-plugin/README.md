# Table of contents

- [Instant Documentation VSCode Extension](#structured-documentation-vscode-extension)
  - [Installation in VS Code](#installation-in-vs-code)
    - [Install from VS Code (Recommended)](#install-from-vs-code-recommended)
    - [Install from GitHub](#install-from-github)
  - [VSCode Settings](#vscode-settings)
  - [Configuration file](#configuration-file)
    - [Options](#options)
  - [Keybindings](#keybindings)

<h1 align="center">Instant Documentation VSCode Plugin</h1>

A VSCode extension that will show on-the-fly documentation for typescript and javascript files

![main screen](https://github.com/ccontrols/structured-types/raw/master/packages/vscode-plugin/main-screen.jpg)

## Installation in VS Code

### Install from VS Code (Recommended)

Open VSCode, search for `instant-documentation-vscode` in Extensions, and then click the Install button.

### Install from GitHub

Download `instant-documentation-vscode-_.vsix` file from [Releases](https://github.com/ccontrols/instant-documentation-vscode/releases).
Open vscode, run Extension: Install from VSIX, then choose the \_.vsix file you just downloaded.

## VSCode Settings

You can go to the **Preferences/Settings/Extensions** is VSCode and then select the **Instant Documentation** tab.
![settings](https://github.com/ccontrols/structured-types/raw/master/packages/vscode-plugin/settings.jpg)

## Configuration file

You can also use an external configuration file as documented in [@structured-types/api-docs](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#configuration)

### Options

- `singlePage`: Open only one documentation page, instead of a new one for every file.

- `autoShowDocumentation`: Automatically show a documentation page of the code being edited.

And the other options are from `@structured-types/api-docs` [DocumentOptions](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#documentationoptions)

## Keybindings

> The <kbd>cmd</kbd> key for _Windows_ is <kbd>ctrl</kbd>.

| Shortcuts                                 | Functionality              |
| ----------------------------------------- | -------------------------- |
| <kbd>cmd-k i</kbd> or <kbd>ctrl-k i</kbd> | Open Instant Documentation |
