import React from 'react';

// eslint-disable-next-line react/display-name
export default React.memo((props, ref) => (
  <button ref={ref}>{props.children}</button>
));
