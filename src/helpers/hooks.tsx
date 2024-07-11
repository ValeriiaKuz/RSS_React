import { useCallback, useEffect, useReducer, useState } from 'react';
import { Character, Info } from 'rickmortyapi';
import { MainPageState } from '../pages/Main/MainPage-interface';
import { fetchCharacters } from '../api/api';
import { LS_KEY } from '../constants/constants';

type Action =
  | { type: 'START_REQUEST' }
  | { type: 'GET_RESPONSE_OK'; payload: Info<Character[]> }
  | { type: 'GET_RESPONSE_ERROR'; payload: Error }
  | { type: 'SET_CLICKED_ERROR'; payload: boolean };

const initialState: MainPageState = {
  error: null,
  isLoaded: false,
  info: { count: 0, pages: 0, next: null, prev: null },
  items: [],
  clickedError: false
};

const reducer = (state: MainPageState, action: Action): MainPageState => {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, isLoaded: false };
    case 'GET_RESPONSE_OK':
      return {
        ...state,
        isLoaded: true,
        error: null,
        items: action.payload.results || [],
        info: action.payload.info
      };
    case 'GET_RESPONSE_ERROR':
      return { ...state, isLoaded: true, error: action.payload };
    case 'SET_CLICKED_ERROR':
      return { ...state, clickedError: action.payload };
    default:
      return state;
  }
};

export const useCharacters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleFetch = async (
    fetchFunction: () => Promise<Info<Character[]>>
  ) => {
    dispatch({ type: 'START_REQUEST' });
    try {
      const result = await fetchFunction();
      dispatch({ type: 'GET_RESPONSE_OK', payload: result });
    } catch (error) {
      dispatch({ type: 'GET_RESPONSE_ERROR', payload: error as Error });
    }
  };

  const getAllCharacters = useCallback(async () => {
    await handleFetch(fetchCharacters);
  }, []);

  const getSearchedValue = useCallback(async (value: string) => {
    await handleFetch(() => fetchCharacters(value));
  }, []);

  return {
    state,
    getAllCharacters,
    getSearchedValue,
    dispatch
  };
};

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem(LS_KEY) || '';
  });
  useEffect(() => {
    return () => {
      localStorage.setItem(LS_KEY, searchQuery);
    };
  }, [searchQuery]);
  return [searchQuery, setSearchQuery] as const;
};
