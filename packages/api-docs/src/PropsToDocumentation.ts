/* eslint-disable prefer-spread */
import path from 'path';
import jsStringEscape from 'js-string-escape';
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
  TypeProp,
  HasValueProp,
  PropTypes,
} from '@structured-types/api';
import { getRepoPath } from './package-info/package-info';
import { createPropsTable, createPropsRow, PropItem } from './blocks/table';
import {
  DocumentationNode,
  SectionNames,
  ColumnNames,
  DocumentationOptions,
  NodeKind,
  textNode,
  inlineCodeNode,
  codeNode,
  HeadingNode,
  paragraphNode,
  LinkNode,
  DocumentationNodeWithChildren,
  italicNode,
  boldNode,
} from './types';

export class PropsToDocumentation {
  private collapsed: string[] = [];
  private sections: SectionNames[] = ['all'];
  private columns: ColumnNames[] = ['all'];
  private skipInherited = false;
  private topLevelProps: Record<string, PropType> = {};
  private helpers: Record<string, PropType> = {};
  private repoNames: {
    [key: string]: {
      repo?: string;
      filePath?: string;
      packageName?: string;
      relativePath?: string;
    };
  } = {};

  private extractPropTable(
    props: PropType[],
    title?: string,
  ): ReturnType<typeof createPropsTable> {
    let parentProp: EnumProp | undefined = undefined;
    const addParentProp = (prop: PropType) => {
      if (!parentProp) {
        parentProp = {
          name: '...props',
          kind: PropKind.Enum,
          properties: [{ kind: PropKind.Type, type: prop.parent }],
          optional: true,
        };
      } else {
        if (!parentProp.properties?.find((p) => p.type === prop.parent)) {
          parentProp.properties?.push({
            kind: PropKind.Type,
            type: prop.parent,
          });
        }
      }
    };
    const consolidatedProps = props.filter((prop) => {
      if (typeof prop.parent === 'string') {
        if (this.skipInherited || this.collapsed.includes(prop.parent)) {
          addParentProp(prop);
          return false;
        }
        for (const collapsedProp of this.collapsed) {
          const helperParent = this.helpers[collapsedProp];
          if (helperParent && hasProperties(helperParent)) {
            const helpProp = helperParent.properties?.find(
              (p) => p.name === prop.name && p.parent === prop.parent,
            );
            if (helpProp) {
              addParentProp({ ...prop, parent: collapsedProp });
              return false;
            }
          }
        }
      }
      return true;
    });
    const allProps = parentProp
      ? [...consolidatedProps, parentProp]
      : consolidatedProps;
    const items: PropItem[] = allProps.map((prop) =>
      this.configurePropItem({
        name: `${
          prop.name
            ? prop.kind === PropKind.Rest
              ? `...${prop.name}`
              : prop.name
            : ''
        }`,
        isOptional: prop.optional,
        parent: prop.parent ? this.propLink(prop.parent) : undefined,

        type: this.extractPropType(prop, { extractProperties: true }),
        description: prop.description,
        value: (prop as HasValueProp).value,
      } as PropItem),
    );
    return createPropsTable(items, title);
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
    const enabledColumn = (name: ColumnNames): boolean => {
      return this.columns.includes(name) || this.columns.includes('all');
    };
    return {
      name: enabledColumn('name') ? item.name : undefined,
      isOptional: item.isOptional,
      parent: enabledColumn('parents') ? item.parent : undefined,
      type: enabledColumn('type') ? item.type : undefined,
      value: enabledColumn('value') ? item.value : undefined,
      description: enabledColumn('description') ? item.description : undefined,
    };
  }
  private extractFunction(
    prop: FunctionProp,
    _extractTable = true,
  ): DocumentationNode[] {
    if (prop.parameters) {
      const { propsTable, table, visibleColumns } = this.extractPropTable(
        prop.parameters,
        'parameters',
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
              name: 'returns',
              isOptional: true,
              parent: prop.returns.parent
                ? this.propLink(prop.returns.parent)
                : undefined,
              type: this.extractPropType(prop.returns),
              description: prop.returns.description,
            }),
            visibleColumns,
          ),
        );
      }
      return propsTable;
    }
    return [];
  }
  private getPropLink = (key: string) => {
    const nameParts = key.split('.');
    return this.topLevelProps[nameParts[nameParts.length - 1]];
  };
  private extractInterface(prop: InterfaceProp): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    if (prop.name) {
      if (prop.extends?.length) {
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
        result.push(paragraphNode([textNode('extends '), ...extendsList]));
      }
      if (isUnionProp(prop)) {
        result.push(...this.extractPropType(prop));
      } else if (hasProperties(prop) && prop.properties) {
        const { propsTable } = this.extractPropTable(
          prop.properties,
          'properties',
        );
        result.push(...propsTable);
      }
    }
    return result;
  }

  private propLink(type?: string): DocumentationNode[] {
    const typeText = [
      {
        kind: NodeKind.InlineCode,
        value: type,
      },
    ];
    if (typeof type === 'string') {
      const link = this.getPropLink(type);
      if (link) {
        return [
          {
            kind: NodeKind.Link,
            url: `#${link.name?.toLowerCase()}`,
            children: typeText,
          } as LinkNode,
        ];
      }
    }
    return typeText;
  }

  private inlineType(prop: PropType): DocumentationNode[] {
    let typeNode: DocumentationNode[] | undefined = undefined;
    if (typeof prop.type === 'string') {
      typeNode = this.propLink(prop.type);
    } else if (prop.kind) {
      typeNode = [inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`)];
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
      return this.propLink(prop.type);
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
    options?: { showValue?: boolean; extractProperties?: boolean },
  ): DocumentationNode[] {
    if (prop.parent) {
      const parent = this.getPropLink(prop.parent);
      if (parent && isClassLikeProp(parent)) {
        const p = parent.properties?.find((p) => p.name === prop.name);
        if (p) {
          return this.extractType(p, options);
        }
      }
    }
    return this.extractType(prop, options);
  }
  private extractType(
    prop: PropType,
    options?: { showValue?: boolean },
  ): DocumentationNode[] {
    const { showValue = false } = options || {};
    if (typeof prop.type === 'string' && this.collapsed?.includes(prop.type)) {
      return this.typeNode(prop, showValue);
    } else if ((isUnionProp(prop) || isEnumProp(prop)) && prop.properties) {
      const separator = isUnionProp(prop) ? ' | ' : ' & ';
      return prop.properties?.reduce((acc: DocumentationNode[], t, idx) => {
        const r = [...acc, ...this.extractPropType(t, { showValue: true })];
        if (prop.properties && idx < prop.properties.length - 1) {
          r.push(textNode(separator));
        }
        return r;
      }, []);
    } else if (isClassLikeProp(prop)) {
      const propName = typeof prop.type === 'string' ? prop.type : prop.name;
      const result: DocumentationNode[] = [];
      if (typeof propName === 'string' && this.getPropLink(propName)) {
        result.push(...this.propLink(propName));
      } else if (prop.properties?.length) {
        const typeArguments: DocumentationNode[] = prop.properties.reduce(
          (acc: DocumentationNode[], p: PropType, idx: number) => {
            const result = [...acc, ...this.inlineType(p)];
            if (prop.properties && idx < prop.properties.length - 1) {
              result.push(textNode(', '));
            }
            return result;
          },
          [],
        );

        result.push(textNode('{ '));
        result.push(...typeArguments);
        result.push(textNode(' }'));
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
    } else if (isArrayProp(prop) && prop.properties) {
      const elements = prop.properties.reduce(
        (acc: DocumentationNode[], p: PropType, idx: number) => {
          const result = this.extractPropType(p);
          if (prop.properties && idx < prop.properties.length - 1) {
            result.push(textNode(', '));
          }
          return [...acc, ...result];
        },
        [],
      ) as DocumentationNodeWithChildren[];
      const multiProps =
        elements.length &&
        elements[0].children &&
        elements[0].children.length > 1;
      if (multiProps) {
        elements.splice(0, 0, textNode('('));
        elements.push(textNode(')'));
      }
      elements.push(textNode('[]'));
      return elements;
    } else if (isTupleProp(prop) && prop.properties) {
      return [
        textNode('['),
        ...prop.properties.reduce(
          (acc: DocumentationNode[], p: PropType, idx: number) => {
            const result = this.extractPropType(p);
            if (prop.properties && idx < prop.properties.length - 1) {
              result.push(textNode(', '));
            }
            return [...acc, ...result];
          },
          [],
        ),
        { kind: NodeKind.Text, value: ']' },
      ];
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
    const { filePath } = prop;
    if (filePath) {
      if (!this.repoNames[filePath]) {
        this.repoNames[filePath] = getRepoPath(path.resolve(filePath));
      }

      if (this.repoNames[filePath]) {
        const { repo, relativePath, packageName } = this.repoNames[filePath];
        const fileLocation = repo || filePath;
        if (fileLocation) {
          const { line } = prop.loc || {};
          const sourceLocation = filePath.includes('node_modules')
            ? fileLocation
            : `${fileLocation}${line ? `#L${line}` : ''}`;
          return [
            paragraphNode([
              italicNode([
                textNode('defined in '),
                {
                  kind: NodeKind.Link,
                  url: sourceLocation,
                  children: [textNode(`${packageName}/${relativePath}`)],
                } as LinkNode,
              ]),
            ]),
          ];
        }
      }
    }
    return [];
  }
  private extractPropDefinition(prop: PropType): DocumentationNode {
    const definition: Omit<DocumentationNode, 'children'> & {
      children: DocumentationNode[];
    } = {
      kind: NodeKind.Paragraph,
      children: [],
    };

    if (prop.kind) {
      definition.children.push(
        boldNode([
          inlineCodeNode(
            `${prop.extension ? `${prop.extension} ` : ''}${PropKind[
              prop.kind
            ].toLowerCase()}`,
          ),
        ]),
      );
    } else if (typeof prop.type === 'string') {
      definition.children.push(boldNode(this.propLink(prop.type)));
    }
    const loc = this.getSourceLocation(prop);
    if (loc.length) {
      definition.children.push(textNode(' '));
      definition.children.push(...loc);
    }

    return definition;
  }
  private generateSection(section: SectionNames): boolean {
    return this.sections.includes(section) || this.sections.includes('all');
  }

  private extractTSType(prop: PropType): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    if (this.generateSection('title') && prop.name) {
      result.push({
        kind: NodeKind.Heading,
        depth: 2,
        children: [textNode(prop.name)],
      } as HeadingNode);
    }
    if (this.generateSection('location')) {
      result.push(this.extractPropDefinition(prop));
    }
    if (prop.description && this.generateSection('description')) {
      result.push(
        ...prop.description.split('\n').map((d) => ({
          kind: NodeKind.Paragraph,
          children: [
            {
              kind: NodeKind.Text,
              value: d,
            },
          ],
        })),
      );
    }
    if (this.generateSection('props')) {
      if (isFunctionProp(prop)) {
        result.push(...this.extractFunction(prop));
      } else if (hasProperties(prop)) {
        result.push(...this.extractInterface(prop));
      }
    }
    if (prop.examples && this.generateSection('examples')) {
      const codeExamples = prop.examples.filter((e) => e.content);
      result.push(
        paragraphNode([
          boldNode(`example${codeExamples.length > 1 ? 's' : ''}`),
        ]),
      );

      codeExamples.forEach((example) => {
        if (example.content) {
          result.push(codeNode(example.content));
        }
      });
    }
    return result;
  }

  public extract(
    props: PropTypes,
    options: DocumentationOptions = {},
  ): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    const {
      collapsed = [],
      extensions,
      visible,
      sections = ['all'],
      columns = ['all'],
      skipInherited = false,
      overrides = {},
    } = options;

    this.collapsed = collapsed;
    this.sections = sections;
    this.columns = columns;
    this.skipInherited = skipInherited;

    const filterProps = (prop: PropType): PropType | undefined => {
      const transform = (p: PropType): PropType => {
        if (p.name && overrides[p.name] && hasProperties(p)) {
          const o = overrides[p.name];
          return {
            ...p,
            properties: p.properties?.map((pp) =>
              pp.name && o[pp.name] ? { ...pp, ...o[pp.name] } : pp,
            ),
          } as TypeProp;
        }
        return p;
      };
      if (Array.isArray(extensions)) {
        if (
          typeof prop.extension === 'string' &&
          extensions.includes(prop.extension)
        ) {
          return transform(prop);
        }
        return undefined;
      }
      if (Array.isArray(visible)) {
        if (typeof prop.name === 'string' && visible.includes(prop.name)) {
          return transform(prop);
        }
        return undefined;
      }
      return transform(prop);
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
      const nodes = this.extractTSType(prop);
      result.push(...nodes);
    });
    return result;
  }
}
