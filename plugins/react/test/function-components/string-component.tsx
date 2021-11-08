import { useEffect } from 'react';

export const StringComponent = () => {
  useEffect(() => {
    console.log('test');
  }, []);

  return 'test';
};
