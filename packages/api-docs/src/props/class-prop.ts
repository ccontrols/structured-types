import { PropType, ClassLikeProp } from '@structured-types/api/types';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { shortPropType } from './short-prop-type';

export const classPropNodes = (
  prop: ClassLikeProp,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const properties = prop.properties;
  const propName = typeof prop.type === 'string' ? prop.type : prop.name;
  if (properties) {
    const typeArguments: DocumentationNode[] = properties.reduce(
      (acc: DocumentationNode[], p: PropType) => {
        return [...acc, ...config.propTypes.extractNamedType(p)];
      },
      [],
    );
    return typeArguments;
  } else if (prop.generics) {
    const generics = prop.generics;
    const result: DocumentationNode[] = [];
    if (propName) {
      result.push(
        config.propLinks.propLink({
          name: propName,
          loc: prop.loc,
        }),
      );
    }
    result.push(textNode('<'));
    generics.forEach((p, idx) => {
      const propType = shortPropType(p, config);
      if (propType) {
        result.push(propType);
        if (idx < generics.length - 1) {
          result.push(textNode(', '));
        }
      }
    });
    result.push(textNode('>'));
    return result;
  } else if (propName) {
    return [textNode(propName)];
  }
  return [];
};
