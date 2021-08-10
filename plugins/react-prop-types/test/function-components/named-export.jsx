import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ stringProp }) => <div>{stringProp}</div>;

MyComponent.propTypes = {
  /** stringProp description */
  stringProp: PropTypes.string,
  /** numberProp description */
  numberProp: PropTypes.number.isRequired,
};

MyComponent.defaultProps = {
  stringProp: 'test',
};
