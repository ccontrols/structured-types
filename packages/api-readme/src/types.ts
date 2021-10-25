import { Node as RmNode } from 'unist';
export type { ProcessorSettings, Settings } from 'unified';

export interface RemarkNode extends RmNode {
  value?: string;
  depth?: number;
  url?: string;
  children?: RemarkNode[];
}

export interface AttrsArg {
  section: RemarkNode;
  tagName: string;
  node: RemarkNode;
}

export interface SectionArg {
  attrs: AttrsArg;
  attributes?: string[][];
}

export type TraverseCallback = (
  name: string,
  fileName: string,
  repoFolder: string,
) => void;
