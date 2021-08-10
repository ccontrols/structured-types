import React from 'react';
import PropTypes from 'prop-types';

/**
 * Creates a new Person.
 */
class Person {
  /**
   * name of a person is a string
   * @type {string}
   */
  name;
}

/**
 * MyComponent special component
 */
export const MyComponent = ({ optionalUnion }) => <div>{optionalUnion}</div>;

MyComponent.propTypes = {
  /** optional union prop description */
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Person),
  ]),
};
