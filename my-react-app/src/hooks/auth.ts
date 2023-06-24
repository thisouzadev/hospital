import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import { authService } from '../services/auth.service';
import { useAppStore } from '../store';

/**
 * Hook to detect is current user authenticated or not
 * @returns {boolean} true if user is authenticated, false otherwise
 */
export function useIsAuthenticated() {
  const [state] = useAppStore();
  const result = state.isAuthenticated;

  // TODO: AUTH: add access token verification or other authentication check here
  // result = Boolean(sessionStorageGet('access_token', ''));

  return result;
}

/**
 * Returns event handler to Logout current user
 * @returns {function} calling this event logs out current user
 */
export function useEventLogout() {
  const [, dispatch] = useAppStore();

  const navigate = useNavigate();

  return useCallback(async () => {
    if (!window.confirm('Deseja realmente sair do sistema')) {
      return;
    }
    // await authService.logout();
    dispatch({ type: 'LOG_OUT' });
    navigate('/login');
  }, [dispatch]);
}
