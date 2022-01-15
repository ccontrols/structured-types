import React, { ComponentClass } from 'react';

type TabProps = {
  name?: string;
};

class OriginalTab extends React.Component<TabProps> {
  static displayName = 'MyOriginalName';
  static defaultProps = { name: 'my-name' };
  render() {
    return <div>{this.props.name}</div>;
  }
}

/**
 * Tab heading - you should specify the title/label
 */
export const Tab: ComponentClass<TabProps> = OriginalTab;
