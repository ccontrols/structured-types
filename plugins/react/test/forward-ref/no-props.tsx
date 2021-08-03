import React from 'react';

// eslint-disable-next-line react/display-name
export default React.forwardRef<HTMLButtonElement>((props, ref) => (
  <button ref={ref}>{props.children}</button>
));
