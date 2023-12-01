import { AllTheProviders, act, renderHook, waitFor } from 'test-utils';
import {
  useGetMovieCompaniesQuery,
  useGetMoviesQuery,
  usePostMovieReviewMutation,
} from '@/src/redux/apiSlice';
import GetMovies200 from '@/src/mocks/responses/GetMovies200';
import GetMovieCompanies200 from '@/src/mocks/responses/GetMovieCompanies200';
import { waitForRequest } from '@/src/mocks/node';
import { API_ORIGIN } from '@/src/constants/constants';

describe('apiSlice', () => {
  test('getMovies returns loading states and results', async () => {
    const { result } = renderHook(() => useGetMoviesQuery(), {
      wrapper: AllTheProviders,
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toMatchObject(GetMovies200);
  });

  test('getMovieCompanies returns loading states and results', async () => {
    const { result } = renderHook(() => useGetMovieCompaniesQuery(), {
      wrapper: AllTheProviders,
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toMatchObject(GetMovieCompanies200);
  });

  it('usePostMovieReviewMutation returns loading states and result', async () => {
    const payload = { review: 'Some review' };
    const pendingRequest = waitForRequest('POST', `${API_ORIGIN}/submitReview`);
    const { result } = renderHook(() => usePostMovieReviewMutation(), {
      wrapper: AllTheProviders,
    });

    const [postMovieReview, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);
    act(() => {
      void postMovieReview(payload);
    });

    expect(result.current[1].data).toBeUndefined();
    expect(result.current[1].isLoading).toBe(true);

    await waitFor(() => expect(result.current[1]).toBeDefined());
    expect(result.current[1].data).toEqual({
      message: 'Thank you for your review!',
    });
    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[1].isSuccess).toBe(true);

    const request = await pendingRequest;
    const requestBody = await request.json();
    expect(requestBody).toEqual(payload);
  });

  it('usePostMovieReviewMutation returns errors', async () => {
    const payload = { review: '400' };
    const pendingRequest = waitForRequest('POST', `${API_ORIGIN}/submitReview`);
    const { result } = renderHook(() => usePostMovieReviewMutation(), {
      wrapper: AllTheProviders,
    });

    const [postMovieReview, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);
    act(() => {
      void postMovieReview(payload);
    });

    expect(result.current[1].data).toBeUndefined();
    expect(result.current[1].isLoading).toBe(true);

    await waitFor(() => expect(result.current[1].isLoading).toBe(false));
    expect(result.current[1].isSuccess).toBe(false);

    const request = await pendingRequest;
    const requestBody = await request.json();
    expect(requestBody).toEqual(payload);
  });
});
