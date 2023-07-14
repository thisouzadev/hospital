import {
  createContext,
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch,
  PropsWithChildren,
  useEffect,
} from 'react';
import { User } from '@modules/user/entities/user.entity';
import { useMutation } from 'react-query';
import { sessionStorageGet } from '../utils/sessionStorage';
import { AuthReturnDto } from '../types/backend.dtos';
import AppReducer from './AppReducer';
import { localStorageGet } from '../utils/localStorage';
import { Hospital, Sector } from '@/types/backend.models';
import sectorService from '@/service/sector.service';

/**
 * AppState structure and initial values
 */
export interface AppStoreState {
  darkMode: boolean;
  isAuthenticated: boolean;
  currentUser?: User;
  currentSector?: Sector,
  currentHospital?: Hospital,
  sectors: Sector[],
  token?: string;
}
const INITIAL_APP_STATE: AppStoreState = {
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') in AppStore
  isAuthenticated: false, // Overridden in AppStore by checking auth token
  sectors: [],
};

/**
 * Instance of React Context for global AppStore
 */
type AppContextReturningType = [AppStoreState, Dispatch<any>];
const AppContext = createContext<AppContextReturningType>([INITIAL_APP_STATE, () => null]);

const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const previousDarkMode = Boolean(localStorageGet('darkMode'));
  const previousUser = localStorageGet('user') || sessionStorageGet('user');
  const previousSector = localStorageGet('sector') || sessionStorageGet('sector');
  const previousHospital = localStorageGet('hospital') || sessionStorageGet('hospital');
  const previousToken = localStorageGet('token') || sessionStorageGet('token');
  const tokenExists = Boolean(previousToken);

  const isAuthenticated = Boolean(tokenExists && previousUser);

  const initialState: AppStoreState = {
    ...INITIAL_APP_STATE,
    darkMode: previousDarkMode,
    isAuthenticated,
    currentUser: previousUser as AuthReturnDto['user'] || undefined,
    currentSector: previousSector,
    currentHospital: previousHospital,
    sectors: [],
    token: previousToken,
  };
  const value: AppContextReturningType = useReducer(AppReducer, initialState);

  const [state, dispatch] = value;

  const loadSectors = useMutation(sectorService.getAll, {
    onSuccess: (data) => {
      // Invalidate and refetch

      dispatch({ type: 'LOAD_SECTORS', payload: data.result });
    },
  });

  useEffect(() => {
    if (state.isAuthenticated && state.currentUser?.employee?.hospitalId) {
      loadSectors.mutate();
    }
  }, [state.isAuthenticated]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use the AppStore in functional components
 *
 * import {useAppStore} from './store'
 * ...
 * const [state, dispatch] = useAppStore();
 */
const useAppStore = (): AppContextReturningType => useContext(AppContext);

export {
  AppStoreProvider as AppStore, AppContext, useAppStore,
};
