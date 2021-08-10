import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalString = 'hello' }) => (
  <div>{optionalString}</div>
);

MyComponent.propTypes = {
  /** optional string prop description */
  optionalString: PropTypes.string,
};
