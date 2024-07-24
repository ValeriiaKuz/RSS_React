import { Character, Info } from 'rickmortyapi';

export interface MainPageState {
  error: Error | null;
  isLoaded: boolean;
  info?: Info<Character[]>['info'];
  items: Character[];
}

export interface CharacterWithSelectedProp extends Character {
  selected: boolean;
}

export enum Theme {
  light = 'light',
  dark = 'dark'
}
