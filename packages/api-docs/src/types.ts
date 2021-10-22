import { PropType } from '@structured-types/api';

/**
 * Documentation node kinds
 */
export enum NodeKind {
  Table = 1,
  TableRow = 2,

  TableCell = 3,
  Heading = 4,
  Paragraph = 5,
  Text = 6,
  Bold = 7,
  Emphasis = 8,
  Link = 9,
  Code = 10,
  InlineCode = 11,
}

/**
 * Base documentation node
 */
export interface DocumentationNode {
  kind: NodeKind;
}

/**
 * Documentation node with children
 */
export interface DocumentationNodeWithChildren extends DocumentationNode {
  children?: DocumentationNode[];
}

/**
 * Node with children type guard predicate
 */
export const isNodeWithChildren = (
  node: DocumentationNode,
): node is DocumentationNodeWithChildren => {
  return (
    node.kind === NodeKind.Table ||
    node.kind === NodeKind.TableRow ||
    node.kind === NodeKind.TableCell ||
    node.kind === NodeKind.Heading ||
    node.kind === NodeKind.Paragraph ||
    node.kind === NodeKind.Bold ||
    node.kind === NodeKind.Emphasis ||
    node.kind === NodeKind.Link
  );
};

/**
 * Documentation node with a value
 */
export interface DocumentationNodeWithValue extends DocumentationNode {
  value: string;
}

/**
 * Node with value type guard predicate
 */
export const isNodeWithValue = (
  node: DocumentationNode,
): node is DocumentationNodeWithValue => {
  return (
    node.kind === NodeKind.Text ||
    node.kind === NodeKind.InlineCode ||
    node.kind === NodeKind.Code
  );
};

/**
 * Table node, where the first row is a table header row
 */
export interface TableNode extends DocumentationNode {
  kind: NodeKind.Table;
  children: TableRowNode[];
}

/**
 * TableNode type guard predicate
 */
export const isTableNode = (node: DocumentationNode): node is TableNode => {
  return node.kind === NodeKind.Table;
};

/**
 * Table row node - can be a header or data row
 */

export interface TableRowNode extends DocumentationNode {
  kind: NodeKind.TableRow;
  children: TableCellNode[];
}

/**
 * TableRowNode type guard predicate
 */
export const isTableRowNode = (
  node: DocumentationNode,
): node is TableRowNode => {
  return node.kind === NodeKind.TableRow;
};

/**
 * Table cell node, the content is a list of child nodes
 */
export interface TableCellNode extends DocumentationNodeWithChildren {
  kind: NodeKind.TableCell;
}

/**
 * TableCellNode type guard predicate
 */
export const isTableCellNode = (
  node: DocumentationNode,
): node is TableCellNode => {
  return node.kind === NodeKind.TableCell;
};

/**
 * Heading node with a depth parameter, the content is a list of child nodes
 */
export interface HeadingNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Heading;
  depth: number;
}

/**
 * HeadingNode type guard predicate
 */
export const isHeadingNode = (node: DocumentationNode): node is HeadingNode => {
  return node.kind === NodeKind.Heading;
};

/**
 * Paragraph node, the content is a list of child nodes
 */

export interface ParagraphNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Paragraph;
}

/**
 * ParagraphNode type guard predicate
 */
export const isParagraphNode = (
  node: DocumentationNode,
): node is ParagraphNode => {
  return node.kind === NodeKind.Paragraph;
};

/**
 * Text node, the content string is in the value field
 */
export interface TextNode extends DocumentationNodeWithValue {
  kind: NodeKind.Text;
}

/**
 * TextNode type guard predicate
 */
export const isTextNode = (node: DocumentationNode): node is TextNode => {
  return node.kind === NodeKind.Text;
};

/**
 * Bold/Strong node, the content is a list of child nodes
 */
export interface BoldNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Bold;
}

/**
 * BoldNode type guard predicate
 */
export const isBoldNode = (node: DocumentationNode): node is BoldNode => {
  return node.kind === NodeKind.Bold;
};

/**
 * Emphasis/Italic node, the content is a list of child nodes
 */
export interface EmphasisNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Emphasis;
}

/**
 * EmphasisNode type guard predicate
 */
export const isEmphasisNode = (
  node: DocumentationNode,
): node is EmphasisNode => {
  return node.kind === NodeKind.Emphasis;
};

/**
 * Link node with url property, the content is a list of child nodes
 */

export interface LinkNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Link;
  url?: string;
}

/**
 * LinkNode type guard predicate
 */
export const isLinkNode = (node: DocumentationNode): node is LinkNode => {
  return node.kind === NodeKind.Link;
};

/**
 * Code node, the content string is in the value field
 */
export interface CodeNode extends DocumentationNodeWithValue {
  kind: NodeKind.Code;
}

/**
 * CodeNode type guard predicate
 */
export const isCodeNode = (node: DocumentationNode): node is CodeNode => {
  return node.kind === NodeKind.Code;
};

/**
 * Inline code node, the content string is in the value field
 */
export interface InlineCodeNode extends DocumentationNodeWithValue {
  kind: NodeKind.InlineCode;
}

/**
 * InlineCodeNode type guard predicate
 */
export const isInlineCodeNode = (
  node: DocumentationNode,
): node is InlineCodeNode => {
  return node.kind === NodeKind.InlineCode;
};

/**
 * Section names to be displayed
 */
export type SectionNames =
  | 'props'
  | 'description'
  | 'examples'
  | 'title'
  | 'location'
  | 'all';

/**
 * Properties table column names to be displayed
 */

export type ColumnNames =
  | 'name'
  | 'type'
  | 'parents'
  | 'value'
  | 'description'
  | 'all';

/**
 * Document page generation options
 */
export type DocumentationOptions = {
  /**
   * List of type names, that should not be expanded. For example, some internal React objects can be kept just as a string and will not be detailed in the documentation, instead of listing their internal properties.
   */
  collapsed?: string[];
  /**
   * List of plugins (or extensions). For example, for a react library, you can specify to include only react components, but not any additional types or utilities.
   */
  extensions?: string[];
  /**
   * List of type names, that should be "visible".
   * This will limit which of the parsed props to be documented.
   */
  visible?: string[];
  /**
   * List of the columns in the property tables `name` | `type` | `parents` | `value` | `description` | `all`.
   * By default, all columns will be visible.
   */
  columns?: ColumnNames[];
  /**
   * List of the sections to generate `props` | `description` | `examples` | `title` | `location` | `all`.
   * By default, all sections are generated.
   */
  sections?: SectionNames[];
  /**
   * Whether to skip properties that are "inherited", or "composed".
   * For example, `type OwnProps = { x: number } & React.LineProps` will only output the `x` property and skip the inherited
   * React library properties.
   */
  skipInherited?: boolean;
  /**
   * Sections with custom properties
   */
  overrides?: Record<string, Record<string, PropType>>;
};
