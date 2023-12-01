import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSelectedQuerystring = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedQuerystring = searchParams.get('selected');

  const setSelected = useCallback(
    (id: Movie['id']) => {
      if (selectedQuerystring === id) {
        searchParams.delete('selected');
      } else {
        searchParams.set('selected', id);
      }
      setSearchParams(searchParams);
    },
    [selectedQuerystring, searchParams]
  );

  const nextSelectedQuery = useCallback(
    (id: Movie['id']) => {
      const searchParamsCopy = new URLSearchParams(searchParams.toString());
      if (selectedQuerystring === id) {
        searchParamsCopy.delete('selected');
      } else {
        searchParamsCopy.set('selected', id);
      }
      return `?${searchParamsCopy.toString()}`;
    },
    [selectedQuerystring, searchParams]
  );

  return { selected: selectedQuerystring, setSelected, nextSelectedQuery };
};
