import { render } from '@/src/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { SortButton } from '@/src/components/SortButton/SortButton';

const getSortQuery = () =>
  new URLSearchParams(window.location.search).get('sort');

describe('SortButton', () => {
  test('It sets the correct query onClick', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<SortButton />);
    const sortButton = getByRole('button');

    expect(getSortQuery()).toBeNull();

    await user.click(sortButton);
    expect(getSortQuery()).toEqual('desc');

    await user.click(sortButton);
    expect(getSortQuery()).toEqual('asc');

    await user.click(sortButton);
    expect(getSortQuery()).toBeNull();
  });
});
