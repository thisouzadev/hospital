import {
  FunctionComponent, PropsWithChildren,
} from 'react';
import Header from './Header';
import ErrorBoundary from '../components/ErrorBoundary';
import { useAppStore } from '../store';
// import { UserRole } from '../services/user.service';

const TITLE_PRIVATE = 'Hospital Admin'; // Title for pages after authentication

/**
 * Renders "Private Layout" composition
 * @component PrivateLayout
 */
const PrivateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state] = useAppStore();

  const { currentUser } = state;

  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title

  return (
    <div>
      <Header>
        <div className="flex flex-col bg-[#ffffff20] px-2 rounded-md shadow-sm">
          <span>{currentUser?.employee.name}</span>
          <span>{currentUser?.role}</span>
          <span>{currentUser?.employee.hospital.name}</span>
        </div>
      </Header>
      <ErrorBoundary name="Content">
        <div className="m-auto max-w-6xl pt-20 text-lg">
          {children}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default PrivateLayout;
