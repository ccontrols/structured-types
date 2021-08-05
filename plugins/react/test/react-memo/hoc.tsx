import React from 'react';

type OwnProps = {
  stringProp?: string;
};
// eslint-disable-next-line react/display-name
const FancyButton = React.memo<OwnProps>((props, ref) => (
  <button ref={ref} title={props.stringProp}>
    {props.children}
  </button>
));

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

  // eslint-disable-next-line react/display-name
  return (props) => <LogProps {...props} />;
}

export default logProps(FancyButton);
