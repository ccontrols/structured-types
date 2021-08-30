import { Node as RmNode } from 'unist';
export type { ProcessorSettings, Settings } from 'unified';

export interface Node extends RmNode {
  value?: string;
  depth?: number;
  url?: string;
  children?: Node[];
}

export interface NodeChildren extends Node {
  children: Node[];
}

export interface AttrsArg {
  section: Node;
  tagName: string;
  node: Node;
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
