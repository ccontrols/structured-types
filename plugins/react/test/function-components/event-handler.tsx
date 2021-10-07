import React, { DOMAttributes } from 'react';

/**
 * Clickable properties.
 */
type ClickableProps = {
  onClick?: DOMAttributes<HTMLDivElement>['onClick'];
};

/**
 * Clickable special component
 */
export const Clickable: React.FC<ClickableProps> = ({ onClick }) => (
  <div onClick={onClick}>Hello</div>
);
