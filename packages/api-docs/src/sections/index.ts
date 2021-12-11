import { PropType } from '@structured-types/api';
import { DocumentationNode, SectionName, SectionObject } from '../types';
import { PropRepos } from '../utility/prop-repos';
import { DocumentationConfig } from '../DocumentationConfig';
import { textNode } from '../blocks/text';
import { paragraphNode } from '../blocks/paragraph';
import { boldNode } from '../blocks/bold';
import { titleSection } from './title';
import { descriptionSection } from './description';
import { typeSection } from './type';
import { locationSection } from './location';
import { extendsSection } from './extends';
import { getPropsTable } from './props';
import { getExamples } from './examples';

const getSection = async (
  prop: PropType,
  name: SectionName,
  { config, repos }: { config: DocumentationConfig; repos: PropRepos },
): Promise<DocumentationNode[] | undefined> => {
  switch (name) {
    case 'title':
      return titleSection(prop);
    case 'description':
      return descriptionSection(prop);
    case 'type':
      return typeSection(prop, config);
    case 'location':
      return await locationSection(prop, repos);
    case 'props':
      return getPropsTable(prop, config);
    case 'extends':
      return extendsSection(prop, config);
    case 'examples':
      return getExamples(prop);
    default:
      return undefined;
  }
};
export const generateSection = async (
  prop: PropType,
  name: SectionName,
  {
    sections,
    config,
    repos,
  }: { config: DocumentationConfig; repos: PropRepos; sections: SectionObject },
): Promise<DocumentationNode[] | undefined> => {
  const section = sections[name];
  if (section) {
    const { title, render } = section;
    const children =
      typeof render === 'function'
        ? render(prop)
        : await getSection(prop, name, { config, repos });
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
};
