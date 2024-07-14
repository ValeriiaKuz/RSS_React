import { FC } from 'react';
import { Character as CharacterType } from 'rickmortyapi';
import { CharacterCard } from './Character/CharacterCard';
interface ListViewProps {
  data: CharacterType[];
}
export const ListView: FC<ListViewProps> = ({ data }) => {
  if (!data.length) {
    return <p>No characters there</p>;
  }
  return (
    <>
      {data.map((character) => {
        return <CharacterCard characterData={character} key={character.id} />;
      })}
    </>
  );
};
