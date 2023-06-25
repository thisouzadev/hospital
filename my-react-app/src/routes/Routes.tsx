// import { useEffect } from 'react';
import { useAppStore } from '../store';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
// import PrivateRoutes from './PrivateRoutes';
// import { isUserStillLoggedIn } from '../api/auth/utils';
// import { api } from '../api';

/**
 * Renders routes depending on Authenticated or Anonymous users
 */
function Routes() {
  const [state] = useAppStore();

  // Re-login or logout the user if needed
  // useEffect(() => {
  //   // Check isn't token expired?
  //   const isLogged = isUserStillLoggedIn();

  //   if (state.isAuthenticated && !isLogged) {
  //     // Token was expired, logout immediately!
  //     console.warn('Token was expired, logout immediately!');
  //     api?.auth?.logout();
  //     // dispatch({ type: 'LOG_OUT' }); // Not needed due to reloading App in api.auth.logout()
  //     return; // Thats all for now, the App will be completely re-rendered soon
  //   }

  //   if (isLogged && !state.isAuthenticated) {
  //     // Valid token is present but we are not logged in somehow, lets fix it
  //     console.warn('Token found, lets try to auto login');
  //     api?.auth?.refresh().then(() => {
  //       dispatch({ type: 'LOG_IN' });
  //     });
  //   }
  // }, [state.isAuthenticated, dispatch]);
  // console.log('Routes() - isAuthenticated:', state.isAuthenticated);

  if (state.isAuthenticated) {
    return <PrivateRoutes />;
  }

  return <PublicRoutes />;
}
export default Routes;
