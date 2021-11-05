import React, { Component } from 'react';

interface CustomComponentProps {
  name: string;
}

class CustomComponent extends Component<CustomComponentProps> {
  render() {
    return <span>Hello, {this.props.name}!</span>;
  }
}

export { CustomComponent as MyComponent };
