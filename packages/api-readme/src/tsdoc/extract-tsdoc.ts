/* eslint-disable prefer-spread */
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';

import {
  InterfaceProp,
  isTupleProp,
  isClassLikeProp,
  isUnionProp,
  parseFiles,
  PropType,
  hasProperties,
  isFunctionProp,
  FunctionProp,
  PropKind,
  hasValue,
  isArrayProp,
} from '@structured-types/api';
import {
  createPropsRow,
  createPropsTable,
  PropItem,
} from '../blocks/props-table';
import { Node, NodeChildren } from '../common/types';

export class ExtractProps {
  private files: string[];
  private names?: string[];
  private topLevelProps: Record<string, PropType> = {};

  constructor(files: string[], names: string[] | undefined) {
    this.files = files;
    this.names = names;
  }

  private extractPropTable(
    props: PropType[],
    title: string,
  ): ReturnType<typeof createPropsTable> {
    const items: PropItem[] = props.map(
      (prop) =>
        ({
          name: prop.name || '',
          isOptional: prop.optional,
          type: isFunctionProp(prop)
            ? isFunctionProp(prop)
            : this.extractPropType(prop),
          description: prop.description || '',
          value: hasValue(prop) ? prop.value : undefined,
        } as PropItem),
    );
    return createPropsTable(title, items);
  }
  private extractFunction(node: FunctionProp, _extractTable = true): Node[] {
    const result: Node[] = [];
    if (node.name) {
      const declaration: NodeChildren = {
        type: 'paragraph',
        children: [],
      };
      result.push(declaration);
      declaration.children.push({
        type: 'strong',
        children: [
          {
            type: 'text',
            value: 'function',
          },
        ],
      });
      declaration.children.push({
        type: 'text',
        value: ' ',
      });

      declaration.children.push({
        type: 'text',
        value: node.name,
      });
      declaration.children.push({
        type: 'text',
        value: '(',
      });
      if (node.parameters) {
        for (let i = 0; i < node.parameters.length; i += 1) {
          const p = node.parameters[i];
          if (i > 0) {
            declaration.children.push({
              type: 'text',
              value: ', ',
            });
          }
          declaration.children.push({
            type: 'inlineCode',
            value: p.name,
          });
          if (!p.optional) {
            declaration.children.push({
              type: 'text',
              value: '*',
            });
          }
          declaration.children.push({
            type: 'text',
            value: ': ',
          });
          declaration.children.push(...this.extractPropType(p));
        }
      }
      declaration.children.push({
        type: 'text',
        value: ')',
      });
      if (node.returns) {
        declaration.children.push({
          type: 'text',
          value: ': ',
        });
        declaration.children.push(...this.extractPropType(node.returns));
      }
      declaration.children.push({
        type: 'text',
        value: ';',
      });
      if (node.parameters) {
        const { propsTable, table, hasValues } = this.extractPropTable(
          node.parameters,
          'parameters',
        );
        if (table && node.returns && node.returns.kind !== PropKind.Void) {
          table.children.push(
            createPropsRow(
              {
                name: 'returns',
                isOptional: true,
                type: this.extractPropType(node.returns),
                description: node.returns.description || '',
              },
              hasValues,
            ),
          );
        }
        result.push(...propsTable);
      }
    }
    return result;
  }

  private extractInterface(prop: InterfaceProp): Node[] {
    const result: Node[] = [];
    if (prop.name) {
      const declaration: NodeChildren = {
        type: 'paragraph',
        children: [],
      };
      result.push(declaration);

      if (prop.extends?.length) {
        declaration.children.push({
          type: 'strong',
          children: [
            {
              type: 'text',
              value: ' extends ',
            },
            ...prop.extends.reduce(
              (acc: Node[], p: PropType) => [
                ...acc,
                ...this.extractPropType(p),
              ],
              [],
            ),
          ],
        });
      }

      if (hasProperties(prop) && prop.properties) {
        const { propsTable } = this.extractPropTable(
          prop.properties,
          'properties',
        );
        result.push(...propsTable);
      }
    }
    return result;
  }

  private propLink(type?: string): Node[] {
    const typeText = [
      {
        type: 'text',
        value: type,
      },
    ];
    if (typeof type === 'string') {
      const propName = type.startsWith(':') ? type.substring(1) : type;
      if (this.topLevelProps[propName]) {
        return [
          {
            type: 'link',
            url: `#${propName.toLowerCase()}`,
            children: typeText,
          },
        ];
      }
    }
    return typeText;
  }

  private inlineType(prop: PropType): Node[] {
    let typeNode: Node[] | undefined = undefined;
    const type =
      typeof prop.type === 'string'
        ? prop.type
        : prop.parent
        ? `:${prop.parent}`
        : undefined;
    if (typeof type === 'string') {
      typeNode = this.propLink(type);
    } else if (prop.kind) {
      typeNode = [
        {
          type: 'text',
          value: `${PropKind[prop.kind].toLowerCase()}`,
        },
      ];
    }
    if (prop.name) {
      return [
        {
          type: 'text',
          value: `${prop.name}${typeNode ? ': ' : ''}`,
        },
        ...(typeNode || []),
      ];
    }
    return typeNode || [];
  }
  private typeNode(prop: PropType, showValue = false): Node[] {
    const type =
      typeof prop.type === 'string'
        ? prop.type
        : prop.parent
        ? `:${prop.parent}`
        : undefined;
    if (typeof type === 'string') {
      return this.propLink(type);
    }
    if (showValue && hasValue(prop) && prop.value !== undefined) {
      return [
        {
          type: 'text',
          value: prop.value.toString(),
        },
      ];
    }
    if (prop.kind) {
      return [
        {
          type: 'text',
          value: `${PropKind[prop.kind].toLowerCase()}`,
        },
      ];
    }
    if (prop.name) {
      return [
        {
          type: 'text',
          value: prop.name,
        },
      ];
    }

    return [];
  }

  private extractPropType(
    prop: PropType,
    expandGenerics = true,
    showValue = false,
  ): Node[] {
    if (isUnionProp(prop) && prop.properties) {
      return [
        {
          type: 'paragraph',
          children: prop.properties?.reduce((acc: Node[], t, idx) => {
            const r = [...acc, ...this.extractPropType(t, true, true)];
            if (prop.properties && idx < prop.properties.length - 1) {
              r.push({ type: 'text', value: ' | ' });
            }
            return r;
          }, []),
        },
      ];
    } else if (isClassLikeProp(prop)) {
      if (prop.properties) {
        const typeArguments: Node[] = expandGenerics
          ? prop.properties.reduce((acc: Node[], p: PropType, idx: number) => {
              const result = [...acc, ...this.inlineType(p)];
              if (prop.properties && idx < prop.properties.length - 1) {
                result.push({
                  type: 'text',
                  value: ', ',
                });
              }
              return result;
            }, [])
          : [];
        const result: Node[] = this.propLink(prop.name);
        if (typeArguments.length) {
          result.push(
            ...[
              {
                type: 'text',
                value: '<',
              },
              ...typeArguments,
              {
                type: 'text',
                value: '>',
              },
            ],
          );
        }
        return result;
      } else {
        const genericArguments: Node[] | undefined = prop.generics?.reduce(
          (acc: Node[], p: PropType, idx: number) => {
            const result = [...acc, ...this.inlineType(p)];
            if (prop.generics && idx < prop.generics.length - 1) {
              result.push({
                type: 'text',
                value: ', ',
              });
            }
            return result;
          },
          [],
        );
        const result: Node[] = this.typeNode(prop);
        if (genericArguments?.length) {
          result.push(
            ...[
              {
                type: 'text',
                value: '<',
              },
              ...genericArguments,
              {
                type: 'text',
                value: '>',
              },
            ],
          );
        }
        return result;
      }
    } else if (isArrayProp(prop) && prop.properties) {
      return [
        {
          type: 'paragraph',
          children: [
            ...prop.properties.reduce(
              (acc: Node[], p: PropType, idx: number) => {
                const result = this.extractPropType(p);
                if (prop.properties && idx < prop.properties.length - 1) {
                  result.push({
                    type: 'text',
                    value: ', ',
                  });
                }
                return [...acc, ...result];
              },
              [],
            ),
            { type: 'text', value: '[]' },
          ],
        },
      ];
    } else if (isTupleProp(prop) && prop.properties) {
      return [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: '[' },
            ...prop.properties.reduce(
              (acc: Node[], p: PropType, idx: number) => {
                const result = this.extractPropType(p);
                if (prop.properties && idx < prop.properties.length - 1) {
                  result.push({
                    type: 'text',
                    value: ', ',
                  });
                }
                return [...acc, ...result];
              },
              [],
            ),
            { type: 'text', value: ']' },
          ],
        },
      ];
    } else {
      return this.typeNode(prop, showValue);
    }
  }

  private extractTSType(prop: PropType): Node[] {
    const result: Node[] = [];
    result.push({
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: prop.name }],
    });

    if (prop.description) {
      result.push(
        ...prop.description.split('\n').map((d) => ({
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: d,
            },
          ],
        })),
      );
    }
    if (isFunctionProp(prop)) {
      result.push(...this.extractFunction(prop));
    } else if (hasProperties(prop)) {
      result.push(...this.extractInterface(prop));
    }
    return result;
  }

  public extract(): Node[] {
    const result: Node[] = [];
    if (this.files) {
      const props = parseFiles(this.files, {
        collectFilePath: true,
        extractNames: this.names,
        consolidateParents: true,
        plugins: [propTypesPlugin, reactPlugin],
      });
      Object.keys(props).forEach((key) => {
        if (key !== '__parents' && key !== '__diagnostics') {
          this.topLevelProps[key] = props[key];
        }
      });
      const parents = props['__parents'];
      if (parents) {
        Object.keys(parents).forEach((key) => {
          this.topLevelProps[key] = parents[key];
        });
      }
      Object.keys(this.topLevelProps).forEach((key) => {
        const prop = this.topLevelProps[key];
        const nodes = this.extractTSType(prop);
        result.push(...nodes);
      });
    }
    return result;
  }
}
