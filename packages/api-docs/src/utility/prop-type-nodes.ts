import jsStringEscape from 'js-string-escape';
import {
  PropType,
  isClassLikeProp,
  isUnionProp,
  isEnumProp,
  isArrayProp,
  HasPropertiesProp,
  isStringProp,
  PropKind,
  isTupleProp,
  isIndexProp,
  isFunctionProp,
} from '@structured-types/api/types';
import {
  DocumentationNode,
  DocumentationNodeWithChildren,
  isNodeWithValue,
} from '../types';
import { textNode } from '../blocks/text';
import { inlineCodeNode } from '../blocks/inline-code';

import { DocumentationConfig } from '../DocumentationConfig';
import { collapsibleNode } from '../blocks/collapsible';
import { hasValue } from '@structured-types/api';
import { blockNode } from '../blocks/block';
import { spanNode } from '../blocks/span';

export class PropTypeNodes {
  private config: DocumentationConfig = {} as DocumentationConfig;
  public init(config: DocumentationConfig): void {
    this.config = config;
  }
  public extractPropType(
    prop: PropType,
    nameNode?: DocumentationNode[],
    showValue?: boolean,
  ): DocumentationNode {
    if (prop.parent) {
      const parent = this.config.propLinks.getPropLink(prop.parent.name);
      if (parent && isClassLikeProp(parent)) {
        const p = parent.properties?.find((p) => p.name === prop.name);
        if (p) {
          return this.extractTypeNode(p, nameNode, showValue);
        }
      }
    }
    return this.extractTypeNode(prop, nameNode, showValue);
  }

  private getPropProperties(prop: HasPropertiesProp): {
    properties: PropType[];
  } {
    if (prop.properties) {
      return {
        properties: prop.properties,
      };
    }
    return {
      properties: [],
    };
  }

  private inlineType(prop: PropType): DocumentationNode | undefined {
    let typeNode: DocumentationNode | undefined = undefined;
    let nameNode: DocumentationNode[] | undefined = undefined;
    if (prop.name && prop.name !== prop.type) {
      nameNode = [inlineCodeNode(`${prop.name}`), textNode(': ')];
    }
    if (typeof prop.type === 'string') {
      if (this.config.propLinks.getPropLink(prop.type)) {
        typeNode = this.config.propLinks.propLink({
          name: prop.type,
          loc: prop.loc,
        });
      } else {
        typeNode = this.extractPropType(prop, nameNode);
      }
    } else if (prop.kind) {
      typeNode = this.extractPropType(prop, nameNode);
    }
    return typeNode;
  }
  private typeNode(
    prop: PropType,
    showValue = true,
  ): DocumentationNode | undefined {
    if (typeof prop.type === 'string') {
      if (typeof prop.parent === 'string') {
        return spanNode([
          this.config.propLinks.propLink(prop.parent),
          textNode(`.${prop.type}`),
        ]);
      }
      return this.config.propLinks.propLink({ name: prop.type, loc: prop.loc });
    }
    if (showValue && hasValue(prop)) {
      const value = isStringProp(prop)
        ? `"${jsStringEscape(prop.value)}"`
        : prop.value === undefined
        ? 'undefined'
        : prop.value.toString();
      return textNode(value);
    }
    if (prop.kind) {
      const result: DocumentationNode[] = [
        inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`),
      ];
      if (
        typeof prop.parent === 'string' &&
        this.config.propLinks.getPropLink(prop.parent)
      ) {
        const link = this.config.propLinks.propLink(prop.parent);
        if (link) {
          result.push(textNode(` (`));
          result.push(link);
          result.push(textNode(`)`));
        }
      }
      return spanNode(result);
    }
    if (prop.name) {
      return textNode(prop.name);
    }

    return undefined;
  }

  private extractTypeNode(
    prop: PropType,
    nameNode?: DocumentationNode[],
    showValue = false,
  ): DocumentationNode {
    const unionSeparator = ' | ';
    const enumSeparator = ' | ';
    const name = nameNode ? nameNode : [];
    if (
      typeof prop.type === 'string' &&
      this.config.options.collapsed?.includes(prop.type)
    ) {
      return blockNode(
        [...name, this.typeNode(prop, showValue)].filter(
          Boolean,
        ) as DocumentationNode[],
      );
    } else if (isUnionProp(prop) || isEnumProp(prop)) {
      const separator = isUnionProp(prop) ? unionSeparator : enumSeparator;
      const { properties } = this.getPropProperties(prop);
      const nodes = properties.reduce((acc: DocumentationNode[], t, idx) => {
        const r = [...acc, this.extractPropType(t, undefined, true)];
        if (idx < properties.length - 1) {
          r.push(textNode(separator));
        }
        return r;
      }, name);

      return blockNode(nodes);
    } else if (isClassLikeProp(prop)) {
      const propName = typeof prop.type === 'string' ? prop.type : prop.name;
      const result: DocumentationNode[] = [];
      const { properties } = this.getPropProperties(prop);
      if (
        typeof propName === 'string' &&
        this.config.propLinks.getPropLink(propName)
      ) {
        result.push(
          this.config.propLinks.propLink({
            name: propName,
            loc: prop.loc,
          }),
        );
      } else if (properties.length) {
        const typeArguments: DocumentationNode[] = properties.reduce(
          (acc: DocumentationNode[], p: PropType) => {
            return [...acc, this.inlineType(p)].filter(
              Boolean,
            ) as DocumentationNode[];
          },
          [],
        );
        return collapsibleNode(
          typeArguments,
          nameNode || [textNode(`...${properties.length} properties`)],
        );
      } else if (prop.generics?.length) {
        const genericArguments: DocumentationNode[] | undefined =
          prop.generics?.reduce(
            (acc: DocumentationNode[], p: PropType, idx: number) => {
              const result = [...acc, this.inlineType(p)].filter(
                Boolean,
              ) as DocumentationNode[];
              if (prop.generics && idx < prop.generics.length - 1) {
                result.push(textNode(', '));
              }
              return result;
            },
            name,
          );
        result.push(...name);
        const typeNode = this.typeNode(prop);
        if (typeNode) {
          result.push(typeNode);
        }
        if (genericArguments?.length) {
          result.push(...[textNode('<'), ...genericArguments, textNode('>')]);
        }
      } else if (propName) {
        result.push(textNode(propName));
      }
      return blockNode(result);
    } else if (isArrayProp(prop)) {
      const { properties } = this.getPropProperties(prop);
      const elements = properties.reduce(
        (acc: DocumentationNode[], p: PropType, idx: number) => {
          const result = [this.extractPropType(p)];
          if (idx < properties.length - 1) {
            result.push(textNode(', '));
          }
          return [...acc, ...result];
        },
        name,
      ) as DocumentationNodeWithChildren[];

      const multiProps =
        elements.length &&
        ((elements[0].children && elements[0].children.length > 1) ||
          (elements.length > 2 &&
            isNodeWithValue(elements[1]) &&
            (elements[1].value === unionSeparator ||
              elements[1].value === enumSeparator)));
      if (multiProps) {
        elements.splice(
          0,
          0,
          textNode('(') as unknown as DocumentationNodeWithChildren,
        );
        elements.push(
          textNode(')') as unknown as DocumentationNodeWithChildren,
        );
      }
      elements.push(textNode('[]') as unknown as DocumentationNodeWithChildren);
      return blockNode(elements);
    } else if (isTupleProp(prop)) {
      const { properties } = this.getPropProperties(prop);
      const nodes = [
        textNode('['),
        ...properties.reduce(
          (acc: DocumentationNode[], p: PropType, idx: number) => {
            const result = [this.extractPropType(p)];
            if (idx < properties.length - 1) {
              result.push(textNode(', '));
            }
            return [...acc, ...result];
          },
          name,
        ),
      ];
      nodes.push(textNode(']'));
      return blockNode(nodes);
    } else if (isIndexProp(prop)) {
      const results: DocumentationNode[] = [
        textNode('['),
        this.extractPropType(prop.index),
        textNode(']'),
      ];
      if (prop.prop) {
        results.push(textNode(': '));
        results.push(this.extractPropType(prop.prop));
      }
      return blockNode([...name, ...results]);
      //return this.extractFunctionDeclaration(prop);
    } else if (isFunctionProp(prop)) {
      const result: DocumentationNode[] = [textNode('(')];
      if (prop.parameters) {
        for (let i = 0; i < prop.parameters.length; i += 1) {
          const p = prop.parameters[i];
          if (i > 0) {
            result.push(textNode(', '));
          }
          let nameNode: DocumentationNode[] | undefined = undefined;
          if (p.name) {
            nameNode = [inlineCodeNode(p.name)];

            if (!p.optional) {
              nameNode.push(textNode('*'));
            }
            nameNode.push(textNode(': '));
          }
          result.push(this.extractPropType(p, nameNode));
          if (!p.name && !p.optional) {
            result.push(textNode('*'));
          }
        }
      }
      result.push(textNode(')'));
      result.push(textNode(' => '));
      if (prop.returns) {
        result.push(this.extractPropType(prop.returns, [textNode('returns')]));
      } else {
        result.push(textNode('void'));
      }
      return blockNode([...name, ...result]);
    }
    return blockNode(
      [...name, this.typeNode(prop, showValue)].filter(
        Boolean,
      ) as DocumentationNode[],
    );
  }
}
