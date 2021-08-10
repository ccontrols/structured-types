import React from 'react';
import PropTypes from 'prop-types';

const logProps = (WrappedComponent) => {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // eslint-disable-next-line react/display-name
  return (props) => <LogProps {...props} />;
};

/**
 * MyComponent special component
 */
const MyComponent = ({ stringProp }) => <div>{stringProp}</div>;

MyComponent.propTypes = {
  /** stringProp description */
  stringProp: PropTypes.string,
  /** numberProp description */
  numberProp: PropTypes.number.isRequired,
};

MyComponent.defaultProps = {
  stringProp: 'test',
};

export const NamedClassImport = logProps(logProps(logProps(MyComponent)));
