import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { Character } from 'rickmortyapi';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Character[], number | undefined>({
      query: (page = 1) => `?page=${page}`
    }),
    getSearchedCharacter: builder.query<
      Character[],
      [string, number | undefined]
    >({
      query: ([name, page = 1]) => `?name=${name}&page=${page}`
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => `${id}`
    })
  })
});

export const {
  useGetAllCharactersQuery,
  useGetSearchedCharacterQuery,
  useGetCharacterQuery
} = rickAndMortyApi;
