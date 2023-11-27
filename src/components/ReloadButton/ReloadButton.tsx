import { Button } from '@mui/material';
import { useMovies } from '../../hooks/useMovies';

export const ReloadButton = () => {
  const { refetch, isFetching } = useMovies();

  return (
    <Button onClick={refetch} disabled={isFetching}>
      Reload
    </Button>
  );
};
