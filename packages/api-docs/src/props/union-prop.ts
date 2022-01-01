import { UnionProp, EnumProp, isUnionProp } from '@structured-types/api';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { shortPropType } from './short-prop-type';
import { DocumentationConfig } from '../DocumentationConfig';
import { inlineCodeNode } from '../blocks/inline-code';
import { getPropValue } from '../utility/prop-value';

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
