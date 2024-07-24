import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { Character, Info } from 'rickmortyapi';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMorty',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      Info<Character[]>,
      { name?: string; page?: number }
    >({
      query: ({ name, page }) => {
        let url = '';
        if (name) {
          url += `?name=${name}`;
        }
        if (page) {
          url += name ? `&page=${page}` : `?page=${page}`;
        }
        return url;
      }
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => `/${id}`
    })
  })
});

export const { useGetCharactersQuery, useGetCharacterQuery } = rickAndMortyApi;
