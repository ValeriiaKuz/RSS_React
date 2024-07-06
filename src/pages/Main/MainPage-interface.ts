import { Character, Info } from 'rickmortyapi';

export interface MainPageState {
  error: Error | null;
  isLoaded: boolean;
  info: Omit<Info<Character[]>, 'info'>;
  items: Character[];
  searchValue: string;
}
