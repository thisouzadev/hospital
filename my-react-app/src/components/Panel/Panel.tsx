import clsx from 'clsx';
import { PropsWithChildren } from 'react';

const Panel = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={clsx('w-full bg-[#D9D9D980] rounded-lg text-lg', className)}>
    {children}
  </div>
);

export default Panel;
