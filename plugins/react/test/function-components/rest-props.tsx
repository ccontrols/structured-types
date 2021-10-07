import React from 'react';

interface Props {
  stringProp: string;
  boolProp: boolean;
}

export const MyComponent: React.FC<Props> = ({ stringProp, ...props }) => {
  return <span {...props}>Hello, {stringProp}!</span>;
};
