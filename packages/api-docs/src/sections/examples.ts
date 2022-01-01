import { PropType } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { paragraphNode } from '../blocks/paragraph';
import { codeNode } from '../blocks/code';

export const examplesSection = (
  prop: PropType,
): DocumentationNode[] | undefined => {
  if (prop.examples) {
    const result: DocumentationNode[] = [];
    const codeExamples = prop.examples.filter((e) => e.content);
    codeExamples.forEach((example) => {
      if (example.content) {
        result.push(paragraphNode([codeNode(example.content)]));
      }
    });
    return result;
  }
  return undefined;
};
