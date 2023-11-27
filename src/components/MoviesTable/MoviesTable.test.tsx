import { render, waitFor } from '../../utils/test-utils';
import { MoviesTable } from './MoviesTable';
import GetMovies200 from '../../mocks/responses/GetMovies200.json';

describe('MoviesTable', () => {
  test(`It displays the total number of movies`, async () => {
    const { getByText } = render(<MoviesTable />);

    await waitFor(() =>
      expect(
        getByText(`Total movies displayed: ${GetMovies200.length}`)
      ).toBeInTheDocument()
    );
  });
});
