import React, { FC } from 'react';

export const Loader: FC<{ label?: string }> = ({ label = 'running...' }) => (
  <div id="loader" style={{ padding: 0 }}>
    <div className="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p id="loading-message" role="status">
      {label}
    </p>
  </div>
);
