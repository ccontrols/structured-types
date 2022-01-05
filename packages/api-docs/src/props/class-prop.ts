import { PropType, ClassLikeProp } from '@structured-types/api';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { getGenerics } from './short-prop-type';
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
    const result: DocumentationNode[] = [];
    if (propName) {
      result.push(
        config.propLinks.propLink({
          name: propName,
          loc: prop.loc,
        }),
      );
    }
    result.push(...getGenerics(prop, config));
    return result;
  } else if (propName) {
    return [textNode(propName)];
  }
  return [];
};
