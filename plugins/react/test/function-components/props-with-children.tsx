import React, { PropsWithChildren } from 'react';

type Props = {
  id: string;
  linkable: true;
};

type FullProps = PropsWithChildren<Props>;

export default function Component({
  children,
  id,
  linkable,
  ...props
}: FullProps) {
  return (
    <div>
      {linkable && <div id={id} {...props} />}
      {children}
    </div>
  );
}
