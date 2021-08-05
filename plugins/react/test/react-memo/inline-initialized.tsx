import React from 'react';

type OwnProps = React.PropsWithChildren<{
  stringProp?: string;
}>;
// eslint-disable-next-line react/display-name
export const MemoButton = React.memo(
  ({ stringProp = 'default value', children }: OwnProps) => (
    <button title={stringProp}>{children}</button>
  ),
);
