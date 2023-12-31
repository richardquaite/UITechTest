import { render, waitFor } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { MovieReviewForm } from './MovieReviewForm';
import GetMovies200 from '../../mocks/responses/GetMovies200.json';
import { waitForRequest } from '../../mocks/node';
import { API_ORIGIN } from '../../constants/constants';

const id = '1';
const movie = GetMovies200.find((movie) => movie.id === id);

describe('MovieReviewForm', () => {
  const location = {
    ...window.location,
    search: `selected=${id}`,
  };
  Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
  });

  test('It finds the mock movie', () => {
    expect(movie).toBeTruthy();
  });

  test('It renders the title', async () => {
    const { getByRole } = render(<MovieReviewForm />);

    await waitFor(() =>
      expect(
        getByRole('heading', {
          name: `Please leave a review for ${movie?.title}`,
        })
      ).toBeInTheDocument()
    );
  });

  test('It displays an error when submitting with no value', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<MovieReviewForm />);

    await waitFor(() =>
      expect(
        getByRole('button', {
          name: `Submit`,
        })
      ).toBeInTheDocument()
    );

    user.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(
        getByText('This field is required. You have entered 0 characters.')
      ).toBeInTheDocument()
    );
  });

  test('It can submit a review successfully', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<MovieReviewForm />);

    await waitFor(() =>
      expect(
        getByRole('button', {
          name: `Submit`,
        })
      ).toBeInTheDocument()
    );

    await user.click(getByRole('textbox', { name: 'Review' }));
    await user.keyboard('Some review');

    user.click(getByRole('button', { name: 'Submit' }));

    const request = await waitForRequest('POST', `${API_ORIGIN}/submitReview`);
    const requestJson = await request.json();
    expect(requestJson.review).toEqual('Some review');

    await waitFor(() =>
      expect(getByText('Thank you for your review!')).toBeInTheDocument()
    );
  });

  test('It can handle errors', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<MovieReviewForm />);

    await waitFor(() =>
      expect(
        getByRole('button', {
          name: `Submit`,
        })
      ).toBeInTheDocument()
    );

    await user.click(getByRole('textbox', { name: 'Review' }));
    await user.keyboard('400');
    user.click(getByRole('button', { name: 'Submit' }));

    const request = await waitForRequest('POST', `${API_ORIGIN}/submitReview`);
    const requestJson = await request.json();
    expect(requestJson.review).toEqual('400');

    /**
     * I'm not sure why this test takes so long
     */
    await waitFor(
      () => expect(getByText('Something went wrong')).toBeInTheDocument(),
      { timeout: 10000 }
    );
  });
});
