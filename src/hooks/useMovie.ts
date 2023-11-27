import { useMemo } from 'react';
import { useMovies } from './useMovies';

export const useMovie = (id: Movie['id'] | null) => {
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
