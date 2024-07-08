import { Component } from 'react';
import { Character as CharacterType } from 'rickmortyapi';
import { CharacterCard } from './Character/CharacterCard';
interface ListViewProps {
  data: CharacterType[];
}
export class ListView extends Component<ListViewProps> {
  constructor(props: ListViewProps) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.data.map((character) => {
          return <CharacterCard characterData={character} key={character.id} />;
        })}
      </>
    );
  }
}
