import { PropsWithChildren } from 'react';
import { render, waitFor } from 'test-utils';
import { useMovies } from '@/src/hooks/useMovies';
import GetMovies200 from '../mocks/responses/GetMovies200';

const SomeComponent = () => <h1>Component heading</h1>;
const SomeWrapper = ({ children }: PropsWithChildren) => {
  const {
    data: { count },
  } = useMovies();
  return (
    <div>
      <h1>Wrapper heading</h1>
      <h2>Count: {count}</h2>
      {children}
    </div>
  );
};

describe('test-utils', () => {
  test('render allows a nested wrapper inside the default', async () => {
    const { getByRole } = render(<SomeComponent />, { wrapper: SomeWrapper });

    // The component to test
    expect(
      getByRole('heading', { name: 'Component heading' })
    ).toBeInTheDocument();

    // The wrapper provided in the test
    expect(
      getByRole('heading', { name: 'Wrapper heading' })
    ).toBeInTheDocument();

    // Some data from the Redux store in the default wrapper
    await waitFor(() =>
      expect(
        getByRole('heading', { name: `Count: ${GetMovies200.length}` })
      ).toBeInTheDocument()
    );
  });
});
