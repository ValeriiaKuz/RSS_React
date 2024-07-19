import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { rickAndMortyApi } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { selectedCharactersReducer } from './slices/charactersSlice.ts';

const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  selectedCharacters: selectedCharactersReducer
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware as Middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
