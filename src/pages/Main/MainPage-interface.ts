import { Character, Info } from 'rickmortyapi';

export interface MainPageState {
  error: Error | null;
  isLoaded: boolean;
  info?: Info<Character[]>['info'];
  items: Character[];
  clickedError: boolean;
}
