import React from 'react';
import { MyComponent } from '../component/component';

export const initializedName = ({ name = 'steve' }) => (
  <MyComponent name={name} />
);
