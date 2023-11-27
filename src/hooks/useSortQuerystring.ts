import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Sort = 'asc' | 'desc' | undefined;

export const useSortQuerystring = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortQuerystring = searchParams.get('sort');

  // This stops any hacked querystring values propagating through runtime code
  const sort: Sort =
    sortQuerystring === 'asc' || sortQuerystring === 'desc'
      ? sortQuerystring
      : undefined;

  const setSorting = useCallback(() => {
    if (!sort) {
      searchParams.set('sort', 'desc');
    } else if (sort === 'desc') {
      searchParams.set('sort', 'asc');
    } else {
      searchParams.delete('sort');
    }
    setSearchParams(searchParams);
  }, [sort, searchParams]);

  return { sort, setSorting };
};
