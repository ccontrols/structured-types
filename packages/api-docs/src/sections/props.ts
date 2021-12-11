import {
  InterfaceProp,
  isUnionProp,
  PropType,
  hasProperties,
  isFunctionProp,
} from '@structured-types/api';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { propTable } from '../utility/props-table';
import { propFunction } from '../utility/prop-function';
import { unionPropNodes } from '../props/union-prop';

const extractClassLike = (
  prop: InterfaceProp,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (prop.name && prop.properties?.length) {
    const result: DocumentationNode[] = [];
    if (isUnionProp(prop)) {
      result.push(...unionPropNodes(prop, config));
    } else if (hasProperties(prop)) {
      const { propsTable } = propTable(prop, prop.properties, config);
      result.push(...propsTable);
    }
    return result;
  }
  return undefined;
};
export const getPropsTable = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (isFunctionProp(prop)) {
    return propFunction(prop, config);
  } else if (hasProperties(prop)) {
    return extractClassLike(prop, config);
  }
  return undefined;
};
