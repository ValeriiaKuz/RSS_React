import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { rickAndMortyApi } from './api';

const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer
});
export const store = configureStore({
  reducer: {
    rootReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware as Middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
