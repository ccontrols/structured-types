import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalArrayOf }) => (
  <div>{optionalArrayOf}</div>
);

MyComponent.propTypes = {
  /** optional arrayOf prop description */
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
};
