import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useToggleQuerystringValue = (key: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const querystring = searchParams.get(key);

  const setQuerystring = useCallback(
    (value: string) => {
      if (querystring === value) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
      setSearchParams(searchParams);
    },
    [querystring, searchParams]
  );

  const nextQuerystring = useCallback(
    (value: string) => {
      const searchParamsCopy = new URLSearchParams(searchParams.toString());
      if (querystring === value) {
        searchParamsCopy.delete(key);
      } else {
        searchParamsCopy.set(key, value);
      }
      return `?${searchParamsCopy.toString()}`;
    },
    [querystring, searchParams]
  );

  return { value: querystring, setQuerystring, nextQuerystring };
};
