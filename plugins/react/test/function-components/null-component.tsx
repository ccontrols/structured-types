import { useEffect } from 'react';

export const NullComponent = () => {
  useEffect(() => {
    console.log('test');
  }, []);

  return null;
};
