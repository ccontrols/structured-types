//@flow
import * as React from 'react';

type Props = {
  foo: number;
  bar?: string;
};

export function MyComponent(props: Props): React.ReactNode {
  return <div>{props.bar}</div>;
}
