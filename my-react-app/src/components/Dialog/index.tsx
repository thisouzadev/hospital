import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title?: string
  children?: ReactNode

}
const Dialog = ({
  isOpen, setIsOpen, title, children,
}:Props) => (
  <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 " />
      <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] shadow-md rounded-[6px] bg-[#E9E9EA] p-[25px] focus:outline-none">

        <RadixDialog.Title className="m-0 text-xl font-medium ">
          {title}
        </RadixDialog.Title>
        <RadixDialog.Description className="mt-[1px]text-[15px] leading-normal flex flex-col" />
        {children}
        <RadixDialog.Close asChild>
          <button
            type="button"
            className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none text-xl hover:drop-shadow-md"
          >
            X
          </button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);

export default Dialog;
