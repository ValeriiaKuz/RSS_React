import { useEffect, useState } from 'react';
import { LS_KEY } from '../constants/constants';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem(LS_KEY) || '';
  });
  useEffect(() => {
    localStorage.setItem(LS_KEY, searchQuery);
  }, [searchQuery]);
  return [searchQuery, setSearchQuery] as const;
};
