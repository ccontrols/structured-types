import React, { BaseHTMLAttributes } from 'react';

type OwnProps = {
  stringProp?: string;
};
// eslint-disable-next-line react/display-name
export const FancyButton = React.forwardRef<
  HTMLButtonElement,
  OwnProps & BaseHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button ref={ref} title={props.stringProp}>
    {props.children}
  </button>
));
