import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: ReactNode
}

function Button({
  type, children, icon, className, ...restOfProps
}: Props) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={
        clsx(
          'flex items-center justify-center gap-1 ',
          'rounded-full border-stone-300  transition-colors bg-[#0799C7CF] hover:bg-[#079ac7] shadow-md',
          'w-40 h-10',
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
