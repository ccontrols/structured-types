# Structured Documentation VSCode Extension

A VSCode extension that will show the structured type information documentation for typescript and javascript files

![main screen](https://github.com/ccontrols/structured-types/raw/master/packages/vscode-plugin/main-screen.jpg)

## Installation in VS Code

### Install from VS Code (Recommended)

Open VSCode, search for `@structured-types/vscode-plugin` in Extensions and then click the Install button.

![./vscode-extension.gif](https://github.com/ccontrols/structured-types/raw/master/packages/vscode-plugin/vscode-extension.gif)

### Install from GitHub

Download `@structured-types/vscode-plugin-_.vsix` file from [Releases](https://github.com/ccontrols/structured-types/raw/master/packages/vscode-plugin/releases).
Open vscode, run Extension: Install from VSIX, then choose the \_.vsix file you just downloaded.

## VSCode Settings

You can go to the **Preferences/Settings/Extensions** is VSCode and then select the **Structured Documentation** tab.
![settings](https://github.com/ccontrols/structured-types/raw/master/packages/vscode-plugin/settings.jpg)

## Configuration file

You can also use an external configuration file as documented in [@structured-types/api-docs](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#configuration)

### Options

- `singlePage`: Open only one documentation page, instead a new one for every file.

- `autoShowDocumentation`: Automatically show a documentation page of the code being edited.

And the other options are from `@structured-types/api-docs` [DocumentOptions](https://github.com/ccontrols/structured-types/tree/master/packages/api-docs#documentationoptions)

## Keybindings

> The <kbd>cmd</kbd> key for _Windows_ is <kbd>ctrl</kbd>.

| Shortcuts                                         | Functionality                  |
| ------------------------------------------------- | ------------------------------ |
| <kbd>cmd-k v</kbd> or <kbd>ctrl-k v</kbd>         | Open documentation to the Side |
| <kbd>cmd-shift-v</kbd> or <kbd>ctrl-shift-v</kbd> | Open documentation             |
