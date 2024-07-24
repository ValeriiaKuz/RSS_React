import { useAppSelector } from '../../store/hooks.ts';
import { Character } from 'rickmortyapi';

export const CSV = () => {
  const { selectedCharacters } = useAppSelector(
    (state) => state.selectedCharacters
  );

  const generateCSV = (data: Character[]) => {
    const headers = ['ID', 'Name', 'Status', 'Species', 'Gender'];
    const csvRows = [
      headers.join(','),
      ...data.map((character) =>
        [
          character.id,
          character.name,
          character.status,
          character.species,
          character.gender
        ].join(',')
      )
    ];
    return csvRows.join('\n');
  };

  const csvString = selectedCharacters.length
    ? generateCSV(selectedCharacters)
    : '';

  return selectedCharacters.length ? (
    <a
      href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvString)}`}
      download={`${selectedCharacters.length}-characters.csv`}
    >
      Download CSV
    </a>
  ) : null;
};
