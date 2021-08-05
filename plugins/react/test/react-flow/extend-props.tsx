//@flow
import * as React from 'react';

type DefaultProps = {|
  foo: number,
|}

type Props = {
  ...DefaultProps,
  bar?: string;
};

export class MyComponent extends React.Component<Props> {
  render() {
    return <div>{this.props.bar}</div>;
  }
}
