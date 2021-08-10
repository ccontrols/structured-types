import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalArray }) => (
  <div>
    {optionalArray.map((t) => (
      <span key={t}>{t}</span>
    ))}
  </div>
);

MyComponent.propTypes = {
  /** optional Array prop description */
  optionalArray: PropTypes.array,
};
