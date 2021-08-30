/* eslint-disable prefer-spread */
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';

import {
  InterfaceProp,
  isTupleProp,
  isTypeProp,
  isUnionProp,
  parseFiles,
  PropType,
  hasProperties,
  isFunctionProp,
  FunctionProp,
  PropKind,
} from '@structured-types/api';
import {
  createPropsRow,
  createPropsTable,
  PropItem,
} from '../blocks/props-table';
import { Node, NodeChildren } from '../common/types';

export const extractTSDoc = (
  files?: string[],
  names?: string[],
): Node[] | undefined => {
  const addedTypeNames: string[] = [];

  const extractPropTable = (
    props: PropType[],
    title: string,
  ): { propsTable: Node[]; table?: NodeChildren } => {
    const items: PropItem[] =
      props &&
      props.reduce((acc: any, child: PropType) => {
        return [
          ...acc,
          {
            name: child.name || '',
            isOptional: child.optional,
            type: isFunctionProp(child)
              ? isFunctionProp(child)
              : extractPropType(child),
            description: child.description || '',
          },
        ];
      }, []);
    return createPropsTable(title, items);
  };
  const extractFunction = (
    node: FunctionProp,
    _extractTable = true,
  ): Node[] => {
    const result: Node[] = [];
    if (node.name) {
      const declaration: NodeChildren = {
        type: 'paragraph',
        children: [],
      };
      addedTypeNames.push(node.name);
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
          declaration.children.push(...extractPropType(p));
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
        declaration.children.push(...extractPropType(node.returns));
      }
      declaration.children.push({
        type: 'text',
        value: ';',
      });
      if (node.parameters) {
        const { propsTable, table } = extractPropTable(
          node.parameters,
          'parameters',
        );
        if (table && node.returns && node.returns.kind !== PropKind.Void) {
          table.children.push(
            createPropsRow({
              name: 'returns',
              isOptional: true,
              type: extractPropType(node.returns),
              description: node.returns.description || '',
            }),
          );
        }
        result.push(...propsTable);
      }
    }
    return result;
  };

  const extractInterface = (prop: InterfaceProp): Node[] => {
    const result: Node[] = [];
    if (prop.name) {
      const declaration: NodeChildren = {
        type: 'paragraph',
        children: [],
      };
      addedTypeNames.push(prop.name);
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
              (acc: any, t: any) => [...acc, ...extractPropType(t)],
              [],
            ),
          ],
        });
      }
      if (isFunctionProp(prop)) {
        if (prop.parameters) {
          prop.parameters.forEach((p, index) => {
            if (index > 0) {
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
            declaration.children.push(...extractPropType(p));
          });
        }
        if (prop.type) {
          declaration.children.push({
            type: 'text',
            value: ': ',
          });
          declaration.children.push(...extractPropType(prop));
        }
      }
      if (hasProperties(prop) && prop.properties) {
        const { propsTable } = extractPropTable(prop.properties, 'properties');
        result.push(...propsTable);
      }
    }
    return result;
  };

  const extractPropType = (p: PropType): Node[] => {
    if (isUnionProp(p)) {
      if (p.properties) {
        return [
          {
            type: 'paragraph',
            children: p.properties?.reduce((acc: Node[], t, idx) => {
              const r = [...acc, ...extractPropType(t)];
              if (p.properties && idx < p.properties.length - 1) {
                r.push({ type: 'text', value: ' | ' });
              }
              return r;
            }, []),
          },
        ];
      }
    } else if (isTypeProp(p)) {
      if (p.properties) {
        const typeArguments: Node[] = p.properties.reduce(
          (acc: any, a: any, idx: number) => {
            const r = [...acc, ...extractPropType(a)];
            if (p.properties && idx < p.properties.length - 1) {
              r.push({
                type: 'text',
                value: ', ',
              });
            }
            return r;
          },
          [],
        );
        return [
          {
            type: 'text',
            value: p.name,
          },
          {
            type: 'text',
            value: '<',
          },
          ...typeArguments,
          {
            type: 'text',
            value: '>',
          },
        ];
      }
    } else if (isTupleProp(p)) {
      if (p.properties) {
        return [
          {
            type: 'paragraph',
            children: [
              { type: 'text', value: '[' },
              ...p.properties.reduce((acc: Node[], t: any, idx: number) => {
                const r = extractPropType(t);
                if (p.properties && idx < p.properties.length - 1) {
                  r.push({
                    type: 'text',
                    value: ', ',
                  });
                }
                return [...acc, ...r];
              }, []),
              { type: 'text', value: ']' },
            ],
          },
        ];
      }
    } else if (p.kind !== undefined) {
      return [
        {
          type: 'text',
          value: `${PropKind[p.kind].toLowerCase()}`,
        },
      ];
    } else {
      console.log('unknown type: ', p.kind);
    }
    return [];
  };

  const extractTSType = (node: PropType): Node[] => {
    const result: Node[] = [];
    result.push({
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: node.name }],
    });

    if (node.description) {
      result.push(
        ...node.description.split('\n').map((d) => ({
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
    if (isFunctionProp(node)) {
      result.push(...extractFunction(node));
    } else if (hasProperties(node)) {
      result.push(...extractInterface(node));
    }
    return result;
  };
  const result: Node[] = [];
  if (files) {
    const props = parseFiles(files, {
      collectFilePath: true,
      extractNames: names,
      plugins: [propTypesPlugin, reactPlugin],
    });

    Object.keys(props).forEach((key) => {
      const prop = props[key];
      const nodes = extractTSType(prop);
      result.push(...nodes);
    });
  }
  return result;
};
