import { Character, Info } from 'rickmortyapi';
import { BASE_URL } from '../constants/constants';
export const fetchCharacters = (
  name?: string,
  page?: number
): Promise<Info<Character[]>> => {
  let url = BASE_URL;
  if (name) {
    url += `?name=${name}`;
  }
  if (page) {
    url += name ? `&page=${page}` : `?page=${page}`;
  }
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

export const fetchCharacter = (id: number): Promise<Character> => {
  return fetch(`${BASE_URL}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Fetch character failed ${err.message}`);
    });
};
