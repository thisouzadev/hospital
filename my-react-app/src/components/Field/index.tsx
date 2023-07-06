import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface FieldProps {
  className?: string
  variant?: 'default' | 'minimal'
}

const Field = ({ children, className, variant = 'default' }:PropsWithChildren<FieldProps>) => (
  <span className={
    clsx(
      '',
      { 'ring-1 ring-blue-300 p-2 rounded-xl bg-[#ebebeb]': variant === 'default' },
      className,
    )
  }
  >
    {children}

  </span>
);

export default Field;
