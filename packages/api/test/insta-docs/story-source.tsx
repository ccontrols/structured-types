import React from 'react';

export const asyncStory = async () => {
  const response = await fetch(
    'http://dummy.restapiexample.com/api/v1/employee/1',
  );
  const { data } = await response.json();
  // eslint-disable-next-line react/display-name
  return () => <h2>{`Hello, my name is ${data.employee_name}.`}</h2>;
};

export function fnStory() {
  return '';
}

export const singleLine = () => 'test';
