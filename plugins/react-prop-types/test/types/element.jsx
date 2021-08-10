import React from 'react';
import PropTypes from 'prop-types';

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalElement }) => (
  <div>{optionalElement}</div>
);

MyComponent.propTypes = {
  /** optional element prop description */
  optionalElement: PropTypes.element,
};
