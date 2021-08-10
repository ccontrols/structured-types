import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalfunc }) => (
  <div onClick={optionalfunc}>click me</div>
);

MyComponent.propTypes = {
  /** optional func prop description */
  optionalfunc: PropTypes.func,
};
