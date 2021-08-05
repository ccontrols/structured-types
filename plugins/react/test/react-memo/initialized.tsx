import React from 'react';

type OwnProps = {
  stringProp?: string;
};
// eslint-disable-next-line react/display-name
export const MemoButton = React.memo<OwnProps>(
  ({ stringProp = 'default value', children }) => (
    <button title={stringProp}>{children}</button>
  ),
);
