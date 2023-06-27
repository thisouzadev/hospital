import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: ReactNode
  variant?: 'small' | 'big'
}

function Button({
  type, children, icon, className, variant = 'big', disabled, ...restOfProps
}: Props) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      className={
        clsx(
          'flex items-center justify-center gap-1 w-40 disabled:pointer-events-none',
          'rounded-full border-stone-300  transition-colors bg-[#0799C7CF] hover:bg-[#079ac7] shadow-md',
          { 'h-10': variant === 'small' },
          { 'h-14': variant === 'big' },
          { 'bg-gray-400': disabled },
          className,
        )
      }
      {...restOfProps}
    >
      {icon}
      {children
        && (
        <span className="font-normal text-2xl text-white">
          {children}
        </span>
        )}
    </button>
  );
}

export default Button;
