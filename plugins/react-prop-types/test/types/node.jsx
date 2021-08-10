import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalNode }) => <div>{optionalNode}</div>;

MyComponent.propTypes = {
  /** optional node prop description */
  optionalNode: PropTypes.node,
};
