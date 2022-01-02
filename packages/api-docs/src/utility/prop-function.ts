import { PropKind, FunctionProp } from '@structured-types/api';
import { DocumentationConfig } from '../DocumentationConfig';
import { DocumentationNode } from '../types';
import { propTable } from './props-table';

export const propFunction = (
  prop: FunctionProp,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  const props = prop.parameters ? [...prop.parameters] : [];
  if (prop.returns && prop.returns.kind !== PropKind.Void) {
    props.push({ ...prop.returns, name: 'returns' });
  }
  return propTable(prop, config, props);
};
