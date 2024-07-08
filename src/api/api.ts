import { Character, Info } from 'rickmortyapi';
import { BASE_URL } from '../constants/constants';
export const fetchCharacters = (name?: string): Promise<Info<Character[]>> => {
  const url = name ? `${BASE_URL}/?name=${name}` : BASE_URL;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Fetch characters failed ${err.message}`);
    });
};
