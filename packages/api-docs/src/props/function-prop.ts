import { FunctionProp } from '@structured-types/api';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { blockNode } from '../blocks/block';
import { boldNode } from '../blocks/bold';

export const functionPropNodes = (
  prop: FunctionProp,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const result: DocumentationNode[] = [
    blockNode([boldNode('function'), textNode(' (')]),
  ];
  if (prop.parameters) {
    prop.parameters.forEach((p) => {
      result.push(...config.propTypes.extractNamedType(p));
    });
  }
  result.push(textNode(')'));
  if (prop.returns) {
    const propReturns = {
      name: 'returns',
      ...prop.returns,
    };
    result.push(textNode(' => '));
    result.push(...config.propTypes.extractType(propReturns));
  } else {
    result.push(textNode('=> void'));
  }
  return result;
};
