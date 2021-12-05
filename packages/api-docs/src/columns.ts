import { isEnumProp, PropType } from '@structured-types/api';
import { ColumnObject } from './types';

export const defaultColumns: ColumnObject = {
  name: { title: 'Name' },
  type: { title: 'Type' },
  parents: { title: 'Parent' },
  default: {
    title: (prop: PropType) => (isEnumProp(prop) ? 'Value' : 'Default'),
  },
  description: { title: 'Description' },
};
