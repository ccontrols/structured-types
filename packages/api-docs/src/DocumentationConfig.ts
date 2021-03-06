import { PropType } from '@structured-types/api';
import { ColumnObject, DocumentationOptions } from './types';
import { PropLinks } from './utility/prop-links';
import { PropTypeNodes } from './props/full-prop-type';

export type DocumentationConfig = {
  columns: ColumnObject;
  propLinks: PropLinks;
  helpers: Record<string, PropType>;
  options: DocumentationOptions;
  propTypes: PropTypeNodes;
};
