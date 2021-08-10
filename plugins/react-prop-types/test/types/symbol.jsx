import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalSymbol }) => <div>{optionalSymbol}</div>;

MyComponent.propTypes = {
  /** optional symbol prop description */
  optionalSymbol: PropTypes.symbol,
};
