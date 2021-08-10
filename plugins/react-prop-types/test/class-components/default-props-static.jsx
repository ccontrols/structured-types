import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export class MyComponent extends Component {
  static propTypes = {
    /** stringProp description */
    stringProp: PropTypes.string,
    /** numberProp description */
    numberProp: PropTypes.number.isRequired,
  };
  static defaultProps = {
    stringProp: 'test',
  };
  render() {
    const { stringProp } = this.props;
    return <div>{stringProp}</div>;
  }
}
