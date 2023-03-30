import {
  configureStore,
  type ThunkAction,
  type Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import authReducer from '@/redux/slices/auth';
import settingsReducer from '@/redux/slices/settings';
import moviesReducer from '@/redux/slices/movies';

// const persistAuthConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['accessToken']
// };

const persistSettingsConfig = {
  key: 'settings',
  storage,
  whitelist: ['themeMode']
};

export const store = configureStore({
  reducer: {
    // auth: persistReducer<ReturnType<typeof authReducer>>(
    //   persistAuthConfig,
    //   authReducer
    // ),
    settings: persistReducer<ReturnType<typeof settingsReducer>>(
      persistSettingsConfig,
      settingsReducer
    ),
    movies: moviesReducer
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;

export const persistor = persistStore(store);

export default store;
