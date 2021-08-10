import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
class MyComponent extends Component {
  render() {
    const { stringProp } = this.props;
    return <div>{stringProp}</div>;
  }
}

MyComponent.propTypes = {
  /** stringProp description */
  stringProp: PropTypes.string,
  /** numberProp description */
  numberProp: PropTypes.number.isRequired,
};

MyComponent.defaultProps = {
  stringProp: 'test',
};

export default MyComponent;
