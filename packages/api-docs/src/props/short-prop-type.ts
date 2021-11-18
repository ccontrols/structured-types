import { PropType, PropKind } from '@structured-types/api/types';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { inlineCodeNode } from '../blocks/inline-code';

export const shortPropType = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode | undefined => {
  if (typeof prop.type === 'string') {
    return config.propLinks.propLink({
      name: prop.type,
      loc: prop.loc,
    });
  }
  if (prop.kind) {
    return inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`);
  }
  return undefined;
};
