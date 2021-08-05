import React from 'react';

type OwnProps = React.PropsWithChildren<{
  /**
   * own string prop
   */
  stringProp?: string;
}>;

// eslint-disable-next-line react/display-name
export const FancyButton = React.memo((props: OwnProps) => (
  <button title={props.stringProp}>{props.children}</button>
));
