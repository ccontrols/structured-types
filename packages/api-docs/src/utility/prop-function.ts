import { PropKind, FunctionProp } from '@structured-types/api/types';
import { inlineCodeNode } from '../blocks/inline-code';
import { createPropsRow } from '../blocks/table';
import { DocumentationConfig } from '../DocumentationConfig';
import { DocumentationNode } from '../types';
import { configurePropItem, propTable } from './props-table';

export const propFunction = (
  prop: FunctionProp,
  config: DocumentationConfig,
): DocumentationNode[] | undefined => {
  if (prop.parameters) {
    const { propsTable, table, visibleColumns } = propTable(
      prop,
      prop.parameters,
      config,
    );
    if (
      table &&
      table.children &&
      prop.returns &&
      prop.returns.kind !== PropKind.Void
    ) {
      table.children.push(
        createPropsRow(
          configurePropItem(
            {
              name: [inlineCodeNode('returns')],
              parents: prop.returns.parent
                ? config.propLinks.propLink(prop.returns.parent)
                : undefined,
              type: config.propTypes.extractPropType(prop.returns),
              description: prop.returns.description,
              default: undefined,
              prop,
            },
            config,
          ),
          config.columns,
          visibleColumns,
        ),
      );
    }
    return propsTable;
  }
  return undefined;
};
