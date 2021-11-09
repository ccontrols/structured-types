import { PropType, isClassLikeProp } from '@structured-types/api/types';
import { DocumentationNode } from '../types';
import { textNode } from '../blocks/text';
import { DocumentationConfig } from '../DocumentationConfig';

export const extendsSection = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (isClassLikeProp(prop) && prop.extends?.length) {
    const extendsList = prop.extends.reduce(
      (acc: DocumentationNode[], key: string, idx: number) => {
        const p = config.propLinks.getPropLink(key);
        let result: DocumentationNode[];
        if (p) {
          result = config.propTypes.extractPropType(p);
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
    return extendsList;
  }
  return undefined;
};
