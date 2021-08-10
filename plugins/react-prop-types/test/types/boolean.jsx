import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalBool = false }) => (
  <div>{optionalBool.toString()}</div>
);

MyComponent.propTypes = {
  /** optional bool prop description */
  optionalBool: PropTypes.bool,
};
