import { render, waitFor } from '../../utils/test-utils';
import { Movie } from './Movie';
import { Table, TableBody } from '@mui/material';
import GetMovies200 from '../../mocks/responses/GetMovies200.json';
import GetMovieCompanies200 from '../../mocks/responses/GetMovieCompanies200.json';
import { getAverage } from '../../lib/getAverage';

const id = '1';
const movie = GetMovies200.find((movie) => movie.id === id);
const movieCompany = GetMovieCompanies200.find(
  (movieCompany) => movieCompany.id === movie?.filmCompanyId
);

describe('Movie', () => {
  test('It finds the mock movie', () => {
    expect(movie).toBeTruthy();
  });

  test('It finds the mock movieCompany', () => {
    expect(movieCompany).toBeTruthy();
  });

  test(`It displays a loading state`, async () => {
    const { getAllByText } = render(
      <Table>
        <TableBody>
          <Movie id={id} />
        </TableBody>
      </Table>
    );

    expect(getAllByText('...')).toHaveLength(3);
  });

  test(`It displays an error`, async () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <Movie id="-1" />
        </TableBody>
      </Table>
    );

    await waitFor(() =>
      expect(getByText('Movie not found')).toBeInTheDocument()
    );
  });

  test(`It displays the movie title (${movie!.title})`, async () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <Movie id={id} />
        </TableBody>
      </Table>
    );

    await waitFor(() => expect(getByText(movie!.title)).toBeInTheDocument());
  });

  test('It displays the movie rating', async () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <Movie id={id} />
        </TableBody>
      </Table>
    );

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
    const { getByText } = render(
      <Table>
        <TableBody>
          <Movie id={movieWithNoReviews.id} />
        </TableBody>
      </Table>
    );

    await waitFor(() => expect(getByText('No reviews')).toBeInTheDocument());
  });

  test(`It displays the movie company name(${
    movieCompany!.name
  })`, async () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <Movie id={id} />
        </TableBody>
      </Table>
    );

    await waitFor(() =>
      expect(getByText(movieCompany!.name)).toBeInTheDocument()
    );
  });
});
