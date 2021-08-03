import React from 'react';

type OwnProps = React.PropsWithChildren<{
  /**
   * own string prop
   */
  stringProp?: string;
}>;

// eslint-disable-next-line react/display-name
export const FancyButton = React.forwardRef<HTMLButtonElement>(
  (props: OwnProps = { stringProp: 'hello' }, ref) => (
    <button ref={ref} title={props.stringProp}>
      {props.children}
    </button>
  ),
);
