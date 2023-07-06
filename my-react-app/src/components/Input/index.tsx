import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  md?: number
  lg?: number
  asChild? : boolean
  disabled?:boolean
  error?: any;
  isLoading?:boolean;
  textCenter?:boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, className, name, md, asChild, disabled, error, isLoading, textCenter, ...props
  }, forwardedRed) => {
    const Comp = asChild ? Slot : 'input';
    return (
      <div
        className={
        clsx(
          'group flex items-center h-9  rounded-md col-span-12',

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
        )
      }
      >
        <label
          htmlFor={name}
          className={
            clsx(
              'flex items-center ring-1  h-9 px-1 gap-1  w-full',
              'ring-blue-300 rounded-xl border-black text-black ',
              { 'group-hover:ring-2 focus-within:ring-2': !disabled },
              { 'bg-red-200 ring-red-700': error },
              { 'bg-[#f0f0f0]': !error },
              className,
            )
          }
        >
          {label
          && <span className="whitespace-nowrap">{label}</span>}
          {isLoading
            ? <span>Carregando...</span>
            : (
              <Comp
                name={name}
                disabled={disabled}
                {...props}
                className={
              clsx(
                'text-gray-700 w-full bg-transparent outline-none',
                { 'text-center': textCenter },
              )
            }
                ref={forwardedRed}
              />
            )}

        </label>
      </div>
    );
  },
);

export default Input;
