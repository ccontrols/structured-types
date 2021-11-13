import {
  PropKind,
  PropType,
  EnumProp,
  hasProperties,
  hasValue,
} from '@structured-types/api/types';
import { createPropsTable, PropItem } from '../blocks/table';
import { inlineCodeNode } from '../blocks/inline-code';
import { DocumentationConfig } from '../DocumentationConfig';
import { ColumnName } from '../types';
import { isStringProp } from '@structured-types/api';

export const propTable = (
  prop: PropType,
  rows: PropType[],
  config: DocumentationConfig,
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
  const consolidatedProps = rows.filter((prop) => {
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
                p.name === prop.name && p.parent?.name === prop.parent?.name,
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
  });
  const allProps = parentProp
    ? [...consolidatedProps, parentProp]
    : consolidatedProps;
  const items: PropItem[] = allProps.map((prop) => {
    let name = prop.name
      ? prop.kind === PropKind.Rest
        ? `...${prop.name}`
        : prop.name
      : '';
    name = `${name}${!name || prop.optional ? '' : '*'}`;
    return configurePropItem(
      {
        name: prop.loc
          ? [config.propLinks.propLink({ name, loc: prop.loc })]
          : [inlineCodeNode(name)],
        parents: prop.parent
          ? [config.propLinks.propLink(prop.parent)]
          : undefined,

        type: [config.propTypes.extractPropType(prop)],
        description: prop.description,
        default: hasValue(prop)
          ? isStringProp(prop) && typeof prop.value === 'string'
            ? `"${prop.value}"`
            : prop.value
          : undefined,
        prop,
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
