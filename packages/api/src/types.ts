import * as ts from 'typescript';

/**
 * JSDoc example item
 */
export interface JSDocExample {
  /**
   * example caption/title
   */
  caption?: string;
  /**
   * example source/content
   */
  content?: string;
}

/**
 * JSDoc generic tag item
 */
export interface JSDocPropTag {
  /**
   * tag name
   */
  tag: string;
  /**
   * optional tag content
   */
  content?: string;
}

/**
 * The property type or kind
 */
export enum PropKind {
  String = 1,
  Number = 2,
  Boolean = 3,
  Union = 4,
  Enum = 5,
  Tuple = 6,
  Rest = 7,
  Undefined = 8,
  Unknown = 9,
  Null = 10,
  Function = 11,
  Void = 12,
  Class = 13,
  Interface = 14,
  Type = 15,
  Array = 16,
  Any = 17,
  Index = 20,
  Constructor = 21,
  Getter = 22,
  Setter = 23,
  BigInt = 24,
  Component = 25,
  Object = 26,
  Namespace = 27,
  RegEx = 28,
}

export interface SourcePosition {
  /**
   * source line of the symbol
   */
  line: number;
  /**
   * source column of the symbol
   */
  col: number;
}

export interface SourcePositions {
  start: SourcePosition;
  end: SourcePosition;
}
export interface SourceLocation {
  /**
   * name of the file where the symbol is defined
   * only if different from the default file path
   */
  filePath?: string;
  /**
   * source code location for the symbol declaration
   */
  loc?: SourcePositions;
}

/**
 * Parent of a property field
 */
export interface PropParent {
  /**
   * the parent type name
   */
  name: string;

  /**
   * unique id for looking up helper
   */
  token?: string;
  /**
   * optional source location.
   * will be available when collectSourceInfo option is set to true
   */
  loc?: SourceLocation;
}
/**
 * Base prop type interface
 */
export interface PropType {
  /**
   * generic properties
   */
  kind?: PropKind;
  /**
   * name of the property
   */
  name?: string;

  /**
   * alias - when the assigned property is being imported as an aliased name
   */
  alias?: string;
  /**
   * the name of the parent property, if combined props
   */
  parent?: PropParent;
  /**
   * source location of the symbol and source file position
   * will be available when collectSourceInfo option is set to true
   */
  loc?: SourceLocation;
  /**
   * by default, properties are required
   */
  optional?: boolean;
  /**
   * readonly property
   */
  readonly?: boolean;
  /**
   * abstract property
   */
  abstract?: boolean;
  /**
   * async function
   */
  async?: boolean;
  /**
   * property visibility
   */
  visibility?: 'private' | 'protected' | 'public';
  /**
   * true, of the class property is static
   */
  static?: boolean;

  /**
   * type name of the property or lookup into __helpers list of symbols
   */
  type?: string;
  /**
   * used plugin name
   * ie 'react'...
   */
  extension?: string;
  /**
   * jsdoc description
   */
  description?: string;
  /**
   * jsdoc fires events list
   */
  fires?: string[];
  /**
   * jsdoc see links list
   */
  see?: string[];
  /**
   * jsdoc examples list
   */
  examples?: JSDocExample[];
  /**
   * jsdoc generic tags, not covered by other props
   */
  tags?: JSDocPropTag[];
  /**
   * jsdoc summary
   */
  summary?: string;
  /**
   * jsdoc deprecated tag
   */
  deprecated?: string | true;
  /**
   * jsdoc ignore tag, to be excluded from documentations
   */
  ignore?: boolean;
  /**
   * if collectParametersUsage option is set, this will collect parameters usage in function body
   */
  usage?: { start: SourcePosition; end: SourcePosition }[];

  /**
   * unique id for looking up helpers
   */
  token?: string;
}

/**
 * Object property
 */
export interface ObjectProp extends PropType {
  kind: PropKind.Object;
  /**
   * object properties list
   */
  properties?: PropType[];
  /**
   * value, if the object is initialized
   */
  value?: PropType[];
}

/**
 * ObjectProp type guard predicate
 */
export const isObjectProp = (prop: PropType): prop is ObjectProp => {
  return prop.kind === PropKind.Object;
};

/**
 * String property
 */
export interface StringProp extends PropType {
  kind: PropKind.String;
  value?: string;
}

/**
 * StringProp type guard predicate
 */
export const isStringProp = (prop: PropType): prop is StringProp => {
  return prop.kind === PropKind.String;
};

export interface NumberProp extends PropType {
  kind: PropKind.Number;
  value?: number;
}

/**
 * NumberProp type guard predicate
 */
export const isNumberProp = (prop: PropType): prop is NumberProp => {
  return prop.kind === PropKind.Number || prop.kind === PropKind.BigInt;
};

export interface BooleanProp extends PropType {
  kind: PropKind.Boolean;
  value?: boolean;
}

/**
 * BooleanProp type guard predicate
 */
export const isBooleanProp = (prop: PropType): prop is BooleanProp => {
  return prop.kind === PropKind.Boolean;
};

export interface UnionProp extends PropType {
  kind: PropKind.Union;
  properties?: PropType[];
  value?: any;
}

/**
 * UnionProp type guard predicate
 */
export const isUnionProp = (prop: PropType): prop is UnionProp => {
  return prop.kind === PropKind.Union;
};

export type HasValueProp =
  | StringProp
  | NumberProp
  | BooleanProp
  | UnionProp
  | TypeProp;

/**
 * type guard predicate to determine if the prop has a value field
 */
export const hasValue = (prop: PropType): prop is HasValueProp => {
  return (
    prop.kind === PropKind.String ||
    prop.kind === PropKind.Number ||
    prop.kind === PropKind.Boolean ||
    prop.kind === PropKind.Type ||
    prop.kind === PropKind.Union
  );
};
export interface EnumProp extends PropType {
  properties?: PropType[];
}

/**
 * EnumProp type guard predicate
 */
export const isEnumProp = (prop: PropType): prop is EnumProp => {
  return prop.kind === PropKind.Enum;
};

export interface RestProp extends PropType {
  kind: PropKind.Rest;
  prop?: PropType;
}

/**
 * RestProp type guard predicate
 */
export const isRestProp = (prop: PropType): prop is RestProp => {
  return prop.kind === PropKind.Rest;
};

export interface TupleProp extends PropType {
  kind: PropKind.Tuple;
  properties?: PropType[];
}

/**
 * TupleProp type guard predicate
 */
export const isTupleProp = (prop: PropType): prop is TupleProp => {
  return prop.kind === PropKind.Tuple;
};

export interface UndefinedProp extends PropType {
  kind: PropKind.Undefined;
  value?: undefined;
}

/**
 * UndefinedProp type guard predicate
 */
export const isUndefinedProp = (prop: PropType): prop is UndefinedProp => {
  return prop.kind === PropKind.Undefined;
};

export interface UnknownProp extends PropType {
  kind: PropKind.Unknown;
  value?: unknown;
}

/**
 * UnknownProp type guard predicate
 */
export const isUnknownProp = (prop: PropType): prop is UnknownProp => {
  return prop.kind === PropKind.Unknown;
};

export interface NullProp extends PropType {
  kind: PropKind.Null;
  value?: null;
}

/**
 * NullProp type guard predicate
 */
export const isNullProp = (prop: PropType): prop is NullProp => {
  return prop.kind === PropKind.Null;
};

export interface BaseFunctionProp extends PropType {
  parameters?: PropType[];
  returns?: PropType;
  types?: PropType[];
}

export interface FunctionProp extends BaseFunctionProp {
  kind: PropKind.Function;
  properties?: PropType[];
}

export interface ConstructorProp extends BaseFunctionProp {
  kind: PropKind.Constructor;
}

export interface GetterProp extends BaseFunctionProp {
  kind: PropKind.Getter;
}
export interface SetterProp extends BaseFunctionProp {
  kind: PropKind.Getter;
}

/**
 * FunctionProp type guard predicate
 */
export const isFunctionProp = (prop: PropType): prop is FunctionProp => {
  return prop.kind === PropKind.Function;
};

/**
 * BaseFunctionProp type guard predicate
 */
export const isFunctionBaseType = (
  prop: PropType,
): prop is BaseFunctionProp => {
  return (
    prop.kind === PropKind.Function ||
    prop.kind === PropKind.Constructor ||
    prop.kind === PropKind.Getter ||
    prop.kind === PropKind.Setter
  );
};

export interface VoidProp extends PropType {
  value?: void;
}

/**
 * VoidProp type guard predicate
 */
export const isVoidProp = (prop: PropType): prop is VoidProp => {
  return prop.kind === PropKind.Void;
};

export interface ClassProp extends PropType {
  implements?: InterfaceProp[];
  extends?: PropParent[];
  generics?: PropType[];
  properties?: PropType[];
}
export interface ComponentProp extends ClassProp {
  kind: PropKind.Component;
}
/**
 * ClassProp type guard predicate
 */
export const isClassProp = (prop: PropType): prop is ClassProp => {
  return prop.kind === PropKind.Class;
};

export interface InterfaceProp extends PropType {
  extends?: PropParent[];
  properties?: PropType[];
  generics?: PropType[];
}

/**
 * InterfaceProp type guard predicate
 */
export const isInterfaceProp = (prop: PropType): prop is InterfaceProp => {
  return prop.kind === PropKind.Interface;
};

export interface TypeProp extends PropType {
  extends?: PropParent[];
  properties?: PropType[];
  generics?: PropType[];
  value?: PropType;
}

/**
 * TypeProp type guard predicate
 */
export const isTypeProp = (prop: PropType): prop is TypeProp => {
  return prop.kind === PropKind.Type;
};

export type HasGenericsProp = TypeProp | InterfaceProp | ClassProp;

/**
 * HasGenericsProp predicate to determine if a prop has a generics field
 */
export const hasGenerics = (prop: PropType): prop is HasGenericsProp => {
  return (
    prop.kind === PropKind.Type ||
    prop.kind === PropKind.Class ||
    prop.kind === PropKind.Interface ||
    prop.kind === PropKind.Array
  );
};

export type HasPropertiesProp =
  | ArrayProp
  | UnionProp
  | ObjectProp
  | EnumProp
  | TupleProp
  | FunctionProp
  | TypeProp
  | InterfaceProp
  | ComponentProp
  | ClassProp;

/**
 * HasPropertiesProp predicate to determine if a prop has a properties field
 */
export const hasProperties = (prop: PropType): prop is HasPropertiesProp => {
  return (
    prop.kind === PropKind.Array ||
    prop.kind === PropKind.Union ||
    prop.kind === PropKind.Object ||
    prop.kind === PropKind.Enum ||
    prop.kind === PropKind.Tuple ||
    prop.kind === PropKind.Function ||
    prop.kind === PropKind.Type ||
    prop.kind === PropKind.Class ||
    prop.kind === PropKind.Component ||
    prop.kind === PropKind.Interface
  );
};

export interface ArrayProp extends PropType {
  properties?: PropType[];
  value?: PropType[];
}

/**
 * ArrayProp type guard predicate
 */
export const isArrayProp = (prop: PropType): prop is ArrayProp => {
  return prop.kind === PropKind.Array;
};

export interface AnyProp extends PropType {
  value?: any;
}

/**
 * AnyProp type guard predicate
 */
export const isAnyProp = (prop: PropType): prop is AnyProp => {
  return prop.kind === PropKind.Any;
};

export interface IndexProp extends PropType {
  index: PropType;
  prop?: PropType;
  properties?: PropType[];
}

/**
 * IndexProp type guard predicate
 */
export const isIndexProp = (prop: PropType): prop is IndexProp => {
  return prop.kind === PropKind.Index;
};

export type ValueProp =
  | AnyProp
  | ArrayProp
  | VoidProp
  | UnionProp
  | NullProp
  | UnknownProp
  | UndefinedProp
  | BooleanProp
  | NumberProp
  | StringProp
  | ObjectProp;

export type ClassLikeProp =
  | ClassProp
  | InterfaceProp
  | TypeProp
  | ComponentProp;

/**
 * ClassLikeProp predicate to determine if a prop is class-like
 */
export const isClassLikeProp = (prop: PropType): prop is ClassLikeProp => {
  return (
    prop.kind === PropKind.Class ||
    prop.kind === PropKind.Interface ||
    prop.kind === PropKind.Type ||
    prop.kind === PropKind.Object ||
    prop.kind === PropKind.Component
  );
};
export type ObjectLikeProp = ClassLikeProp | EnumProp | ObjectProp | IndexProp;

/**
 * ObjectLikeProp predicate to determine if a prop is object-like
 */
export const isObjectLikeProp = (prop: PropType): prop is ObjectLikeProp => {
  return (
    isClassLikeProp(prop) ||
    prop.kind === PropKind.Index ||
    prop.kind === PropKind.Enum ||
    prop.kind === PropKind.Object
  );
};

/**
 * diagnostics row data
 */
export type PropDiagnostic = {
  /**
   * error category
   */
  category: ts.DiagnosticCategory;
  /**
   * error text message
   */
  message: string;
  /**
   * source code line of the error
   */
  row?: number;
  /**
   * source code column of the error
   */
  column?: number;
  /**
   * source file name
   */
  fileName?: string;
};

/**
 * Top-level prop type, with added optional __helpers and __diagnostics fields.
 */
export type PropTypes =
  /**
   * Object of parsed symbol properties. The key is the import name, while the prop.name is the actual symbol name.
   */
  Record<string, PropType> & {
    /**
     * Utility symbols such as parent types are stored here.
     * Only available if option collectHelpers is set to true.
     */
    __helpers?: Record<string, PropType>;
    /**
     * Typescript program diagnostics / errors.
     * Only available if option collectDiagnostics is set to true.
     */
    __diagnostics?: PropDiagnostic[];
  };

/**
 * Helper class to extract jsdoc comments from typescript compiler
 */
export type JSDocInfoType = {
  comment?: ts.JSDocTag['comment'];
};

/**
 * assign the value of a property, with type conversion
 * @param prop the input property
 * @param value the value as a string
 * @returns the modified property
 */
export const propValue = (prop: PropType, value?: string): PropType => {
  if (typeof value !== 'undefined') {
    if (isNumberProp(prop)) {
      prop.value = Number(value);
    } else if (isBooleanProp(prop)) {
      prop.value = Boolean(value);
    } else {
      (prop as StringProp).value = value;
    }
  }
  return prop;
};

/**
 * remove single and double quotes around a string
 * @param txt the input text
 * @returns the text without the enclosing quotes
 */
export const trimQuotes = (txt: string): string =>
  txt ? txt.replace(/['"]+/g, '') : txt;

export const strValue = (value: string): any => {
  switch (value) {
    case 'undefined':
      return undefined;
    case 'null':
      return null;
    case 'false':
      return false;
    case 'true':
      return true;
    default:
      return value;
  }
};
