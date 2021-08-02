/**
 * this is type Children
 */
type Children = {
  parent: Parent;
  /**
   * self-referencing items
   */
  items?: Children[];
};

/**
 * this is type Parent
 */
export type Parent = {
  /**
   * child elements
   */
  children?: Children[];
};
