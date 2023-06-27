import { PropsWithChildren } from 'react';

const PanelContent = ({ children }: PropsWithChildren) => (
  <div className="inline-block py-1 px-1 w-full text-center">
    <div className="">
      {children}
    </div>
  </div>
);

export default PanelContent;
