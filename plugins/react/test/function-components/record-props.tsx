import React from 'react';

export interface MyProps {
  first: Record<string, string>;
  second?: Record<string, string>;
}

export default function MyComponent({ first = {}, second = {} }: MyProps) {
  return <div {...first} {...second} />;
}
