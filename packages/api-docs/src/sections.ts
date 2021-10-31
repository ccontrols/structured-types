import { PropType } from '@structured-types/api';
import { SectionObject } from './types';

export const defaultSections: SectionObject = {
  title: {},
  type: {},
  description: {},
  location: {},
  props: { title: 'properties' },
  examples: {
    title: (prop: PropType) =>
      prop.examples && prop.examples.length > 1 ? 'examples' : 'example',
  },
};
