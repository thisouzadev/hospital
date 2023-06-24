import {
  FunctionComponent, PropsWithChildren,
} from 'react';
import Header from '../components/Header';
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

  const role = state.currentUser?.role;

  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title

  return (
    <div>
      <Header />
      <ErrorBoundary name="Content">{children}</ErrorBoundary>
    </div>
  );
};

export default PrivateLayout;
