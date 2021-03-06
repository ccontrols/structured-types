import {
  PropKind,
  PropType,
  EnumProp,
  hasProperties,
  isIndexProp,
} from '@structured-types/api';
import { emphasisNode } from '../blocks/emphasis';
import { createPropsTable, PropItem } from '../blocks/table';
import { DocumentationConfig } from '../DocumentationConfig';
import { ColumnName } from '../types';
import { getPropValue } from './prop-value';

export const propTable = (
  prop: PropType,
  config: DocumentationConfig,
  rows?: PropType[],
): ReturnType<typeof createPropsTable> => {
  let parentProp: EnumProp | undefined = undefined;
  const addParentProp = (prop: PropType) => {
    if (prop.parent) {
      if (!parentProp) {
        parentProp = {
          name: '...props',
          kind: PropKind.Enum,
          properties: [
            {
              kind: PropKind.Type,
              type: prop.parent.name,
              loc: prop.parent.loc,
            },
          ],
          optional: true,
        };
      } else {
        if (!parentProp.properties?.find((p) => p.type === prop.parent?.name)) {
          parentProp.properties?.push({
            kind: PropKind.Type,
            type: prop.parent.name,
            loc: prop.parent.loc,
          });
        }
      }
    }
  };
  const consolidatedProps = rows
    ? rows.filter((prop) => {
        if (prop.parent) {
          if (
            config.options.skipInherited ||
            config.options.collapsed?.includes(prop.parent.name)
          ) {
            addParentProp(prop);
            return false;
          }
          if (config.options.collapsed) {
            for (const collapsedProp of config.options.collapsed) {
              const helperParent = config.helpers[collapsedProp];
              if (helperParent && hasProperties(helperParent)) {
                const helpProp = helperParent.properties?.find(
                  (p) =>
                    p.name === prop.name &&
                    p.parent?.name === prop.parent?.name,
                );
                if (helpProp) {
                  addParentProp({
                    ...prop,
                    parent: { name: collapsedProp, loc: helperParent.loc },
                  });
                  return false;
                }
              }
            }
          }
        }
        return true;
      })
    : [];
  const allProps = parentProp
    ? [...consolidatedProps, parentProp]
    : consolidatedProps;
  const items: PropItem[] = allProps.map((p) => {
    const nameProp = isIndexProp(p) ? p.index : p;
    const name = nameProp.name
      ? p.kind === PropKind.Rest
        ? `...${nameProp.name}`
        : nameProp.name
      : undefined;
    const nameNode =
      name === undefined
        ? emphasisNode(`anonymous${p.optional ? '' : '*'}`)
        : config.propLinks.propLink({
            name: `${name}${p.optional ? '' : '*'}`,
            loc: p.loc,
          });
    return configurePropItem(
      {
        name: [nameNode],
        parents: p.parent ? [config.propLinks.propLink(p.parent)] : undefined,

        type: config.propTypes.extractType(p),
        description: p.description,
        default: getPropValue(p),
        prop: p,
      } as PropItem,
      config,
    );
  });
  return createPropsTable(items, config.columns, prop);
};

export const configurePropItem = (
  item: PropItem,
  config: DocumentationConfig,
): PropItem => {
  const enabledColumn = (name: ColumnName): boolean | undefined => {
    return config.columns[name] && !config.columns[name]?.hidden;
  };
  return {
    name: enabledColumn('name') ? item.name : undefined,
    parents: enabledColumn('parents') ? item.parents : undefined,
    type: enabledColumn('type') ? item.type : undefined,
    default: enabledColumn('default') ? item.default : undefined,
    description: enabledColumn('description') ? item.description : undefined,
    prop: item.prop,
  };
};
