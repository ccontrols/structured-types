import { isFunctionProp, PropType } from '@structured-types/api/types';
import { SectionObject } from './types';

export const defaultSections: SectionObject = {
  title: {},
  type: {},
  description: {},
  location: {},
  extends: { title: 'extends' },
  props: {
    title: (prop: PropType) =>
      isFunctionProp(prop) ? 'parameters' : 'properties',
  },
  examples: {
    title: (prop: PropType) =>
      prop.examples && prop.examples.length > 1 ? 'examples' : 'example',
  },
};
