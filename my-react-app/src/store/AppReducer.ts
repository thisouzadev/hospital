import { sessionStorageDelete, sessionStorageSet } from '../utils/sessionStorage';
import { localStorageDelete, localStorageSet } from '../utils/localStorage';
import { AppStoreState } from './AppStore';

/**
 * Reducer for global AppStore using "Redux styled" actions
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppReducer: React.Reducer<AppStoreState, any> = (state, action) => {
  switch (action.type || action.action) {
    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action?.currentUser || action?.payload,
      };
    case 'SIGN_UP':
    case 'LOG_IN':
      if (action.payload?.stayLoggedIn) {
        localStorageSet('user', action.payload.user);
        localStorageSet('token', action.payload.token);
      } else {
        sessionStorageSet('user', action.payload.user);
        sessionStorageSet('token', action.payload.token);
      }
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    case 'LOG_OUT':
      localStorageDelete('user');
      localStorageDelete('token');
      sessionStorageDelete('user');
      sessionStorageDelete('token');
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined, // Also reset previous user data
      };
    case 'CHANGE_SECTOR':
      localStorageSet('sector', action.payload);
      return {
        ...state,
        currentSector: action.payload,
      };
    case 'CHANGE_ROLE':
      return {
        ...state,
        currentUser: { ...state.currentUser, role: action.payload },
      };
    case 'LOAD_SECTORS':
      return {
        ...state,
        sectors: action.payload,
      };
    case 'DARK_MODE': {
      const darkMode = action?.darkMode ?? action?.payload;
      localStorageSet('darkMode', darkMode);
      return {
        ...state,
        darkMode,
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
