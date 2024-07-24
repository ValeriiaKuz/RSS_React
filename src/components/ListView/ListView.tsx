import { FC } from 'react';
import { CharacterCard } from './Character/CharacterCard';
import { CharacterWithSelectedProp } from '../../pages/Main/MainPage-interface.ts';
interface ListViewProps {
  data: CharacterWithSelectedProp[];
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
