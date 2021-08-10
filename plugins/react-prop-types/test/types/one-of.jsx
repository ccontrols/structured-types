import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalUnion }) => <div>{optionalUnion}</div>;

MyComponent.propTypes = {
  /** optional union prop description */
  optionalUnion: PropTypes.oneOf(['News', 'Photos']),
};
