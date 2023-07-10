import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface FieldProps {
  className?: string
  variant?: 'default' | 'minimal'
}

const Field = ({ children, className, variant = 'default' }:PropsWithChildren<FieldProps>) => (
  <div className={
    clsx(
      'w-fit px-4',
      { 'ring-1 ring-blue-300 p-1 rounded-xl bg-[#ebebeb]': variant === 'default' },
      className,
    )
  }
  >
    {children}

  </div>
);

export default Field;
