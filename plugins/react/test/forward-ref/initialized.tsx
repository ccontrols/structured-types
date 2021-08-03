import React from 'react';

type OwnProps = {
  stringProp?: string;
};
// eslint-disable-next-line react/display-name
export const FancyButton = React.forwardRef<HTMLButtonElement, OwnProps>(
  ({ children, stringProp = 'test' }, ref) => (
    <button ref={ref} title={stringProp}>
      {children}
    </button>
  ),
);
