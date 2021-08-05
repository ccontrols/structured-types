import React from 'react';

const logProps = (
  WrappedComponent: React.ComponentType,
): React.ComponentType => {
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

type OwnProps = {
  stringProp?: string;
};

const MyComponent: React.FunctionComponent<OwnProps> = (props) => (
  <span>Hello, {props.stringProp}!</span>
);

export const NamedImport = logProps(MyComponent);

export default logProps(MyComponent);
