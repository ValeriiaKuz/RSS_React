import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { rickAndMortyApi } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { selectedCharactersReducer } from './slices/charactersSlice.ts';

const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  selectedCharacters: selectedCharactersReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickAndMortyApi.middleware as Middleware)
  });
};
export const store = makeStore();

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
