import { isFunctionProp, isUnionProp, PropType } from '@structured-types/api';
import { SectionObject } from './types';

export const defaultSections: SectionObject = {
  title: {},
  type: {},
  description: {},
  location: {},
  extends: { title: 'extends' },
  props: {
    title: (prop: PropType) => {
      if (isFunctionProp(prop)) {
        return 'parameters';
      } else if (isUnionProp(prop)) {
        return 'values';
      }
      return 'properties';
    },
  },
  examples: {
    title: (prop: PropType) =>
      prop.examples && prop.examples.length > 1 ? 'examples' : 'example',
  },
};
