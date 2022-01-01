import { PropType, PropKind } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { headingNode } from '../blocks/heading';
import { boldNode } from '../blocks/bold';
import { inlineCodeNode } from '../blocks/inline-code';
import { DocumentationConfig } from '../DocumentationConfig';
import { getPropValue } from '../utility/prop-value';
import { textNode } from '../blocks/text';

export const typeSection = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (prop.kind) {
    const result = [
      inlineCodeNode(
        `${prop.extension ? `${prop.extension} ` : ''}${
          prop.async ? 'async ' : ''
        }${PropKind[prop.kind].toLowerCase()}`,
      ),
    ];
    const value = getPropValue(prop);
    if (typeof value === 'string') {
      result.push(textNode(` = ${value}`));
    }
    return [boldNode(result)];
  } else if (typeof prop.type === 'string') {
    return [
      headingNode(
        [config.propLinks.propLink({ name: prop.type, loc: prop.loc })],
        3,
      ),
    ];
  }
  return undefined;
};
