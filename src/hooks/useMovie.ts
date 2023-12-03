import { useMemo } from 'react';
import { useMovies } from '@/src/hooks/useMovies';

export const useMovie = (id: MovieEntity['id'] | null) => {
  if (!id) {
    console.warn('Attempted to call `useMovie` without providing an id');
  }

  const {
    data: { movies },
    isLoading,
    isFetching,
  } = useMovies();

  const movie = useMemo(
    () => movies.find((movie) => movie.id === id),
    [movies, id]
  );

  return { movie, isLoading, isFetching };
};
