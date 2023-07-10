import clsx from 'clsx';
import { PropsWithChildren } from 'react';

const PanelSubHeader = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={clsx('bg-[#D9D9D9] rounded-lg inline-block p-1 w-full text-center', className)}>
    {children}
  </div>
);

export default PanelSubHeader;
