import deepmerge from 'deepmerge';
import {
  InterfaceProp,
  isUnionProp,
  PropType,
  hasProperties,
  isFunctionProp,
  PropTypes,
} from '@structured-types/api';
import {
  DocumentationNode,
  SectionName,
  DocumentationOptions,
  SectionObject,
} from './types';
import { textNode } from './blocks/text';
import { paragraphNode } from './blocks/paragraph';
import { codeNode } from './blocks/code';
import { boldNode } from './blocks/bold';
import { defaultSections } from './sections';
import { defaultColumns } from './columns';
import { titleSection } from './sections/title';
import { descriptionSection } from './sections/description';
import { PropLinks, PropsList } from './utility/prop-links';
import { typeSection } from './sections/type';
import { PropRepos } from './utility/prop-repos';
import { locationSection } from './sections/location';
import { extendsSection } from './sections/extends';
import { PropTypeNodes } from './props/full-prop-type';
import { DocumentationConfig } from './DocumentationConfig';
import { propTable } from './utility/props-table';
import { propFunction } from './utility/prop-function';
import { unionPropNodes } from './props/union-prop';

export class PropsToDocumentation {
  private sections: SectionObject = defaultSections;
  private config: DocumentationConfig = {
    columns: defaultColumns,
    propLinks: new PropLinks(),
    helpers: {},
    options: {},
    propTypes: new PropTypeNodes(),
  };
  private repos: PropRepos = new PropRepos();

  private extractClassLike(
    prop: InterfaceProp,
  ): DocumentationNode[] | undefined {
    if (prop.name && prop.properties?.length) {
      const result: DocumentationNode[] = [];
      if (isUnionProp(prop)) {
        result.push(...unionPropNodes(prop, this.config));
      } else if (hasProperties(prop)) {
        const { propsTable } = propTable(prop, prop.properties, this.config);
        result.push(...propsTable);
      }
      return result;
    }
    return undefined;
  }

  private getPropsTable(prop: PropType): DocumentationNode[] | undefined {
    if (isFunctionProp(prop)) {
      return propFunction(prop, this.config);
    } else if (hasProperties(prop)) {
      return this.extractClassLike(prop);
    }
    return undefined;
  }

  private getExamples(prop: PropType): DocumentationNode[] | undefined {
    if (prop.examples) {
      const result: DocumentationNode[] = [];
      const codeExamples = prop.examples.filter((e) => e.content);
      codeExamples.forEach((example) => {
        if (example.content) {
          result.push(paragraphNode([codeNode(example.content)]));
        }
      });
      return result;
    }
    return undefined;
  }

  private getSection(
    prop: PropType,
    name: SectionName,
  ): DocumentationNode[] | undefined {
    switch (name) {
      case 'title':
        return titleSection(prop);
      case 'description':
        return descriptionSection(prop);
      case 'type':
        return typeSection(prop, this.config);
      case 'location':
        return locationSection(prop, this.repos);
      case 'props':
        return this.getPropsTable(prop);
      case 'extends':
        return extendsSection(prop, this.config);
      case 'examples':
        return this.getExamples(prop);
      default:
        return undefined;
    }
  }
  private generateSection(
    prop: PropType,
    name: SectionName,
  ): DocumentationNode[] | undefined {
    const config = this.sections[name];
    if (config) {
      const { title, render } = config;
      const children =
        typeof render === 'function'
          ? render(prop)
          : this.getSection(prop, name);
      if (children) {
        const result: DocumentationNode[] = [];

        if (title) {
          const value = typeof title === 'function' ? title(prop) : title;
          if (value) {
            result.push(paragraphNode([boldNode([textNode(value)])]));
          }
        }
        result.push(...children);
        return result;
      }
    }
    return undefined;
  }
  private generateNodes(prop: PropType): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    Object.keys(this.sections).forEach((name) => {
      const config = this.sections[name as SectionName];
      if (!config?.hidden) {
        const section = this.generateSection(prop, name as SectionName);
        if (section) {
          result.push(...section);
        }
      }
    });
    return result;
  }

  public extract(
    props: PropTypes,
    options: DocumentationOptions = {},
  ): DocumentationNode[] {
    const result: DocumentationNode[] = [];
    const { extensions, visible, sections = {}, columns = {} } = options;
    this.repos.fs = options.fs;
    this.config.options = options;
    if (sections) {
      this.sections = Array.isArray(sections)
        ? sections.reduce((acc, name) => {
            return { ...acc, [name]: defaultSections[name] };
          }, {})
        : deepmerge(defaultSections, sections);
    }
    if (columns) {
      this.config.columns = Array.isArray(columns)
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
    this.config.helpers = props.__helpers || {};
    Object.keys(this.config.helpers).forEach((key) => {
      const prop = filterProps(this.config.helpers[key]);
      if (prop) {
        toplevelProps[key] = prop;
      }
    });
    this.config.propLinks.init(toplevelProps);
    this.config.propTypes.init(this.config);
    Object.values(toplevelProps).forEach((prop) => {
      const nodes = this.generateNodes(prop);
      result.push(...nodes);
    });
    return result;
  }
}
