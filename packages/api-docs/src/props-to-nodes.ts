import deepmerge from 'deepmerge';
import { PropType, PropTypes } from '@structured-types/api';
import {
  DocumentationNode,
  SectionName,
  DocumentationOptions,
  SectionObject,
} from './types';
import { defaultSections } from './default-sections';
import { defaultColumns } from './columns';
import { PropLinks, PropsList } from './utility/prop-links';
import { PropRepos } from './utility/prop-repos';
import { PropTypeNodes } from './props/full-prop-type';
import { DocumentationConfig } from './DocumentationConfig';
import { generateSection } from './sections';
import { getFS } from './utility/vfs';

const generateNodes = async (
  prop: PropType,
  {
    sections,
    config,
    repos,
  }: { config: DocumentationConfig; repos: PropRepos; sections: SectionObject },
): Promise<DocumentationNode[]> => {
  const result: DocumentationNode[] = [];
  for (const name of Object.keys(sections)) {
    const sectionConfig = sections[name as SectionName];
    if (!sectionConfig?.hidden) {
      const section = await generateSection(prop, name as SectionName, {
        config,
        repos,
        sections,
      });
      if (section) {
        result.push(...section);
      }
    }
  }
  return result;
};

/**
 * Async function to create a list of api documentation nodes
 * @param props properties parsed from `structured-types/api`
 * @param options page generation options
 * @returns a list of documentation nodes
 */
export const propsToDocumentation = async (
  props: PropTypes,
  options: DocumentationOptions = {},
): Promise<DocumentationNode[]> => {
  let sections: SectionObject = defaultSections;
  const config: DocumentationConfig = {
    columns: defaultColumns,
    propLinks: new PropLinks(),
    helpers: {},
    options: {},
    propTypes: new PropTypeNodes(),
  };
  const repos: PropRepos = new PropRepos();

  const result: DocumentationNode[] = [];
  const {
    extensions,
    visible,
    sections: propSections = {},
    columns = {},
  } = options;
  repos.fs = getFS(options.fs);
  config.options = options;
  if (propSections) {
    sections = Array.isArray(propSections)
      ? propSections.reduce((acc, name) => {
          return { ...acc, [name]: defaultSections[name] };
        }, {})
      : deepmerge(defaultSections, propSections);
  }
  if (columns) {
    config.columns = Array.isArray(columns)
      ? columns.reduce((acc, name) => {
          return { ...acc, [name]: defaultColumns[name] };
        }, {})
      : deepmerge(defaultColumns, columns);
  }

  const filterProps = (prop: PropType): PropType | undefined => {
    if (Array.isArray(extensions)) {
      if (
        typeof prop.extension === 'string' &&
        extensions.includes(prop.extension)
      ) {
        return prop;
      }
      return undefined;
    }
    if (Array.isArray(visible)) {
      if (typeof prop.name === 'string' && visible.includes(prop.name)) {
        return prop;
      }
      return undefined;
    }
    return prop;
  };
  const toplevelProps: PropsList = {};
  Object.keys(props).forEach((key) => {
    if (key !== '__helpers' && key !== '__diagnostics') {
      const prop = filterProps(props[key]);
      if (prop) {
        toplevelProps[key] = prop;
      }
    }
  });
  config.helpers = props.__helpers || {};
  Object.keys(config.helpers).forEach((key) => {
    const prop = filterProps(config.helpers[key]);
    if (prop) {
      toplevelProps[key] = prop;
    }
  });
  config.propLinks.init(toplevelProps);
  config.propTypes.init(config);
  for (const prop of Object.values(toplevelProps)) {
    const nodes = await generateNodes(prop, { repos, config, sections });
    result.push(...nodes);
  }
  return result;
};
