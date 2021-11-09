/* eslint-disable prefer-spread */
import path from 'path';
import jsStringEscape from 'js-string-escape';
import deepmerge from 'deepmerge';
import {
  InterfaceProp,
  isTupleProp,
  isClassLikeProp,
  isUnionProp,
  PropType,
  hasProperties,
  isFunctionProp,
  FunctionProp,
  PropKind,
  isArrayProp,
  isIndexProp,
  isStringProp,
  EnumProp,
  isEnumProp,
  HasValueProp,
  PropTypes,
  PropParent,
  HasPropertiesProp,
  hasValue,
} from '@structured-types/api/types';
import {
  DocumentationNode,
  SectionName,
  ColumnName,
  DocumentationOptions,
  NodeKind,
  DocumentationNodeWithChildren,
  SectionObject,
  ColumnObject,
  isNodeWithValue,
} from './types';
import { getRepoPath } from './package-info/package-info';
import { createPropsTable, createPropsRow, PropItem } from './blocks/table';
import { textNode } from './blocks/text';
import { paragraphNode } from './blocks/paragraph';
import { emphasisNode } from './blocks/emphasis';
import { codeNode } from './blocks/code';
import { inlineCodeNode } from './blocks/inline-code';
import { linkNode } from './blocks/link';
import { headingNode } from './blocks/heading';
import { boldNode } from './blocks/bold';
import { defaultSections } from './sections';
import { defaultColumns } from './columns';

export class PropsToDocumentation {
  private sections: SectionObject = defaultSections;
  private columns: ColumnObject = defaultColumns;
  private topLevelProps: Record<string, PropType> = {};
  private helpers: Record<string, PropType> = {};
  private options: DocumentationOptions = {};
  private repoNames: {
    [key: string]: {
      repo?: string;
      filePath?: string;
      packageName?: string;
      relativePath?: string;
    };
  } = {};

  private extractPropTable(
    prop: PropType,
    rows: PropType[],
  ): ReturnType<typeof createPropsTable> {
    let parentProp: EnumProp | undefined = undefined;
    const addParentProp = (prop: PropType) => {
      if (prop.parent) {
        if (!parentProp) {
          parentProp = {
            name: '...props',
            kind: PropKind.Enum,
            properties: [
              {
                kind: PropKind.Type,
                type: prop.parent.name,
                loc: prop.parent.loc,
              },
            ],
            optional: true,
          };
        } else {
          if (
            !parentProp.properties?.find((p) => p.type === prop.parent?.name)
          ) {
            parentProp.properties?.push({
              kind: PropKind.Type,
              type: prop.parent.name,
              loc: prop.parent.loc,
            });
          }
        }
      }
    };
    const consolidatedProps = rows.filter((prop) => {
      if (prop.parent) {
        if (
          this.options.skipInherited ||
          this.options.collapsed?.includes(prop.parent.name)
        ) {
          addParentProp(prop);
          return false;
        }
        if (this.options.collapsed) {
          for (const collapsedProp of this.options.collapsed) {
            const helperParent = this.helpers[collapsedProp];
            if (helperParent && hasProperties(helperParent)) {
              const helpProp = helperParent.properties?.find(
                (p) =>
                  p.name === prop.name && p.parent?.name === prop.parent?.name,
              );
              if (helpProp) {
                addParentProp({
                  ...prop,
                  parent: { name: collapsedProp, loc: helperParent.loc },
                });
                return false;
              }
            }
          }
        }
      }
      return true;
    });
    const allProps = parentProp
      ? [...consolidatedProps, parentProp]
      : consolidatedProps;
    const items: PropItem[] = allProps.map((prop) => {
      let name = prop.name
        ? prop.kind === PropKind.Rest
          ? `...${prop.name}`
          : prop.name
        : '';
      name = `${name}${!name || prop.optional ? '' : '*'}`;
      return this.configurePropItem({
        name: prop.loc
          ? this.propLink({ name, loc: prop.loc })
          : [inlineCodeNode(name)],
        parents: prop.parent ? this.propLink(prop.parent) : undefined,

        type: this.extractPropType(prop),
        description: prop.description,
        default: hasValue(prop)
          ? typeof prop.value === 'string'
            ? `"${prop.value}"`
            : prop.value
          : undefined,
        prop,
      } as PropItem);
    });
    return createPropsTable(items, this.columns, prop);
  }

  private extractFunctionDeclaration(prop: FunctionProp): DocumentationNode[] {
    const result: DocumentationNode[] = [textNode('(')];
    if (prop.parameters) {
      for (let i = 0; i < prop.parameters.length; i += 1) {
        const p = prop.parameters[i];
        if (i > 0) {
          result.push(textNode(', '));
        }
        if (p.name) {
          result.push(inlineCodeNode(p.name));

          if (!p.optional) {
            result.push(textNode('*'));
          }
          result.push(textNode(': '));
        }
        result.push(...this.extractPropType(p));
        if (!p.name && !p.optional) {
          result.push(textNode('*'));
        }
      }
    }
    result.push(textNode(')'));
    result.push(textNode(' => '));
    if (prop.returns) {
      result.push(...this.extractPropType(prop.returns));
    } else {
      result.push(textNode('void'));
    }
    return result;
  }
  private configurePropItem(item: PropItem): PropItem {
    const enabledColumn = (name: ColumnName): boolean | undefined => {
      return this.columns[name] && !this.columns[name]?.hidden;
    };
    return {
      name: enabledColumn('name') ? item.name : undefined,
      parents: enabledColumn('parents') ? item.parents : undefined,
      type: enabledColumn('type') ? item.type : undefined,
      default: enabledColumn('default') ? item.default : undefined,
      description: enabledColumn('description') ? item.description : undefined,
      prop: item.prop,
    };
  }
  private extractFunction(
    prop: FunctionProp,
    _extractTable = true,
  ): DocumentationNode[] | undefined {
    if (prop.parameters) {
      const { propsTable, table, visibleColumns } = this.extractPropTable(
        prop,
        prop.parameters,
      );
      if (
        table &&
        table.children &&
        prop.returns &&
        prop.returns.kind !== PropKind.Void
      ) {
        table.children.push(
          createPropsRow(
            this.configurePropItem({
              name: [inlineCodeNode('returns')],
              parents: prop.returns.parent
                ? this.propLink(prop.returns.parent)
                : undefined,
              type: this.extractPropType(prop.returns),
              description: prop.returns.description,
              default: undefined,
              prop,
            }),
            this.columns,
            visibleColumns,
          ),
        );
      }
      return propsTable;
    }
    return undefined;
  }
  private getPropLink = (key: string): PropType | undefined => {
    const nameParts = key.split('.');
    return this.topLevelProps[nameParts[nameParts.length - 1]];
  };
  private extractInterface(prop: InterfaceProp): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    if (prop.name) {
      if (isUnionProp(prop)) {
        result.push(...this.extractPropType(prop));
      } else if (hasProperties(prop) && prop.properties) {
        const { propsTable } = this.extractPropTable(prop, prop.properties);
        result.push(...propsTable);
      }
    }
    return result;
  }

  private propLink(prop: PropParent): DocumentationNode[] {
    const typeText = [inlineCodeNode(prop.name)];
    if (typeof prop.name === 'string') {
      const link = this.getPropLink(prop.name);
      return [
        linkNode(
          typeText,
          link ? `#${link.name?.toLowerCase()}` : undefined,
          prop.loc,
        ),
      ];
    }
    return typeText;
  }

  private inlineType(prop: PropType): DocumentationNode[] {
    let typeNode: DocumentationNode[] | undefined = undefined;
    if (typeof prop.type === 'string') {
      if (this.getPropLink(prop.type)) {
        typeNode = this.propLink({ name: prop.type, loc: prop.loc });
      } else {
        typeNode = this.extractPropType(prop);
      }
    } else if (prop.kind) {
      typeNode = this.extractPropType(prop);
    }
    if (prop.name && prop.name !== prop.type) {
      return [
        inlineCodeNode(`${prop.name}`),
        textNode(`${typeNode ? ': ' : ''}`),
        ...(typeNode || []),
      ];
    }
    return typeNode || [];
  }
  private typeNode(prop: PropType, showValue = true): DocumentationNode[] {
    if (typeof prop.type === 'string') {
      if (typeof prop.parent === 'string') {
        return [...this.propLink(prop.parent), textNode(`.${prop.type}`)];
      }
      return this.propLink({ name: prop.type, loc: prop.loc });
    }
    if (showValue && (prop as HasValueProp).value !== undefined) {
      const value = isStringProp(prop)
        ? `"${jsStringEscape(prop.value)}"`
        : (prop as HasValueProp).value.toString();
      return [textNode(value)];
    }
    if (prop.kind) {
      const typeNode: DocumentationNode[] = [
        inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`),
      ];
      if (typeof prop.parent === 'string' && this.getPropLink(prop.parent)) {
        const link = this.propLink(prop.parent);
        if (link.length) {
          typeNode.push(textNode(` (`));
          typeNode.push(...link);
          typeNode.push(textNode(`)`));
        }
      }
      return typeNode;
    }
    if (prop.name) {
      return [textNode(prop.name)];
    }

    return [];
  }

  private extractPropType(
    prop: PropType,
    options?: { showValue?: boolean },
  ): DocumentationNode[] {
    if (prop.parent) {
      const parent = this.getPropLink(prop.parent.name);
      if (parent && isClassLikeProp(parent)) {
        const p = parent.properties?.find((p) => p.name === prop.name);
        if (p) {
          return this.extractType(p, options);
        }
      }
    }
    return this.extractType(prop, options);
  }
  private getPropProperties(prop: HasPropertiesProp): {
    properties: PropType[];
    more: DocumentationNode | undefined;
  } {
    const { maxProps = 30 } = this.options;
    if (prop.properties) {
      return {
        properties: maxProps ? prop.properties.slice(0, maxProps) : [],
        more:
          maxProps && prop.properties.length > maxProps
            ? textNode(` ,...${prop.properties.length - maxProps} more`)
            : undefined,
      };
    }
    return {
      properties: [],
      more: undefined,
    };
  }
  private extractType(
    prop: PropType,
    options?: { showValue?: boolean },
  ): DocumentationNode[] {
    const unionSeparator = ' | ';
    const enumSeparator = ' | ';
    const { showValue = false } = options || {};
    if (
      typeof prop.type === 'string' &&
      this.options.collapsed?.includes(prop.type)
    ) {
      return this.typeNode(prop, showValue);
    } else if (isUnionProp(prop) || isEnumProp(prop)) {
      const separator = isUnionProp(prop) ? unionSeparator : enumSeparator;
      const { properties, more } = this.getPropProperties(prop);
      const nodes = properties.reduce((acc: DocumentationNode[], t, idx) => {
        const r = [...acc, ...this.extractPropType(t, { showValue: true })];
        if (idx < properties.length - 1) {
          r.push(textNode(separator));
        }
        return r;
      }, []);
      if (more) {
        nodes.push(more);
      }
      return nodes;
    } else if (isClassLikeProp(prop)) {
      const propName = typeof prop.type === 'string' ? prop.type : prop.name;
      const result: DocumentationNode[] = [];
      const { properties, more } = this.getPropProperties(prop);
      if (typeof propName === 'string' && this.getPropLink(propName)) {
        result.push(...this.propLink({ name: propName, loc: prop.loc }));
      } else if (properties.length) {
        const typeArguments: DocumentationNode[] = properties.reduce(
          (acc: DocumentationNode[], p: PropType, idx: number) => {
            const result = [...acc, ...this.inlineType(p)];
            if (properties && idx < properties.length - 1) {
              result.push(textNode(', '));
            }
            return result;
          },
          [],
        );
        if (more) {
          typeArguments.push(more);
        }
        if (typeArguments.length) {
          result.push(textNode('{ '));
          result.push(...typeArguments);
          result.push(textNode(' }'));
        }
      } else if (prop.generics?.length) {
        const genericArguments: DocumentationNode[] | undefined =
          prop.generics?.reduce(
            (acc: DocumentationNode[], p: PropType, idx: number) => {
              const result = [...acc, ...this.inlineType(p)];
              if (prop.generics && idx < prop.generics.length - 1) {
                result.push(textNode(', '));
              }
              return result;
            },
            [],
          );
        result.push(...this.typeNode(prop));
        if (genericArguments?.length) {
          result.push(...[textNode('<'), ...genericArguments, textNode('>')]);
        }
      } else if (propName) {
        result.push(textNode(propName));
      }
      return result;
    } else if (isArrayProp(prop)) {
      const { properties, more } = this.getPropProperties(prop);
      const elements = properties.reduce(
        (acc: DocumentationNode[], p: PropType, idx: number) => {
          const result = this.extractPropType(p);
          if (idx < properties.length - 1) {
            result.push(textNode(', '));
          }
          return [...acc, ...result];
        },
        [],
      ) as DocumentationNodeWithChildren[];
      if (more) {
        elements.push(more);
      }
      const multiProps =
        elements.length &&
        ((elements[0].children && elements[0].children.length > 1) ||
          (elements.length > 2 &&
            isNodeWithValue(elements[1]) &&
            (elements[1].value === unionSeparator ||
              elements[1].value === enumSeparator)));
      if (multiProps) {
        elements.splice(0, 0, textNode('('));
        elements.push(textNode(')'));
      }
      elements.push(textNode('[]'));
      return elements;
    } else if (isTupleProp(prop)) {
      const { properties, more } = this.getPropProperties(prop);
      const nodes = [
        textNode('['),
        ...properties.reduce(
          (acc: DocumentationNode[], p: PropType, idx: number) => {
            const result = this.extractPropType(p);
            if (idx < properties.length - 1) {
              result.push(textNode(', '));
            }
            return [...acc, ...result];
          },
          [],
        ),
      ];
      if (more) {
        nodes.push(more);
      }
      nodes.push(textNode(']'));
      return nodes;
    } else if (isIndexProp(prop)) {
      const results: DocumentationNode[] = [
        textNode('['),
        ...this.extractPropType(prop.index),
        textNode(']'),
      ];
      if (prop.prop) {
        results.push(textNode(': '));
        results.push(...this.extractPropType(prop.prop));
      }
      return results;
      //return this.extractFunctionDeclaration(prop);
    } else if (isFunctionProp(prop)) {
      return this.extractFunctionDeclaration(prop);
    }
    return this.typeNode(prop, showValue);
  }
  private getSourceLocation(prop: PropType): DocumentationNode[] {
    const { filePath, loc } = prop.loc || {};
    if (filePath) {
      if (!this.repoNames[filePath]) {
        this.repoNames[filePath] = getRepoPath(path.resolve(filePath));
      }

      if (this.repoNames[filePath]) {
        const { repo, relativePath, packageName } = this.repoNames[filePath];
        const fileLocation = repo || filePath;
        if (fileLocation) {
          const { line } = loc?.start || {};
          const sourceLocation = filePath.includes('node_modules')
            ? fileLocation
            : `${fileLocation}${line ? `#L${line}` : ''}`;
          return [
            paragraphNode([
              emphasisNode([
                textNode('defined in '),
                linkNode(
                  [
                    textNode(
                      packageName
                        ? `${packageName}/${relativePath}`
                        : sourceLocation,
                    ),
                  ],
                  sourceLocation,
                  prop.loc,
                ),
              ]),
            ]),
          ];
        }
      }
    }
    return [];
  }
  private getType(prop: PropType): DocumentationNode[] | undefined {
    if (prop.kind) {
      return [
        boldNode([
          inlineCodeNode(
            `${prop.extension ? `${prop.extension} ` : ''}${PropKind[
              prop.kind
            ].toLowerCase()}`,
          ),
        ]),
      ];
    } else if (typeof prop.type === 'string') {
      return [
        headingNode(this.propLink({ name: prop.type, loc: prop.loc }), 3),
      ];
    }
    return undefined;
  }

  private getLocation(prop: PropType): DocumentationNode[] | undefined {
    const loc = this.getSourceLocation(prop);
    if (loc.length) {
      return loc;
    }
    return undefined;
  }

  private getPropsTable(prop: PropType): DocumentationNode[] | undefined {
    if (isFunctionProp(prop)) {
      return this.extractFunction(prop);
    } else if (hasProperties(prop)) {
      return this.extractInterface(prop);
    }
    return undefined;
  }

  private getExamples(prop: PropType): DocumentationNode[] | undefined {
    if (prop.examples) {
      const result: DocumentationNode[] = [];
      const codeExamples = prop.examples.filter((e) => e.content);
      codeExamples.forEach((example) => {
        if (example.content) {
          result.push(paragraphNode([codeNode(example.content)]));
        }
      });
      return result;
    }
    return undefined;
  }
  private getExtends(prop: PropType): DocumentationNode[] | undefined {
    if (isClassLikeProp(prop) && prop.extends?.length) {
      const extendsList = prop.extends.reduce(
        (acc: DocumentationNode[], key: string, idx: number) => {
          const p = this.getPropLink(key);
          let result: DocumentationNode[];
          if (p) {
            result = this.extractPropType(p);
          } else {
            result = [textNode(key)];
          }
          if (prop.extends && idx < prop.extends.length - 1) {
            result.push(textNode(', '));
          }
          return [...acc, ...result];
        },
        [],
      );
      return extendsList;
    }
    return undefined;
  }
  private getSection(
    prop: PropType,
    name: SectionName,
  ): DocumentationNode[] | undefined {
    switch (name) {
      case 'title':
        return prop.name ? [headingNode(prop.name, 2)] : undefined;
      case 'description':
        return prop.description
          ? [
              paragraphNode(
                prop.description.split('\n').map((d) => ({
                  kind: NodeKind.Text,
                  value: d,
                })),
              ),
            ]
          : undefined;
      case 'type':
        return this.getType(prop);
      case 'location':
        return this.getLocation(prop);
      case 'props':
        return this.getPropsTable(prop);
      case 'extends':
        return this.getExtends(prop);
      case 'examples':
        return this.getExamples(prop);
      default:
        return undefined;
    }
  }
  private generateSection(
    prop: PropType,
    name: SectionName,
  ): DocumentationNode[] | undefined {
    const config = this.sections[name];
    if (config) {
      const { title, render } = config;
      const children =
        typeof render === 'function'
          ? render(prop)
          : this.getSection(prop, name);
      if (children) {
        const result: DocumentationNode[] = [];

        if (title) {
          const value = typeof title === 'function' ? title(prop) : title;
          if (value) {
            result.push(paragraphNode([boldNode([textNode(value)])]));
          }
        }
        result.push(...children);
        return result;
      }
    }
    return undefined;
  }
  private generateNodes(prop: PropType): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    Object.keys(this.sections).forEach((name) => {
      const config = this.sections[name as SectionName];
      if (!config?.hidden) {
        const section = this.generateSection(prop, name as SectionName);
        if (section) {
          result.push(...section);
        }
      }
    });
    return result;
  }

  public extract(
    props: PropTypes,
    options: DocumentationOptions = {},
  ): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    const { extensions, visible, sections = {}, columns = {} } = options;
    this.options = options;
    if (sections) {
      this.sections = Array.isArray(sections)
        ? sections.reduce((acc, name) => {
            return { ...acc, [name]: defaultSections[name] };
          }, {})
        : deepmerge(defaultSections, sections);
    }
    if (columns) {
      this.columns = Array.isArray(columns)
        ? columns.reduce((acc, name) => {
            return { ...acc, [name]: defaultColumns[name] };
          }, {})
        : deepmerge(defaultColumns, columns);
    }

    const filterProps = (prop: PropType): PropType | undefined => {
      if (Array.isArray(extensions)) {
        if (
          typeof prop.extension === 'string' &&
          extensions.includes(prop.extension)
        ) {
          return prop;
        }
        return undefined;
      }
      if (Array.isArray(visible)) {
        if (typeof prop.name === 'string' && visible.includes(prop.name)) {
          return prop;
        }
        return undefined;
      }
      return prop;
    };
    Object.keys(props).forEach((key) => {
      if (key !== '__helpers' && key !== '__diagnostics') {
        const prop = filterProps(props[key]);
        if (prop) {
          this.topLevelProps[key] = prop;
        }
      }
    });
    this.helpers = props.__helpers || {};
    Object.keys(this.helpers).forEach((key) => {
      const prop = filterProps(this.helpers[key]);
      if (prop) {
        this.topLevelProps[key] = prop;
      }
    });
    Object.values(this.topLevelProps).forEach((prop) => {
      const nodes = this.generateNodes(prop);
      result.push(...nodes);
    });
    return result;
  }
}
