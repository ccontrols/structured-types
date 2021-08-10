import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ Component }) => <Component />;

MyComponent.propTypes = {
  /** elementType prop description */
  Component: PropTypes.elementType.isRequired,
};
