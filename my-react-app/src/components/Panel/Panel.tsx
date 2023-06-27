import { PropsWithChildren } from 'react';

const Panel = ({ children }: PropsWithChildren) => (
  <div className="w-full bg-[#D9D9D980] rounded-lg text-lg">
    {children}
  </div>
);

export default Panel;
