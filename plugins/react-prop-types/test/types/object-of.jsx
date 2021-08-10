import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalObj }) => (
  <div>{JSON.stringify(optionalObj)}</div>
);

MyComponent.propTypes = {
  /** optional object prop description */
  optionalObj: PropTypes.objectOf(PropTypes.number),
};
