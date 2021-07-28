export type Examples = {
  [name: string]: string | Examples;
};

export const examples: Examples = {
  jsdoc: {
    '@class': {
      'function-class.js':
        '/**\n * Creates a new Person.\n * @class\n */\nexport function Person() {}\n',
    },
    '@description': {
      'comment.js':
        '/**\n * Add two numbers.\n */\nexport function add(a, b) {\n  return a + b;\n}\n',
      'desc-tag.js':
        '/**\n * @desc Add two numbers.\n */\nexport function add(a, b) {\n  return a + b;\n}\n',
      'description-tag.js':
        '/**\n * @description Add two numbers.\n */\nexport function add(a, b) {\n  return a + b;\n}\n',
    },
    '@enum': {
      'numeric-enum.js':
        '/**\n * Enum for tri-state values.\n * @readonly\n * @enum {number}\n */\nexport const triState = {\n  /** The true value */\n  TRUE: 1,\n  FALSE: -1,\n  /** @type {boolean} */\n  MAYBE: true,\n};\n',
    },
    '@example': {
      'caption.js':
        '/**\n * Solves equations of the form a * x = b\n * @example <caption>Example usage of method1.</caption>\n * // returns 2\n * globalNS.method1(5, 10);\n * @returns {number} Returns the value of x for the equation.\n */\nexport function method1(a, b) {\n  return b / a;\n}\n',
      'examples.js':
        '/**\n * Solves equations of the form a * x = b\n * @example\n * // returns 2\n * globalNS.method1(5, 10);\n * @example\n * // returns 3\n * globalNS.method(5, 15);\n * @returns {number} Returns the value of x for the equation.\n */\nexport const method1 = (a, b) => {\n  return b / a;\n};\n',
    },
    '@fires': {
      'fire-event.js':
        '/**\n * Drink the milkshake.\n *\n * @fires Milkshake#drain\n */\nexport const Milkshake = {\n  drink: function() {},\n};\n',
    },
    '@ignore': {
      'class-ignore.js':
        "/**\n * @class\n * @ignore\n */\nexport function Jacket() {\n  /** The jacket's color. */\n  this.color = null;\n}\n",
      'member-ignore.js':
        "export var Clothes = {\n  /**\n   * @class\n   * @ignore\n   */\n  Jacket: function() {\n    /** The jacket's color. */\n    this.color = null;\n  },\n};\n",
    },
    '@interface': {
      'interface.js':
        "/**\n * Interface for classes that represent a color.\n *\n * @interface\n */\nexport function Color() {}\n\n/**\n * Get the color as an array of red, green, and blue values, represented as\n * decimal numbers between 0 and 1.\n *\n * @returns {Array<number>} An array containing the red, green, and blue values,\n * in that order.\n */\nColor.prototype.rgb = function() {\n  throw new Error('not implemented');\n};\n",
    },
    '@license': {
      'apache-2.js':
        "/**\n * Utility functions for the foo package.\n * @module foo/util\n * @license Apache-2.0\n */\nexport const util = () => '';\n",
      'full-license.js':
        '/**\n * @license\n * Copyright (c) 2015 Example Corporation Inc.\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in all\n * copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n */\n\nexport const util = () => \'\';\n',
    },
    '@link': {
      'link-text.js':
        "/**\n * See {@link MyClass} and [MyClass's foo property](MyClass#foo).\n * Also, check out {@link http://www.google.com|Google} and\n * {@link https://github.com GitHub}.\n */\nexport function myFunction() {}\n",
    },
    '@param': {
      'default-numeric.js':
        '/** @param {number} [x=1] d4 damage */\nexport function m(x) {}\n',
      'default-string.js':
        "/**\n * @param {string} [somebody=John Doe] - Somebody's name.\n */\nexport function sayHello(somebody) {\n  if (!somebody) {\n    somebody = 'John Doe';\n  }\n  alert('Hello ' + somebody);\n}\n",
      'just-param.js':
        "/**\n * @param somebody\n */\nexport function sayHello(somebody) {\n  alert('Hello ' + somebody);\n}\n",
      'name-type-description.js':
        "/**\n * @param {string} somebody Somebody's name.\n */\nexport function sayHello(somebody) {\n  alert('Hello ' + somebody);\n}\n",
      'name-type.js':
        "/**\n * @param {string} somebody\n */\nexport function sayHello(somebody) {\n  alert('Hello ' + somebody);\n}\n",
      'optional.js':
        "/**\n * An optional parameter (using JSDoc syntax)\n * @param {string} [somebody] - Somebody's name.\n */\nexport function sayHello(somebody) {\n  if (!somebody) {\n    somebody = 'John Doe';\n  }\n  alert('Hello ' + somebody);\n}\n",
      'with-hyphen-description.js':
        "/**\n * @param {string} somebody - Somebody's name.\n */\nexport function sayHello(somebody) {\n  alert('Hello ' + somebody);\n}\n",
    },
    '@property': {
      'enum.js':
        "/**\n * @typedef {Object} Food\n * @property {string} name - What the food should be called\n * @property {('meat' | 'veggie' | 'other')} type - The food's type\n */\n\nexport const food = {\n  name: 'beef',\n  type: 'meat',\n};\n",
      'nested.js':
        "/**\n * @typedef Config\n * @property {object}  defaults               - The default values for parties.\n * @property {number}  defaults.players       - The default number of players.\n * @property {string}  defaults.level         - The default level for the party.\n * @property {object}  defaults.treasure      - The default treasure.\n * @property {number}  defaults.treasure.gold - How much gold the party starts with.\n */\nexport const config = {\n  defaults: {\n    players: 1,\n    level: 'beginner',\n    treasure: {\n      gold: 0,\n    },\n  },\n};\n",
      'optional.js':
        "/**\n * User type definition\n * @typedef {Object} User\n * @property {string} email\n * @property {string} [nickName]\n */\n\nexport const user = {\n  email: 's',\n};\n",
    },
    '@see': {
      'inline-link.js':
        '/**\n * @see {@link foo} for further information.\n * @see {@link https://github.com|GitHub}\n */\nexport function bar() {}\n',
      'internal-link.js':
        '/**\n * Both of these will link to the bar function.\n * @see {@link bar}\n * @see bar\n */\nexport function foo() {}\n',
      'pure-url.js':
        "/**\n * external link documentation\n * @see https://reactjs.org/docs/context.html\n */\n\nexport const bar = () => '';\n",
    },
    '@summary': {
      'summary.js':
        '/**\n * A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,\n * profuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,\n * loquacious, garrulous, chatty, extended, babbling description.\n * @summary A concise summary.\n */\nexport function bloviate() {}\n',
    },
    '@type': {
      'number.js': '/** @type {number} */\nexport var bar = 1;\n',
      'union.js': '/** @type {(string|Array)} */\nexport var foo;\n',
    },
    function: {
      'multiple-types.js':
        '/**\n * Returns the sum of a and b\n * @param {number} a\n * @param {number} b\n * @param {boolean} retArr If set to true, the function will return an array\n * @returns {(number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b.\n */\nexport function sum(a, b, retArr) {\n  if (retArr) {\n    return [a, b, a + b];\n  }\n  return a + b;\n}\n',
      'return-description.js':
        '/**\n * Returns the sum of a and b\n * @param {number} a\n * @param {number} b\n * @returns {number} Sum of a and b\n */\nexport function sum(a, b) {\n  return a + b;\n}\n',
      'return-promise.js':
        '/**\n * Returns the sum of a and b\n * @param {number} a\n * @param {number} b\n * @returns {Promise} Promise object represents the sum of a and b\n */\nexport function sumAsync(a, b) {\n  return new Promise(function(resolve, reject) {\n    resolve(a + b);\n  });\n}\n',
      'return-type.js':
        '/**\n * Returns the sum of a and b\n * @param {number} a\n * @param {number} b\n * @returns {number}\n */\nexport function sum(a, b) {\n  return a + b;\n}\n',
      'tags-function.js':
        "/**\n * sum api function\n * @remarks\n * Unlike the summary, the remarks block may contain lengthy documentation content.\n * The remarks should not restate information from the summary, since the summary section\n * will always be displayed wherever the remarks section appears.  Other sections\n * (e.g. an `@example` block) will be shown after the remarks section.\n *\n * @param {number} a first parameter to add\n * @param {number} b second parameter to add\n * @returns {number} the sum of the two parameters\n *\n * @example\n *\n * ```js\n * import { sum } from './sum';\n *\n * expect(sum(1, 2)).toMatchObject({ a: 1, b: 2, result: 3});\n * ```\n */\nexport const sum = (a, b = 1) => ({ a, b, result: a + b });\n",
    },
    modifiers: {
      'private.js':
        'export const Documents = {\n  /**\n   * An ordinary newspaper.\n   */\n  Newspaper: 1,\n  /**\n   * My diary.\n   * @private\n   */\n  Diary: 2,\n};\n',
      'protected.js':
        'export const Documents = {\n  /**\n   * An ordinary newspaper.\n   */\n  Newspaper: 1,\n  /**\n   * My diary.\n   * @protected\n   */\n  Diary: 2,\n};\n',
      'public.js':
        'export const Documents = {\n  /**\n   * An ordinary newspaper.\n   */\n  Newspaper: 1,\n  /**\n   * My diary.\n   * @public\n   */\n  Diary: 2,\n};\n',
      'readonly.js':
        "/**\n * Options for ordering a delicious slice of pie.\n */\nexport const pieOptions = {\n  /**\n   * Plain.\n   */\n  plain: 'pie',\n  /**\n   * A la mode.\n   * @readonly\n   */\n  get aLaMode() {\n    return this.plain + ' with ice cream';\n  },\n};\n",
    },
  },
  typescript: {
    any: {
      'export-const.ts':
        "/**\n * this is any type\n */\nexport const a: any = 'as';\n",
    },
    array: {
      'array-keyword.ts':
        "/**\n * Array keyword of type string initialized\n */\nexport const ArrayKeyword: Array<string> = ['test'];\n",
      'array-new.ts':
        "/**\n * create a new array object\n */\nexport const ArrayNew = ['red', 'green', 'blue'];\n",
      'initialized-strings.ts':
        "/**\n * const array of strings\n */\nexport const names = ['Alice', 'Bob', 'Eve'];\n",
      'objects.ts':
        'interface Internal {\n  m: string;\n}\n/**\n * type array of interface type\n * @deprecated\n */\nexport type arrType = Internal[];\n',
      'string-const.ts':
        "/**\n * this is an array of strings\n */\nexport const arrString: string[] = ['one', 'two'];\n",
    },
    boolean: {
      'initialized-false.ts':
        '/**\n * boolean variable initialized to false\n */\nexport const bool = false;\n',
      'initialized-true.ts':
        '/**\n * boolean variable initialized to true\n */\nexport const bool = true;\n',
      'named-export.ts': 'const bool: boolean = true;\nexport { bool };\n',
    },
    class: {
      'arrow-function.ts':
        "export class ArrowFunctionClass {\n  /**\n   * name value initialzied\n   */\n  name = 'MyClass';\n  /**\n   * name accessor\n   * @returns a string value\n   */\n  getName = (): string => {\n    return this.name;\n  };\n}\n",
      'constructor.ts':
        'export class ClassWithConstrunctor {\n  name: string;\n\n  /**\n   * constructor description\n   */\n  constructor(x?: string) {\n    this.name = x;\n  }\n}\n',
      'getters-setters.ts':
        'export class ClassGetters {\n  /**\n   * member description\n   */\n  _length = 0;\n  /**\n   * getter description\n   */\n  get length(): number {\n    return this._length;\n  }\n  /**\n   * setter description\n   *\n   * @param value the new value\n   */\n  set length(value: number) {\n    this._length = value;\n  }\n}\n',
      'index-signature.ts':
        'export class ClassIndexSignature {\n  /**\n   * class index\n   */\n  [s: string]: boolean | ((s: string) => boolean);\n\n  /**\n   *\n   * @param s input string\n   * @returns {boolean} returns the value\n   */\n  check(s: string) {\n    return this[s] as boolean;\n  }\n}\n',
      'initialized-props.ts':
        "export class GreeterInitializedMembers {\n  readonly name: string = 'world';\n  err(): void {\n    console.log(this.name);\n  }\n}\n",
      'member-visibility.ts':
        '/* eslint-disable @typescript-eslint/no-empty-function */\n/* eslint-disable @typescript-eslint/explicit-module-boundary-types */\nexport class MemberVisibikity {\n  /**\n   * a public method\n   */\n  public method1() {}\n  /**\n   * a protected method\n   */\n\n  protected method2() {}\n  /**\n   * a private method\n   */\n\n  private method3() {}\n}\n',
      'param-modifiers.ts':
        'export class ParameterModifiers {\n  /**\n   * constructor implementation\n   * @param x x coordinate\n   * @param y y coordinate\n   * @param z z coordinate\n   */\n  constructor(\n    public readonly x: number,\n    protected y: number,\n    private z: number,\n  ) {\n    // No body necessary\n  }\n}\n',
      'simple.ts':
        '/**\n * this is a class with two members\n */\nexport class Point {\n  /**\n   * COORDINATE X\n   */\n  x: number;\n  /**\n   * COORDINATE Y\n   */\n  y: number;\n}\n',
      'static-members.ts':
        '/* eslint-disable @typescript-eslint/no-empty-function */\n/* eslint-disable @typescript-eslint/explicit-module-boundary-types */\nexport class ClassStatic {\n  static x = 0;\n  static printX() {}\n}\n',
    },
    enum: {
      'initialized.ts':
        '/**\n * this is an enum with an initialized element\n */\nexport enum InitializedEnum {\n  /**\n   * enum starts at 1\n   */\n  Up = 1,\n  /**\n   * second element\n   */\n  Down,\n  Left,\n  Right,\n}\n',
      'string-enum.ts':
        "/**\n * string values enum\n */\nexport enum StringEnums {\n  Up = 'UP',\n  Down = 'DOWN',\n  Left = 'LEFT',\n  /**\n   * right enum property\n   */\n  Right = 'RIGHT',\n}\n",
    },
    function: {
      'arrow-function.ts':
        '/**\n * arrow greeting function\n */\nexport const arrowGreet = (\n  /**\n   * name parameter inline description\n   */\n  name: string,\n): void => {};\n',
      'extends-parameter.ts':
        '/**\n * base type\n */\ntype T = {\n  /**\n   * base type member property\n   */\n  m: string;\n};\n\n/**\n * extended type\n */\n\ntype ExtendT = T & {\n  /**\n   * own member\n   */\n  honey: boolean;\n};\n\n/**\n * internal interface with one member\n */\n\ninterface Internal {\n  /**\n   * string type member\n   */\n\n  m: string;\n}\n/**\n * interface extending another one\n */\n\ninterface Bear extends Internal, Home {\n  /**\n   * boolean type member\n   */\n\n  honey: boolean;\n}\n/**\n * exported function\n */\n\nexport function paintHomeyBear({ m, honey = true }: ExtendT): Bear {\n  return { honey, m };\n}\n',
      'function-props.ts':
        "export function fn(): void {}\n/**\n * custom property for a function\n */\n\nfn.customProp = 'my custom prop';\n",
      'generic-parameter.ts':
        'interface GenericInterface<T> {\n  m: T;\n}\nexport function genericFunction<Type>(\n  box: GenericInterface<Type>,\n  newContents: Type,\n): GenericInterface<Type> {}\n',
      'jsdoc-parameter.ts':
        '/**\n * greeting function\n * @param name string type parameters\n */\nexport function greet(name: string) {}\n',
      'object-parameter.ts':
        '/**\n * print coordinates\n * @param pt object parameter\n */\n\nexport function printCoord(pt: {\n  /**\n   * x coordinate\n   */\n  x: number;\n  /**\n   * optional y coordinate\n   */\n  y?: number;\n}): void {}\n',
      'react-fc.ts':
        "import React, { FC } from 'react';\ninterface Props {\n  m?: string;\n}\nexport const TypedInitializedFunction: FC<Props> = props => {};\n",
      'spread-tuple-parameter.ts':
        'export const spreadTupleFunction = (\n  ...args: [string, number, ...boolean[]]\n): void => {};\n',
      'tuple-parameter.ts':
        'export function distanceFromOrigin([x, y]: [number, number]): number {}\n',
      'union-parameter.ts':
        'const printId = (id: number | string): void => {};\nexport { printId };\n',
    },
    interface: {
      'array-implementation.ts':
        'export interface InterfaceArrayType<Type> {\n  /**\n   * Gets or sets the length of the array.\n   */\n  length: number;\n  /**\n   * Removes the last element from an array and returns it.\n   */\n  pop(): Type | undefined;\n  /**\n   * Appends new elements to an array, and returns the new length of the array.\n   */\n  push(...items: Type[]): number;\n}\n',
      'combined-props.ts':
        "export interface StringNumberPair {\n  /**\n   *  specialized properties\n   */\n  length: 2;\n  0: string;\n  1: number;\n  /**\n   *  Other 'Array<string | number>' members...\n   */\n  slice(start?: number, end?: number): Array<string | number>;\n}\n",
      'enum-prop.ts':
        "enum StringEnums {\n  Up = 'UP',\n}\nexport interface InterfaceWithEnumConstant {\n  /**\n   * kind is an enumm constant\n   */\n  kind: StringEnums.Up;\n  /**\n   * radius property\n   */\n  radius: number;\n}\n",
      'extends.ts':
        'interface Home {\n  resident: { name: string; age: number };\n}\n/**\n * internal interface with one member\n */\n\ninterface Internal {\n  /**\n   * string type member\n   */\n\n  m: string;\n}\n/**\n * interface extending another one\n */\n\nexport interface Bear extends Internal, Home {\n  /**\n   * boolean type member\n   */\n\n  honey: boolean;\n}\n',
      'generics.ts':
        'export interface GenericInterface<Type> {\n  contents: Type;\n}\n',
      'index-prop.ts':
        'export interface IndexInterface {\n  [index: number]: string;\n}\n',
      'jsdoc-default.ts':
        "export interface Interface {\n  /**\n   * union prop\n   * @default bread\n   */\n  eat: 'honey' | 'bread' | 'meat';\n}\n",
      'simple.ts':
        '/**\n * this is interface\n * multiple lines\n */\nexport interface I {\n  /**\n   * interface member property\n   */\n  m: string;\n}\n',
    },
    number: {
      'default-export.ts':
        'let mynumber: number;\n/**\n * export default variable\n */\nexport default mynumber;\n',
      'initializer.ts':
        '/**\n * initialiazed number variable\n */\nexport const myNum = 3.14;\n',
      'named-export.ts': 'let mynumber: number;\nexport { mynumber as num };\n',
    },
    object: {
      'export-const.ts':
        '/**\n * exported undefined object\n */\nexport const obj: object = undefined;\n',
      'initialized.ts':
        "/**\n * initialized object\n */\nexport const initializedObj: object = { a: 12, b: 'test' };\n",
    },
    string: {
      'default-export.ts':
        'let mystring: string;\n/**\n * export default variable\n */\n\nexport default mystring;\n',
      'initializer.ts':
        "/**\n * initialiazed string variable\n */\nexport const s = 'a';\n",
      'named-export.ts': 'let mystring: string;\nexport { mystring as str };\n',
    },
    tuple: {
      'optional-member.ts':
        '/**\n * tuple with an optional member\n */\nexport type OptionalTuple = [boolean, string, number?];\n',
      'simple.ts':
        '/**\n * simple tuple\n */\nexport type Tuple = [string, number];\n',
      'spread-member.ts':
        '/**\n * spread member of tuple\n */\nexport type SpreadTuple = [...boolean[], string, number];\n',
    },
    type: {
      'extend-type.ts':
        '/**\n * base type\n */\ntype T = {\n  /**\n   * base type member property\n   */\n  m: string;\n};\n\n/**\n * extended type\n */\n\nexport type ExtendT = T & {\n  /**\n   * own member\n   */\n  honey: boolean;\n};\n',
      'generic-array.ts': 'export type GenericArrayType<Type> = Type[];\n',
      'generic-type.ts':
        'export type GenericType<Type> = {\n  contents: Type;\n};\n',
      'generics.ts':
        '/**\n * upstream interface\n */\n\ninterface GenericInterface<Type> {\n  /**\n   * interface prop\n   */\n\n  m: Type;\n}\n\n/**\n * reference type description\n */\n\nexport type GenericConsumer = GenericInterface<string>;\n',
      'index-prop.ts':
        'export type IndexT = {\n  /**\n   * type index property\n   */\n  [index: string]: { a: Bear; b: null };\n  /**\n   * this is an additional name prop\n   */\n\n  name?: string;\n};\n',
      'initialized.ts':
        "/**\n * this is an object\n */\nexport const obj: {\n  /**\n   * field a\n   */\n\n  a: string;\n  /**\n   * field b\n   */\n\n  b?: number;\n} = { a: 'field a' };\n",
      'intersection.ts':
        '/** type A */\ntype A = {\n  a: string;\n};\n/**\n * type B\n */\n\ntype B = {\n  b: number;\n};\n/** intersect type */\nexport type Intersect = A & B;\n',
      'nested-generic.ts':
        "type UnionGenericType<Type> = Type | 'a string';\n\n/**\n * generic interface\n */\n\ntype GenericArrayType<Type> = {\n  /**\n   * member field\n   */\n\n  m: Type;\n};\nexport type NestedGenericType<Type> = GenericArrayType<UnionGenericType<Type>>;\n",
      'simple.ts':
        '/**\n * this is type\n */\nexport type T = {\n  /**\n   * type member property\n   */\n  m: string;\n};\n',
      'union-generic.ts': 'export type UnionGenericType<Type> = Type | null;\n',
    },
    union: {
      'export-const.ts':
        "/**\n * strings union\n */\nexport type union = 'this' | 1 | false | null | undefined;\n",
    },
    unknown: {
      'export-const.ts':
        '/**\n * named export unknown type\n */\nexport const a: unknown = undefined;\n',
    },
  },
  react: {
    'class-components': {
      'alias-component.tsx':
        "import React, { Component as C } from 'react';\n\nexport class MyComponent extends C<{ name: string }> {\n  render() {\n    return <span>Hello, {this.props.name}!</span>;\n  }\n}\n",
      'composed-props.tsx':
        "import React, { Component, BaseHTMLAttributes } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n  /**\n   * function props description\n   */\n  fnProp: () => void;\n\n  /**\n   * unionProp description\n   * @deprecated since version 1.0\n   */\n  unionProp: 'option1' | 'option2' | 'option3';\n} & BaseHTMLAttributes<HTMLDivElement>;\n\n/**\n * MyComponent special component\n */\n\nexport class MyComponent extends Component<OwnProps> {\n  render(): React.ReactNode {\n    const { stringProp } = this.props;\n    return <div>{stringProp}</div>;\n  }\n}\n",
      'default-export.tsx':
        "import React, { Component } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nclass MyComponent extends Component<OwnProps> {\n  render(): React.ReactNode {\n    const { stringProp } = this.props;\n    return <div>{stringProp}</div>;\n  }\n}\n\nexport default MyComponent;\n",
      'default-props-field.tsx':
        "import React, { Component } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nclass MyComponent extends Component<OwnProps> {\n  render(): React.ReactNode {\n    const { stringProp } = this.props;\n    return <div>{stringProp}</div>;\n  }\n}\n\nMyComponent.defaultProps = {\n  stringProp: 'test',\n};\n\nexport default MyComponent;\n",
      'default-props-static.tsx':
        "import React, { Component } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nexport class MyComponent extends Component<OwnProps> {\n  static defaultProps = {\n    stringProp: 'test',\n  };\n  render(): React.ReactNode {\n    const { stringProp } = this.props;\n    return <div>{stringProp}</div>;\n  }\n}\n",
      'display-name-field.tsx':
        "import React, { Component } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nclass MyComponent extends Component<OwnProps> {\n  render(): React.ReactNode {\n    const { stringProp } = this.props;\n    return <div>{stringProp}</div>;\n  }\n}\n\nMyComponent.defaultProps = {\n  stringProp: 'test',\n};\n\nMyComponent.displayName = 'CustomComponentName';\n\nexport default MyComponent;\n",
      'display-name-static.tsx':
        "import React, { Component } from 'react';\n/**\n * MyComponent special component\n */\nexport class MyComponent extends Component {\n  static displayName = 'CustomComponentName';\n  render(): React.ReactNode {\n    return null;\n  }\n}\n",
      hoc: {},
      'inline-props.tsx':
        "import React from 'react';\n\nexport class MyComponent extends React.Component<{ name: string }> {\n  render() {\n    return <span>Hello, {this.props.name}!</span>;\n  }\n}\n",
      'named-component.tsx':
        "import React, { Component } from 'react';\n\nexport class MyComponent extends Component<{ name: string }> {\n  render() {\n    return <span>Hello, {this.props.name}!</span>;\n  }\n}\n",
      'named-export.tsx':
        "import React, { Component } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nexport class MyComponent extends Component<OwnProps, Record<string, unknown>> {\n  render(): React.ReactNode {\n    const { stringProp } = this.props;\n    return <div>{stringProp}</div>;\n  }\n}\n",
      'pure-component.tsx':
        "import React, { PureComponent } from 'react';\n\nexport class MyComponent extends PureComponent<{ name: string }> {\n  render() {\n    return <span>Hello, {this.props.name}!</span>;\n  }\n}\n",
      'star-import.tsx':
        "import * as R from 'react';\n\nexport class MyComponent extends R.Component<{ name: string }> {\n  render() {\n    return <span>Hello, {this.props.name}!</span>;\n  }\n}\n",
    },
    'function-components': {
      'default-props.tsx':
        "import React, { FC } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nconst MyComponent: FC<OwnProps> = ({ stringProp }) => <div>{stringProp}</div>;\n\nMyComponent.defaultProps = {\n  stringProp: 'test',\n};\n\nexport default MyComponent;\n",
      'display-name.tsx':
        "import React, { FC } from 'react';\n/**\n * MyComponent properties.\n */\ntype OwnProps = {\n  /** stringProp description */\n  stringProp?: string;\n\n  /** numberProp description */\n  numberProp: number;\n};\n\n/**\n * MyComponent special component\n */\nconst MyComponent: FC<OwnProps> = ({ stringProp }) => <div>{stringProp}</div>;\n\nMyComponent.displayName = 'CustomComponentName';\n\nexport default MyComponent;\n",
      'function-inline-props.tsx':
        "import React from 'react';\n\nexport function MyComponent({\n  name = 'hello',\n}: {\n  name?: string;\n}): React.ReactNode {\n  return <span>Hello, {name}!</span>;\n}\n",
      'inline-props.tsx':
        "import React from 'react';\n\nexport const MyComponent = ({\n  name = 'hello',\n}: {\n  name?: string;\n}): React.ReactNode => <span>Hello, {name}!</span>;\n",
      'no-props.tsx':
        "import React from 'react';\n\nexport const MyComponent = () => <span>Hello</span>;\n",
      'omit-props.tsx':
        "import React from 'react';\n\ninterface PrimitmiveProps {\n  stringProp: string;\n  boolProp: boolean;\n}\ntype OmitProps = Omit<PrimitmiveProps, 'boolProp'>;\ntype ComponentProps = OmitProps & {\n  prop1?: 'this' | 'that';\n};\n\nexport const MyComponent: React.FC<ComponentProps> = props => {\n  return <span>Hello, {props.stringProp}!</span>;\n};\n",
      'pick-props.tsx':
        "import React, { BaseHTMLAttributes } from 'react';\n/**\n * MyComponent special component\n */\n\nexport const MyComponent = (\n  props: Pick<BaseHTMLAttributes<HTMLDivElement>, 'style'>,\n) => <div {...props}>Hello</div>;\n",
      'typed-props.tsx':
        "import React from 'react';\n\n/**\n * special react component\n */\nexport const MyComponent: React.FC<{\n  /**\n   * optional string prop\n   */\n  name?: string;\n  /**\n   * a required number prop\n   */\n  numProp: number;\n}> = ({ name = 'hello' }) => <span>Hello, {name}!</span>;\n",
    },
  },
};
