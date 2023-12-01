import { render, waitFor } from '@/src/utils/test-utils';
import { MoviesTable } from '@/src/components/MoviesTable/MoviesTable';
import GetMovies200 from '@/src/mocks/responses/GetMovies200';

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
