import { PropType } from '@structured-types/api';
export enum NodeKind {
  Table = 1,
  TableRow = 2,
  TableCell = 3,
  Heading = 4,
  Paragraph = 5,
  Text = 6,
  Bold = 7,
  Italic = 8,
  Link = 9,
  Code = 10,
  InlineCode = 11,
}
export interface DocumentationNode {
  kind: NodeKind;
}

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
    node.kind === NodeKind.Italic ||
    node.kind === NodeKind.Link
  );
};

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

export const tableCellNode = (
  value: string | DocumentationNode[],
): TableCellNode =>
  ({
    kind: NodeKind.TableCell,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as TableCellNode);

export interface HeadingNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Heading;
  depth?: number;
}

/**
 * HeadingNode type guard predicate
 */
export const isHeadingNode = (node: DocumentationNode): node is HeadingNode => {
  return node.kind === NodeKind.Heading;
};

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

export const paragraphNode = (
  value: string | DocumentationNode[],
): ParagraphNode =>
  ({
    kind: NodeKind.Paragraph,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as ParagraphNode);

export interface TextNode extends DocumentationNodeWithValue {
  kind: NodeKind.Text;
}

/**
 * TextNode type guard predicate
 */
export const isTextNode = (node: DocumentationNode): node is TextNode => {
  return node.kind === NodeKind.Text;
};

export const textNode = (value: string): TextNode =>
  ({ kind: NodeKind.Text, value } as TextNode);

export interface BoldNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Bold;
}

/**
 * BoldNode type guard predicate
 */
export const isBoldNode = (node: DocumentationNode): node is BoldNode => {
  return node.kind === NodeKind.Bold;
};

export const boldNode = (value: string | DocumentationNode[]): BoldNode =>
  ({
    kind: NodeKind.Bold,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as BoldNode);

export interface ItalicNode extends DocumentationNodeWithChildren {
  kind: NodeKind.Italic;
}

/**
 * ItalicNode type guard predicate
 */
export const isItalicNode = (node: DocumentationNode): node is ItalicNode => {
  return node.kind === NodeKind.Italic;
};

export const italicNode = (value: string | DocumentationNode[]): ItalicNode =>
  ({
    kind: NodeKind.Italic,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as ItalicNode);

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

export interface CodeNode extends DocumentationNodeWithValue {
  kind: NodeKind.Code;
}

/**
 * CodeNode type guard predicate
 */
export const isCodeNode = (node: DocumentationNode): node is CodeNode => {
  return node.kind === NodeKind.Code;
};

export const codeNode = (value: string): CodeNode =>
  ({
    kind: NodeKind.Code,
    value,
  } as CodeNode);

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

export const inlineCodeNode = (value: string): InlineCodeNode =>
  ({
    kind: NodeKind.InlineCode,
    value,
  } as InlineCodeNode);

export interface AttrsArg {
  section: DocumentationNode;
  tagName: string;
  node: DocumentationNode;
}

export type SectionNames =
  | 'props'
  | 'description'
  | 'examples'
  | 'title'
  | 'location'
  | 'all';

export type ColumnNames =
  | 'name'
  | 'type'
  | 'parents'
  | 'value'
  | 'description'
  | 'all';
export type DocumentationOptions = {
  collapsed?: string[];
  extensions?: string[];
  visible?: string[];
  columns?: ColumnNames[];
  sections?: SectionNames[];
  skipInherited?: boolean;
  overrides?: Record<string, Record<string, PropType>>;
};
