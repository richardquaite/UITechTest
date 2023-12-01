import { render, waitFor } from 'test-utils';
import { MoviesTable } from '@/src/components/MoviesTable/MoviesTable';
import GetMovies200 from '@/src/mocks/responses/GetMovies200';

describe('MoviesTable', () => {
  test(`It displays the total number of movies`, async () => {
    const { getByText } = render(<MoviesTable />, {
      wrapper: ({ children }) => (
        <div>
          <h1>Some custom wrapper</h1>
          {children}
        </div>
      ),
    });

    await waitFor(() =>
      expect(
        getByText(`Total movies displayed: ${GetMovies200.length}`)
      ).toBeInTheDocument()
    );
    expect(getByText(`Some custom wrapper`)).toBeInTheDocument();
  });
});
