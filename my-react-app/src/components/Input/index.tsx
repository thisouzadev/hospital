import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  md?: number
  lg?: number
  asChild? : boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, className, width, name, md, asChild, ...props
  }, forwardedRed) => {
    const Comp = asChild ? Slot : 'input';
    return (
      <div className='group'>
        <label
          htmlFor={name}
          className={
          clsx(
            'flex items-center ring-1 ring-black rounded-lg border-black text-black h-9 px-1 gap-1 group-hover:ring-2 focus-within:ring-2',
            { 'md:w-2/12': md === 2 },
            { 'md:w-4/12': md === 4 },
            { 'md:w-6/12': md === 6 },
            { 'md:w-8/12': md === 8 },
            { 'md:w-10/12': md === 10 },

          )
        }
        >
          <span className="">{label}</span>
          <Comp
            name={name}
            {...props}
            className={
            clsx(
              'text-gray-700 w-full bg-transparent outline-none',
              className,
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