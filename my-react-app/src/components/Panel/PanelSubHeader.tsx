import { PropsWithChildren } from 'react';

const PanelSubHeader = ({ children }: PropsWithChildren) => (
  <div className="bg-[#D9D9D9] rounded-lg my-2 inline-block py-1 w-full text-center">
    {children}
  </div>
);

export default PanelSubHeader;
