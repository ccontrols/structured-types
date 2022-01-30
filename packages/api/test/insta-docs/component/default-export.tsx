import React from 'react';

/**
 * component properties
 */
export interface MyComponentProps {
  /**
   * optional name string property
   */
  name?: string;
}
const MyComponent: React.FC<MyComponentProps> = ({
  name = 'some default text',
}) => <div>{name}</div>;

export default MyComponent;
