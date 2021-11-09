import { PropType, PropKind } from '@structured-types/api/types';
import { DocumentationNode } from '../types';
import { headingNode } from '../blocks/heading';
import { boldNode } from '../blocks/bold';
import { inlineCodeNode } from '../blocks/inline-code';
import { DocumentationConfig } from '../DocumentationConfig';

export const typeSection = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (prop.kind) {
    return [
      boldNode([
        inlineCodeNode(
          `${prop.extension ? `${prop.extension} ` : ''}${PropKind[
            prop.kind
          ].toLowerCase()}`,
        ),
      ]),
    ];
  } else if (typeof prop.type === 'string') {
    return [
      headingNode(
        config.propLinks.propLink({ name: prop.type, loc: prop.loc }),
        3,
      ),
    ];
  }
  return undefined;
};
