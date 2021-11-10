import jsStringEscape from 'js-string-escape';
import {
  PropType,
  isClassLikeProp,
  isUnionProp,
  isEnumProp,
  isArrayProp,
  HasPropertiesProp,
  HasValueProp,
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

export class PropTypeNodes {
  private config: DocumentationConfig = {} as DocumentationConfig;
  public init(config: DocumentationConfig): void {
    this.config = config;
  }
  public extractPropType(
    prop: PropType,
    showValue?: boolean,
  ): DocumentationNode[] {
    if (prop.parent) {
      const parent = this.config.propLinks.getPropLink(prop.parent.name);
      if (parent && isClassLikeProp(parent)) {
        const p = parent.properties?.find((p) => p.name === prop.name);
        if (p) {
          return this.extractType(p, showValue);
        }
      }
    }
    return this.extractType(prop, showValue);
  }

  getPropProperties(prop: HasPropertiesProp): {
    properties: PropType[];
    more: DocumentationNode | undefined;
  } {
    const { maxProps = 30 } = this.config.options;
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

  private inlineType(prop: PropType): DocumentationNode[] {
    let typeNode: DocumentationNode[] | undefined = undefined;
    if (typeof prop.type === 'string') {
      if (this.config.propLinks.getPropLink(prop.type)) {
        typeNode = this.config.propLinks.propLink({
          name: prop.type,
          loc: prop.loc,
        });
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
        return [
          ...this.config.propLinks.propLink(prop.parent),
          textNode(`.${prop.type}`),
        ];
      }
      return this.config.propLinks.propLink({ name: prop.type, loc: prop.loc });
    }
    if (showValue && (prop as HasValueProp).value !== undefined) {
      const value = isStringProp(prop)
        ? `"${jsStringEscape(prop.value)}"`
        : (prop as HasValueProp).value.toString();
      return [textNode(value)];
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
        if (link.length) {
          result.push(textNode(` (`));
          result.push(...link);
          result.push(textNode(`)`));
        }
      }
      return result;
    }
    if (prop.name) {
      return [textNode(prop.name)];
    }

    return [];
  }
  extractType(prop: PropType, showValue = false): DocumentationNode[] {
    const unionSeparator = ' | ';
    const enumSeparator = ' | ';
    if (
      typeof prop.type === 'string' &&
      this.config.options.collapsed?.includes(prop.type)
    ) {
      return this.typeNode(prop, showValue);
    } else if (isUnionProp(prop) || isEnumProp(prop)) {
      const separator = isUnionProp(prop) ? unionSeparator : enumSeparator;
      const { properties, more } = this.getPropProperties(prop);
      const nodes = properties.reduce((acc: DocumentationNode[], t, idx) => {
        const r = [...acc, ...this.extractPropType(t, true)];
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
      if (
        typeof propName === 'string' &&
        this.config.propLinks.getPropLink(propName)
      ) {
        result.push(
          ...this.config.propLinks.propLink({ name: propName, loc: prop.loc }),
        );
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
    return this.typeNode(prop, showValue);
  }
}
