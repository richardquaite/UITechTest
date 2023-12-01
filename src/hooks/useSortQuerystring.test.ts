import { AllTheProviders, renderHook, waitFor } from '../utils/test-utils';
import { useSortQuerystring } from './useSortQuerystring';

describe('useSortQuerystring', () => {
  test('cycles through the sort options', async () => {
    const { result } = renderHook(() => useSortQuerystring(), {
      wrapper: AllTheProviders,
    });
    await waitFor(() => expect(result.current.sort).toBeUndefined());
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get('sort')).toBeNull()
    );

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toEqual('desc'));
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get('sort')).toEqual(
        'desc'
      )
    );

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toEqual('asc'));
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get('sort')).toEqual(
        'asc'
      )
    );

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toBeUndefined());
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get('sort')).toBeNull()
    );
  });

  test('allows a sortKey argument to define the querystring key', async () => {
    const sortKey = 'myUniqueSortKey';

    const { result } = renderHook(() => useSortQuerystring(sortKey), {
      wrapper: AllTheProviders,
    });
    await waitFor(() => expect(result.current.sort).toBeUndefined());
    await waitFor(() =>
      expect(
        new URLSearchParams(window.location.search).get(sortKey)
      ).toBeNull()
    );

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toEqual('desc'));
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get(sortKey)).toEqual(
        'desc'
      )
    );

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toEqual('asc'));
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get(sortKey)).toEqual(
        'asc'
      )
    );

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toBeUndefined());
    await waitFor(() =>
      expect(
        new URLSearchParams(window.location.search).get(sortKey)
      ).toBeNull()
    );
  });
});
