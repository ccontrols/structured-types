import React from 'react';

type OwnProps = {
  stringProp?: string;
};

export const FancyButton = React.forwardRef<HTMLButtonElement, OwnProps>(
  (props, ref) => (
    <button ref={ref} title={props.stringProp}>
      {props.children}
    </button>
  ),
);

FancyButton.displayName = 'CustomComponentName';
