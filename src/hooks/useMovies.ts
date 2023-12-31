import { useMemo } from 'react';
import {
  useGetMovieCompaniesQuery,
  useGetMoviesQuery,
} from '../redux/apiSlice';
import { useSortQuerystring } from './useSortQuerystring';
import { getAverage } from '../lib/getAverage';

type ExtendedMovie = Movie & {
  filmCompany: MovieCompany | undefined;
  averageReviewScore: number;
};

export const useMovies = () => {
  const { sort } = useSortQuerystring();

  const {
    data: movies,
    refetch: refetchMovies,
    isLoading: isMoviesLoading,
    isFetching: isMoviesFetching,
    isError: isMoviesError,
  } = useGetMoviesQuery();

  const {
    data: movieCompanies,
    refetch: refetchMovieCompanies,
    isLoading: isMovieCompaniesLoading,
    isFetching: isMovieCompaniesFetching,
    isError: isMovieCompaniesError,
  } = useGetMovieCompaniesQuery();

  const isLoading = isMoviesLoading || isMovieCompaniesLoading;
  const isFetching = isMoviesFetching || isMovieCompaniesFetching;
  const isError = isMoviesError || isMovieCompaniesError;

  const moviesData: ExtendedMovie[] = useMemo(
    () =>
      movies && movieCompanies
        ? movies.map((movie) => {
            return {
              ...movie,
              filmCompany: movieCompanies.find(
                (movieCompany) => movieCompany.id === movie.filmCompanyId
              ),
              averageReviewScore: getAverage(movie.reviews),
            };
          })
        : [],
    [movies, movieCompanies]
  );

  const sortedMoviesData = useMemo(() => {
    return moviesData.sort((a, b) =>
      sort === 'asc'
        ? a.averageReviewScore - b.averageReviewScore
        : sort === 'desc'
        ? b.averageReviewScore - a.averageReviewScore
        : Number(a.id) - Number(b.id)
    );
  }, [sort, moviesData]);

  const moviesCount = moviesData.length;

  const refetch = () => {
    refetchMovies();
    refetchMovieCompanies();
  };

  return {
    data: { movies: sortedMoviesData, count: moviesCount },
    refetch,
    isLoading,
    isFetching,
    isError,
  };
};
