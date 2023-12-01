import { useMovies } from '@/src/hooks/useMovies';
import { MovieReviewForm } from '@/src/components/MovieReviewForm/MovieReviewForm';
import { MoviesTable } from '@/src/components/MoviesTable/MoviesTable';
import { Button, Stack, Typography } from '@mui/material';
import { ReloadButton } from '@/src/components/ReloadButton/ReloadButton';
import { PageTitle } from '@/src/components/PageTitle/PageTitle';

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
