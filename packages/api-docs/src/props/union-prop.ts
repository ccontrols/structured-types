import jsStringEscape from 'js-string-escape';
import {
  PropType,
  UnionProp,
  EnumProp,
  isUnionProp,
  hasValue,
  isStringProp,
  isUndefinedProp,
  isNullProp,
  isVoidProp,
} from '@structured-types/api/types';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { shortPropType } from './short-prop-type';
import { DocumentationConfig } from '../DocumentationConfig';
import { inlineCodeNode } from '../blocks/inline-code';

const getPropValue = (prop: PropType): string | undefined => {
  if (hasValue(prop) && prop.value !== undefined) {
    return isStringProp(prop)
      ? `"${jsStringEscape(prop.value)}"`
      : prop.value.toString();
  } else if (isNullProp(prop)) {
    return 'null';
  } else if (isUndefinedProp(prop)) {
    return 'undefined';
  } else if (isVoidProp(prop)) {
    return 'void';
  }
  return undefined;
};

export const unionPropNodes = (
  prop: UnionProp | EnumProp,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const unionSeparator = ' | ';
  const enumSeparator = ', ';

  const separator = isUnionProp(prop) ? unionSeparator : enumSeparator;
  const properties = prop.properties;
  if (properties) {
    const propsList = properties.reduce((acc: DocumentationNode[], p, idx) => {
      let propType: DocumentationNode[] | undefined = undefined;
      if (p.parent && p.name) {
        propType = [
          config.propLinks.propLink(p.parent),
          textNode('.'),
          config.propLinks.propLink({ name: p.name, loc: p.loc }),
        ];
      } else {
        const value = getPropValue(p);
        if (typeof value === 'string') {
          propType = [inlineCodeNode(value)];
        } else {
          const pt = shortPropType(p, config);
          if (pt) {
            propType = [pt];
          }
        }
      }
      if (propType) {
        const r = [...acc, ...propType];
        if (idx < properties.length - 1) {
          r.push(textNode(separator));
        }
        return r;
      }
      return acc;
    }, []);

    return propsList;
  }
  return [];
};
