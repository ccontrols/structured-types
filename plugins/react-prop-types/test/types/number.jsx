import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalNumber = 2 }) => (
  <div>{optionalNumber.toString()}</div>
);

MyComponent.propTypes = {
  /** optional number prop description */
  optionalNumber: PropTypes.number,
};
