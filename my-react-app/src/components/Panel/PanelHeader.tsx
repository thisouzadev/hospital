import { PropsWithChildren } from 'react';

const PanelHeader = ({ children }: PropsWithChildren) => (
  <div className="bg-[#f0f0f0] rounded-lg my-2 py-1 w-full text-center flex justify-center">
    {children}
  </div>
);

export default PanelHeader;
