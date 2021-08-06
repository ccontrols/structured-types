import React, { Component } from 'react';
import PT from 'prop-types';

/**
 * MyComponent special component
 */
export class MyComponent extends Component {
  static propTypes = {
    /** stringProp description */
    stringProp: PT.string,
    /** numberProp description */
    numberProp: PT.number.isRequired,
  };
  static defaultProps = {
    stringProp: 'test',
  };
  render() {
    const { stringProp } = this.props;
    return <div>{stringProp}</div>;
  }
}
