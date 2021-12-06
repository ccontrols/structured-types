import { PropType, isClassLikeProp } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { textNode } from '../blocks/text';
import { DocumentationConfig } from '../DocumentationConfig';

export const extendsSection = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (isClassLikeProp(prop) && prop.extends?.length) {
    const extendsList = prop.extends.reduce(
      (acc: DocumentationNode[], extendsProp, idx: number) => {
        const result: DocumentationNode[] = [
          config.propLinks.propLink(extendsProp),
        ];
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
