import { PropType } from '@structured-types/api/types';
import { ColumnObject, DocumentationOptions } from './types';
import { PropLinks } from './utility/prop-links';
import { PropTypeNodes } from './utility/prop-type-nodes';

export type DocumentationConfig = {
  columns: ColumnObject;
  propLinks: PropLinks;
  helpers: Record<string, PropType>;
  options: DocumentationOptions;
  propTypes: PropTypeNodes;
};
