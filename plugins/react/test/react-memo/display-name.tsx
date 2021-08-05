import React from 'react';

type OwnProps = {
  stringProp?: string;
};

export const FancyButton = React.memo<OwnProps>((props, ref) => (
  <button ref={ref} title={props.stringProp}>
    {props.children}
  </button>
));

FancyButton.displayName = 'CustomComponentName';
