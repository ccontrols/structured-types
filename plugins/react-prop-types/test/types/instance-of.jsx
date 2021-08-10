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
export const MyComponent = ({ aPerson }) => <div>{aPerson.name}</div>;

MyComponent.propTypes = {
  aPerson: PropTypes.instanceOf(Person).isRequired,
};
