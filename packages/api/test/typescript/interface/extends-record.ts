interface Base {
  n?: Record<string, { a: boolean }>;
}
export interface Props extends Base {
  /**
   * interface member property
   * @default 'hello'
   */
  m: string;
}
