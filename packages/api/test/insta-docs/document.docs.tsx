import React from 'react';
import { MyComponent } from './component/component';

export default {
  name: 'documentation for MyComponent',
  component: MyComponent,
};

export const defaultName = () => <MyComponent />;

export const initializedName = ({ name = 'steve' }) => (
  <MyComponent name={name} />
);

export const assignedProps = ({ name } = { name: 'steve' }) => (
  <MyComponent name={name} />
);

assignedProps.title = 'Custom title';
assignedProps.controls = {
  name: { type: 'string', value: 'enter value here' },
};
