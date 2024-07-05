import { Character, Info } from 'rickmortyapi';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = (): Promise<Info<Character[]>> => {
  return fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
