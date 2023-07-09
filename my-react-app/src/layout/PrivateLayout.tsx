import {
  FunctionComponent, PropsWithChildren,
} from 'react';
import Header from './Header';
import ErrorBoundary from '../components/ErrorBoundary';

const TITLE_PRIVATE = 'Hospital Admin'; // Title for pages after authentication

/**
 * Renders "Private Layout" composition
 * @component PrivateLayout
 */
const PrivateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title

  return (
    <div className="min-h-screen ">
      <Header />
      <ErrorBoundary name="Content">
        <div className="m-auto max-w-6xl pt-20 text-lg">
          {children}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default PrivateLayout;
