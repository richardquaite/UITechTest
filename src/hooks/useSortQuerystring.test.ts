import { AllTheProviders, renderHook, waitFor } from '../utils/test-utils';
import { useSortQuerystring } from './useSortQuerystring';

describe('useSortQuerystring', () => {
  test('cycles through the sort options', async () => {
    const { result } = renderHook(() => useSortQuerystring(), {
      wrapper: AllTheProviders,
    });
    await waitFor(() => expect(result.current.sort).toBeUndefined());

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toEqual('desc'));

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toEqual('asc'));

    result.current.setSorting();
    await waitFor(() => expect(result.current.sort).toBeUndefined());
  });
});
