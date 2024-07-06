import { Character, Info } from 'rickmortyapi';
import { BASE_URL } from '../constants/constants';
export const fetchCharacters = (): Promise<Info<Character[]>> => {
  return fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(`Fetch characters failed ${err.message}`);
    });
};

export const fetchSearchCharacter = (
  name: string
): Promise<Info<Character[]>> => {
  return fetch(`${BASE_URL}/?name=${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(`Fetch characters failed ${err.message}`);
    });
};
