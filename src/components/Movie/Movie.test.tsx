import { render, waitFor } from 'test-utils';
import { Movie } from '@/src/components/Movie/Movie';
import { Table, TableBody } from '@mui/material';
import GetMovies200 from '@/src/mocks/responses/GetMovies200';
import GetMovieCompanies200 from '@/src/mocks/responses/GetMovieCompanies200';
import { getAverage } from '@/src/lib/getAverage';
import { PropsWithChildren } from 'react';

const movie = GetMovies200[0];
const movieCompany = GetMovieCompanies200.find(
  (movieCompany) => movieCompany.id === movie.filmCompanyId
);

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <Table>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

describe('Movie', () => {
  test('It finds the mock movie', () => {
    expect(movie).toBeTruthy();
  });

  test('It finds the mock movieCompany', () => {
    expect(movieCompany).toBeTruthy();
  });

  test(`It displays a loading state`, async () => {
    const { getAllByText } = render(<Movie id={movie.id} />, {
      wrapper: Wrapper,
    });

    expect(getAllByText('...')).toHaveLength(3);
  });

  test(`It displays an error`, async () => {
    const { getByText } = render(<Movie id="-1" />, { wrapper: Wrapper });

    await waitFor(() =>
      expect(getByText('Movie not found')).toBeInTheDocument()
    );
  });

  test(`It displays the movie title (${movie!.title})`, async () => {
    const { getByText } = render(<Movie id={movie.id} />, { wrapper: Wrapper });

    await waitFor(() => expect(getByText(movie!.title)).toBeInTheDocument());
  });

  test('It displays the movie rating', async () => {
    const { getByText } = render(<Movie id={movie.id} />, { wrapper: Wrapper });

    await waitFor(() =>
      expect(getByText(getAverage(movie!.reviews))).toBeInTheDocument()
    );
  });

  test('It displays no rating if there are no reviews yet', async () => {
    const movieWithNoReviews = GetMovies200.find(
      (movie) => movie.reviews.length === 0
    );

    if (!movieWithNoReviews) {
      throw new Error('There are no movies without reviews in the mock api');
    }
    const { getByText } = render(<Movie id={movieWithNoReviews.id} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(getByText('No reviews')).toBeInTheDocument());
  });

  test(`It displays the movie company name(${
    movieCompany!.name
  })`, async () => {
    const { getByText } = render(<Movie id={movie.id} />, { wrapper: Wrapper });

    await waitFor(() =>
      expect(getByText(movieCompany!.name)).toBeInTheDocument()
    );
  });
});
