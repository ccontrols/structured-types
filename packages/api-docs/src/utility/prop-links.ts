import { PropType, PropParent } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { inlineCodeNode } from '../blocks/inline-code';
import { linkNode } from '../blocks/link';

export type PropsList = Record<string, PropType>;

export class PropLinks {
  private props: PropsList = {};
  public init(props: PropsList): void {
    this.props = props;
  }
  public getPropLink(key: string): PropType | undefined {
    const nameParts = key.split('.');
    return this.props[nameParts[nameParts.length - 1]];
  }
  public propLink(prop: PropParent): DocumentationNode {
    const typeText = inlineCodeNode(prop.name);
    if (typeof prop.name === 'string') {
      const key = prop.token ? prop.token : prop.name;
      const link = this.getPropLink(key);
      return linkNode(
        [typeText],
        link ? `#${link.name?.toLowerCase()}` : undefined,
        prop.loc,
      );
    }
    return typeText;
  }
}
