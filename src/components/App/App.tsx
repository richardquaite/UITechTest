import { useMovies } from '../../hooks/useMovies';
import { MovieReviewForm } from '../MovieReviewForm/MovieReviewForm';
import { MoviesTable } from '../MoviesTable/MoviesTable';
import { Button, Stack, Typography } from '@mui/material';
import { ReloadButton } from '../ReloadButton/ReloadButton';
import { PageTitle } from '../PageTitle/PageTitle';

export const App = () => {
  const { isError, isFetching, refetch } = useMovies();

  if (isError) {
    /**
     * Using <ReloadButton /> here is causing it to refetch continuously, so
     * it's copied here.  I'll investigate when I have time.
     */
    return (
      <Stack spacing={4}>
        <Typography variant="h4" component="h1">
          Something went wrong
        </Typography>
        <Button onClick={refetch} disabled={isFetching}>
          Reload
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={4}>
      <PageTitle>Welcome to Movie database!</PageTitle>

      <ReloadButton />

      <MoviesTable />

      <MovieReviewForm />
    </Stack>
  );
};
