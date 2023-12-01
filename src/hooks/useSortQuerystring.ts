import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Sort = 'asc' | 'desc' | undefined;

export const useSortQuerystring = (sortKey = 'sort') => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortQuerystring = searchParams.get(sortKey);

  // This stops any hacked querystring values propagating through runtime code
  const sort: Sort =
    sortQuerystring === 'asc' || sortQuerystring === 'desc'
      ? sortQuerystring
      : undefined;

  const setSorting = useCallback(() => {
    if (!sort) {
      searchParams.set(sortKey, 'desc');
    } else if (sort === 'desc') {
      searchParams.set(sortKey, 'asc');
    } else {
      searchParams.delete(sortKey);
    }
    setSearchParams(searchParams);
  }, [sort, searchParams]);

  return { sort, setSorting };
};
