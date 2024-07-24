import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/1', () => {
    return HttpResponse.json({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    });
  }),
  http.get('https://rickandmortyapi.com/api/character/error', () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not found'
    });
  })
];

export const server = setupServer(...handlers);
