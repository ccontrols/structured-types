//@flow
import * as React from 'react';

type Props = {
  foo: number;
  bar?: string;
};

export class MyComponent extends React.Component<Props> {
  render() {
    return <div>{this.props.bar}</div>;
  }
}
