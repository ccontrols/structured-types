/** @jsx jsx */
import { FC, useMemo, ComponentType } from 'react';
import { jsx, Box, Link, Theme } from 'theme-ui';
import { PropKind } from '@structured-types/api/types';
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Multiselect,
} from '@component-controls/components';
import { useURLParams } from '../../utils/url';
import { ParserNames } from '../../contexts/ParsersContext';
import { ReactJSONProps } from './JSONViewer';
import { DataViewer } from './DataViewer';

type APIItem = {
  label: ParserNames;
  selected: boolean;
  Panel: ComponentType<any>;
  link: string;
  jsonTree?: ReactJSONProps;
};

const kindEntries = Object.entries(PropKind);
const getKindName = (kind: PropKind): string | PropKind | undefined => {
  const strKind = kind ? kind.toString() : 'unknown';
  const found = kindEntries.find(([v, _]) => {
    return v === strKind;
  });
  return found ? found[1] : undefined;
};
export const InfoContainer: FC = () => {
  const [visibleTabs, setVisibleTabs] = useURLParams<string[]>('viewer-tabs', [
    'structured-types',
  ]);
  const [selectedTab, setSelectedTab] = useURLParams<string>(
    'selected-tab',
    '',
  );
  const tabIndex = useMemo(() => {
    return Math.max(
      0,
      visibleTabs.findIndex((name) => name === selectedTab),
    );
  }, [selectedTab, visibleTabs]);
  const items: APIItem[] = useMemo(() => {
    const items: Record<ParserNames, Omit<APIItem, 'label'>> = {
      'structured-types': {
        selected: true,
        link: 'https://github.com/ccontrols/structured-types/tree/master/packages/api',
        Panel: DataViewer,
        jsonTree: {
          // eslint-disable-next-line react/display-name
          getItemString: (type, data, itemType, itemString) => {
            if (type === 'Object' && 'name' in data) {
              const typename = getKindName(data.kind);
              return `${data.name}${typename ? ` (${typename})` : ''}`;
            }
            return (
              <span>
                {itemType} {itemString}
              </span>
            );
          },
          valueRenderer: (
            valueAsString: any,
            value: any,
            ...keyPath: (string | number)[]
          ) => {
            if (keyPath.length && keyPath[0] === 'kind') {
              const typename = getKindName(value);
              if (typename) {
                return `${typename} (${valueAsString})`;
              }
            }
            return valueAsString;
          },
        },
      },
      'react-docgen-typescript': {
        selected: false,
        link: 'https://github.com/styleguidist/react-docgen-typescript',
        Panel: DataViewer,
      },
      'react-docgen': {
        selected: false,
        link: 'https://github.com/reactjs/react-docgen',
        Panel: DataViewer,
      },
      jsdoc: {
        selected: false,
        link: 'https://github.com/jsdoc2md/jsdoc-api',
        Panel: DataViewer,
      },
      typedoc: {
        selected: false,
        link: 'https://github.com/TypeStrong/typedoc',
        Panel: DataViewer,
      },
      'ts-json-schema-generator': {
        selected: false,
        link: 'https://github.com/vega/ts-json-schema-generator',
        Panel: DataViewer,
      },
      documentation: {
        selected: false,
        link: 'https://github.com/documentationjs/documentation',
        Panel: DataViewer,
      },
    };
    return Object.keys(items).map((key) => {
      const item = items[key as ParserNames];
      return {
        ...item,
        label: key,
        selected: visibleTabs.includes(key),
      } as APIItem;
    });
  }, [visibleTabs]);
  const visibleItems = visibleTabs
    .map((name) => {
      return items.find((item) => item.label === name);
    })
    .filter((t) => t) as APIItem[];
  const typeItem = items[0];
  return (
    <div>
      <Box
        sx={{
          py: 2,
          mx: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottom: (t: Theme): string => ` 2px solid  ${t.colors?.shadow}`,
        }}
      >
        <Multiselect
          items={items}
          onChange={(item) => {
            const visibleItem = visibleTabs.find((name) => name === item.label);
            if (visibleItem) {
              const newTabs = visibleTabs.filter(
                (name) => name !== visibleItem,
              );
              setVisibleTabs(newTabs.length ? newTabs : ['structured-types']);
            } else {
              setVisibleTabs([...visibleTabs, item.label]);
            }
          }}
        >
          <Link href="#">select viewers</Link>
        </Multiselect>
      </Box>
      {visibleItems.length === 0 ? (
        <typeItem.Panel
          label={typeItem.label}
          link={typeItem.link}
          jsonTree={typeItem.jsonTree}
        />
      ) : (
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index: number) => {
            if (index >= 0 && index <= visibleTabs.length) {
              setSelectedTab(visibleTabs[index]);
            } else {
              setSelectedTab('');
            }
          }}
          sx={{
            '.react-tabs__tab': {
              fontWeight: 'normal',
            },
            '.react-tabs__tab-list': {
              textAlign: 'center',
            },
          }}
        >
          <TabList>
            {visibleItems.map((item) => (
              <Tab key={item.label}>{item.label}</Tab>
            ))}
          </TabList>
          {visibleItems.map((item) => (
            <TabPanel key={item.label}>
              <item.Panel
                label={item.label}
                link={item.link}
                jsonTree={item.jsonTree}
              />
            </TabPanel>
          ))}
        </Tabs>
      )}
    </div>
  );
};
