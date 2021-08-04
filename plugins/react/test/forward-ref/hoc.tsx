import React from 'react';

type OwnProps = {
  stringProp?: string;
};
// eslint-disable-next-line react/display-name
const FancyButton = React.forwardRef<HTMLButtonElement, OwnProps>(
  (props, ref) => (
    <button ref={ref} title={props.stringProp}>
      {props.children}
    </button>
  ),
);

function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  return React.forwardRef(forwardRef);
}

export default logProps(FancyButton);
