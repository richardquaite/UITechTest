import { AllTheProviders, renderHook, waitFor } from 'test-utils';
import { useMovies } from '@/src/hooks/useMovies';
import GetMovies200 from '@/src/mocks/responses/GetMovies200';

describe('useMovies', () => {
  test('returns movies', async () => {
    const { result } = renderHook(() => useMovies(), {
      wrapper: AllTheProviders,
    });
    await waitFor(() =>
      expect(result.current.data.movies.map((movie) => movie.id)).toEqual(
        GetMovies200.map((movie) => movie.id)
      )
    );
  });

  test('adds averageReviewScore and filmCompany to each movie', async () => {
    const { result } = renderHook(() => useMovies(), {
      wrapper: AllTheProviders,
    });
    await waitFor(() =>
      expect(result.current.data.movies).toHaveLength(GetMovies200.length)
    );
    result.current.data.movies.forEach((movie) => {
      expect(movie.averageReviewScore).toBeTypeOf('number');
      expect(movie.filmCompany).toBeTypeOf('object');
      expect(movie.filmCompany?.name).toBeTypeOf('string');
    });
  });
});
