import { Node, AttrsArg, SectionArg } from './types';

const trimQuotes = (txt: string): string =>
  txt ? txt.replace(/['"]+/g, '') : txt;

export const extractCustomTag = (
  node: Node,
  tagName: string,
): SectionArg[] | undefined => {
  const nodes =
    node.children &&
    node.children.filter(
      (child: Node) =>
        child.type === 'html' &&
        child.value &&
        child.value.startsWith(`<${tagName}`),
    );
  return nodes
    ? nodes
        .map((section: Node) => ({
          section,
          match: section.value
            ? section.value.match(
                /(\w+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g,
              )
            : undefined,
        }))
        .map(
          ({ section, match }: { section: Node; match?: string[] | null }) => ({
            attrs: { section, tagName, node },
            attributes: match
              ? match.map((m: string) =>
                  m.split('=').map((value) => trimQuotes(value)),
                )
              : undefined,
          }),
        )
    : undefined;
};

export const inlineNewContent = (
  { section, tagName, node }: AttrsArg,
  newContent: Node[],
): void => {
  const startTag = `<!-- START-${tagName.toUpperCase()} -->`;
  const endTag = `<!-- END-${tagName.toUpperCase()} -->`;
  const index = node.children ? node.children.indexOf(section) : -1;
  if (index === -1) {
    return;
  }
  let deleteNodes = 0;
  let foundComment = false;
  if (node.children) {
    for (let i = index + 1; i < node.children.length; i += 1) {
      const childNode = node.children[i];
      if (childNode.type == 'html' && childNode.value == startTag) {
        foundComment = true;
      }
      if (foundComment) {
        deleteNodes += 1;
      }
      if (
        childNode &&
        childNode.type == 'html' &&
        (childNode.value == endTag ||
          (childNode.value &&
            childNode.value.toLowerCase().startsWith(`<${tagName}`)))
      ) {
        break;
      }
    }
    node.children.splice(
      index + 1,
      deleteNodes,
      ...[
        {
          type: 'html',
          value: startTag,
        },
        ...newContent,
        {
          type: 'html',
          value: endTag,
        },
      ],
    );
  }
};
