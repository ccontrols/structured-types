import React from 'react';

type OwnProps = {
  stringProp?: string;
};
// eslint-disable-next-line react/display-name
export const FancyButton = React.forwardRef<HTMLButtonElement, OwnProps>(
  (props, ref) => (
    <button ref={ref} title={props.stringProp}>
      {props.children}
    </button>
  ),
);
