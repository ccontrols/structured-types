import React, { FC, ReactNode } from 'react';
import * as ts from 'typescript';

/**
 * a string global constant
 */
export const STRING_CONST = 'my string';

/**
 * Function without parameters
 * @returns the string test
 */
export function Fn(): string {
  return 'test';
}

class DefaultStore {
  components = {};
}

interface Store {
  components: { name?: string };
}

export const getDefaultStore = (): Store => new DefaultStore();

/**
 * anonymous parameter
 */
export const anonParamFn = ({ components }: Store): void => {
  console.log(components.name);
};
/**
 * Exported union type
 */
export type FileType = 'file' | 'folder' | 'unknown';

export const defFileType: FileType = 'file';
/**
 * configuration object
 */
type TConfig = {
  /**
   * is this a system configuration
   * @default true
   */
  system: boolean;
  compiler: ts.CompilerOptions;

  kind: Kind;
};

export interface ConfigNoTypeArr {
  [key: string]: Omit<TConfig, 'kind'>[];
}
/**
 * MyComponent properties.
 */
type OwnProps = {
  /**
   * Record prop
   */
  record?: Record<string, TConfig>;

  /**
   * external type
   */
  el?: ReactNode;
  /** stringProp description */
  stringProp?: string;

  /**
   * numberProp description
   * @default 4
   */
  numberProp: number;
  /** linked type */
  config: TConfig;

  /**
   * objectProp description
   */
  objectProp: {
    name: string;
    sex: 'male' | 'female';
    c: TConfig;
  };

  /**
   * function property
   */
  fnProp: (
    p: { config: TConfig },
    b: boolean,
    a: boolean,
  ) => { state: { name: string } };
  /**
   * linked function
   */
  fnType: FnType;
  /**
   * array property
   */
  arrProp: [string, number];
  arrType: ConfigArr;
};

/**
 * MyComponent special component
 */
export const MyComponent: FC<OwnProps> = ({ stringProp }) => (
  <div>{stringProp}</div>
);

MyComponent.defaultProps = {
  stringProp: 'test',
};

export enum Kind {
  Table = 1,
  TableRow = 2,
}

type FnType = (kind: Kind) => string;

type ConfigArr = TConfig[];

export type IndexedProps = {
  [index: string]: TConfig;
};
