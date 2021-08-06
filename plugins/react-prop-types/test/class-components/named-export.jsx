import React, { Component } from 'react';
import PT from 'prop-types';

/**
 * MyComponent special component
 */
export class MyComponent extends Component {
  render() {
    const { stringProp } = this.props;
    return <div>{stringProp}</div>;
  }
}

MyComponent.propTypes = {
  /** stringProp description */
  stringProp: PT.string,
  /** numberProp description */
  numberProp: PT.number.isRequired,
};

MyComponent.defaultProps = {
  stringProp: 'test',
};
