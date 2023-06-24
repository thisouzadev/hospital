import {
  FunctionComponent, PropsWithChildren,
} from 'react';

import ErrorBoundary from '../components/ErrorBoundary';

const TITLE_PUBLIC = 'Login Hospital Admin'; // Title for pages without/before authentication

const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PUBLIC;
  document.title = title; // Also Update Tab Title

  return (
    <div>
      <ErrorBoundary name="Content">{children}</ErrorBoundary>
    </div>
  );
};

export default PublicLayout;
