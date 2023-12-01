import { ExpandLess, ExpandMore, UnfoldMore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSortQuerystring } from '@/src/hooks/useSortQuerystring';

export const SortButton = () => {
  const { sort, setSorting } = useSortQuerystring();

  return sort === 'asc' ? (
    <IconButton title="Remove sorting" onClick={setSorting}>
      <ExpandLess />
    </IconButton>
  ) : sort === 'desc' ? (
    <IconButton title="Sort by lowest" onClick={setSorting}>
      <ExpandMore />
    </IconButton>
  ) : (
    <IconButton title="Sort by highest" onClick={setSorting}>
      <UnfoldMore />
    </IconButton>
  );
};
