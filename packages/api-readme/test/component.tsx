import React, { FC } from 'react';
/**
 * MyComponent properties.
 */
type OwnProps = {
  /** stringProp description */
  stringProp?: string;

  /**
   * numberProp description
   * @default 4
   */
  numberProp: number;
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
