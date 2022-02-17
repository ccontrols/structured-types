import React from 'react';
import { MyComponent } from '../component/component';

export const assignedProps = ({ name } = { name: 'steve' }) => (
  <MyComponent name={name} />
);

assignedProps.title = 'Custom title';
assignedProps.controls = {
  name: { type: 'string', value: 'enter value here' },
};
