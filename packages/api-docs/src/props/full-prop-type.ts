import hash from 'object-hash';
import {
  PropType,
  isClassLikeProp,
  isUnionProp,
  isEnumProp,
  isArrayProp,
  isTupleProp,
  isIndexProp,
  isFunctionProp,
  HasPropertiesProp,
} from '@structured-types/api';
import { DocumentationNode } from '../types';
import { textNode } from '../blocks/text';
import { inlineCodeNode } from '../blocks/inline-code';
import { DocumentationConfig } from '../DocumentationConfig';
import { collapsibleNode } from '../blocks/collapsible';
import { blockNode } from '../blocks/block';
import { unionPropNodes } from './union-prop';
import { shortPropType, arrayPropNodes } from './short-prop-type';
import { tuplePropNodes } from './tuple-prop';
import { classPropNodes } from './class-prop';
import { indexPropNodes } from './index-prop';
import { functionPropNodes } from './function-prop';

export class PropTypeNodes {
  private config: DocumentationConfig = {} as DocumentationConfig;
  private cache: Record<string, DocumentationNode[]> = {};
  public init(config: DocumentationConfig): void {
    this.config = config;
  }

  public extractNamedType(prop: PropType): DocumentationNode[] {
    return this.extractType(prop, true);
  }

  public extractType(prop: PropType, named = false): DocumentationNode[] {
    const linkedProp = this.resolvedProp(prop);
    const typeNode = this.getType(linkedProp);
    let nameNode: DocumentationNode[] | undefined = undefined;
    if (named) {
      if (linkedProp.name && linkedProp.name !== linkedProp.type) {
        nameNode = [inlineCodeNode(`${linkedProp.name}`)];
        if (!linkedProp.optional) {
          nameNode.push(textNode('*'));
        }
      }
    }
    if (
      isClassLikeProp(linkedProp) &&
      !this.isLinkedProp(linkedProp) &&
      !!linkedProp.properties?.length
    ) {
      if (named) {
        return [this.collapsibleType(linkedProp, typeNode, nameNode)];
      } else {
        const propType = shortPropType(linkedProp, this.config);
        if (propType) {
          return [this.collapsibleType(linkedProp, typeNode, propType)];
        }
      }
    }
    return nameNode
      ? [blockNode([...nameNode, textNode(': '), ...typeNode])]
      : typeNode;
  }

  public resolvedProp(prop: PropType): PropType {
    if (prop.parent) {
      const key = prop.parent.token ? prop.parent.token : prop.parent.name;
      const parent = this.config.propLinks.getPropLink(key);
      if (parent && isClassLikeProp(parent)) {
        const p = parent.properties?.find((p) => p.name === prop.name);
        if (p) {
          return p;
        }
      }
    }
    return prop;
  }
  private collapsibleType(
    prop: HasPropertiesProp,
    typeProp: DocumentationNode[],
    nameNode: DocumentationNode[] | DocumentationNode | undefined,
  ): DocumentationNode {
    const name = Array.isArray(nameNode)
      ? nameNode
      : nameNode
      ? [nameNode]
      : [
          textNode(
            prop.properties?.length
              ? `...${prop.properties.length} properties`
              : 'expand',
          ),
        ];
    return collapsibleNode(typeProp, name);
  }
  private isLinkedProp(prop: PropType): boolean {
    const key = prop.token ? prop.token : prop.name;

    if (key) {
      const linkedProp = this.config.propLinks.getPropLink(key);
      if (linkedProp && linkedProp !== prop) {
        return true;
      }
    }
    return false;
  }
  private getType(prop: PropType): DocumentationNode[] {
    const propName = typeof prop.type === 'string' ? prop.type : prop.name;
    const token = prop.token;
    let linkedProp: PropType | undefined;

    if (typeof propName === 'string') {
      linkedProp = this.config.propLinks.getPropLink(propName);
    }

    // Prefer token lookup
    if (typeof token === 'string') {
      linkedProp = this.config.propLinks.getPropLink(token);
    }

    if (linkedProp && propName && token) {
      return [
        this.config.propLinks.propLink({
          name: propName,
          loc: linkedProp.loc,
          token: linkedProp.token,
        }),
      ];
    }

    return this.extractTypeNode(prop);
  }

  private propToHash(prop: PropType): string {
    return hash(prop);
  }
  private extractTypeNode(prop: PropType): DocumentationNode[] {
    const hash = this.propToHash(prop);
    if (this.cache[hash]) {
      return this.cache[hash];
    }
    this.cache[hash] = [];
    const convertType = () => {
      if (
        typeof prop.type === 'string' &&
        this.config.options.collapsed?.includes(prop.type)
      ) {
        const propType = shortPropType(prop, this.config);
        if (propType) {
          return propType;
        }
      } else if (isUnionProp(prop) || isEnumProp(prop)) {
        return unionPropNodes(prop, this.config);
      } else if (isClassLikeProp(prop)) {
        return classPropNodes(prop, this.config);
      } else if (isArrayProp(prop)) {
        return arrayPropNodes(prop, this.config);
      } else if (isTupleProp(prop)) {
        return tuplePropNodes(prop, this.config);
      } else if (isIndexProp(prop)) {
        return indexPropNodes(prop, this.config);
      } else if (isFunctionProp(prop)) {
        return functionPropNodes(prop, this.config);
      }
      const propType = shortPropType(prop, this.config);
      if (propType) {
        return propType;
      }
      return [];
    };
    const result = convertType();
    this.cache[hash] = result;
    return result;
  }
}
