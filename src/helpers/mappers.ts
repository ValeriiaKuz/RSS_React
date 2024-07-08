import aliveSvg from '../assets/images/alive.svg';
import deadSvg from '../assets/images/dead.svg';
import unknownSvg from '../assets/images/unknown.svg';
export const getStatusImage = (
  status: 'Dead' | 'Alive' | 'unknown'
): string => {
  switch (status) {
    case 'Alive':
      return aliveSvg;
    case 'Dead':
      return deadSvg;
    case 'unknown':
    default:
      return unknownSvg;
  }
};
