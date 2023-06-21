import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  md?: number
  lg?: number
  asChild? : boolean
  disabled?:boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, className, name, md, asChild,disabled, ...props
  }, forwardedRed) => {
    const Comp = asChild ? Slot : 'input';
    return (
      <div 
        className={
        clsx(
          'group flex items-center h-9 bg-white rounded-md',
          { 'md:col-span-1': md === 1 },
          { 'md:col-span-2': md === 2 },
          { 'md:col-span-3': md === 3 },
          { 'md:col-span-4': md === 4 },
          { 'md:col-span-5': md === 5 },
          { 'md:col-span-6': md === 6 },
          { 'md:col-span-7': md === 7 },
          { 'md:col-span-8': md === 8 },
          { 'md:col-span-9': md === 9 },
          { 'md:col-span-10': md === 10 },
          { 'md:col-span-11': md === 11 },
          { 'md:col-span-12': md === 12 },
          className
        )
      }
      >
        <label
          htmlFor={name}
          className={
            clsx(
              'flex items-center ring-1  h-9 px-1 gap-1  w-full',
              'ring-black rounded-lg border-black text-black ',
              {'group-hover:ring-2 focus-within:ring-2': !disabled}
            )
          }
        >
          <span className="whitespace-nowrap">{label}</span>
          <Comp
            name={name}
            disabled= {disabled}
            {...props}
            className={
            clsx(
              'text-gray-700 w-full bg-transparent outline-none',
            )
          }
            ref={forwardedRed}
          />
        </label>
      </div>
    );
  },
);

export default Input;