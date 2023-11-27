import { useMovies } from '../../hooks/useMovies';
import { MovieReviewForm } from '../MovieReviewForm/MovieReviewForm';
import { MoviesTable } from '../MoviesTable/MoviesTable';
import {
  Box,
  Button,
  Dialog,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReloadButton } from '../ReloadButton/ReloadButton';
import { useSelectedQuerystring } from '../../hooks/useSelectedQuerystring';
import { useSelectedMovie } from '../../hooks/useSelectedMovie';
import { PageTitle } from '../PageTitle/PageTitle';

export const App = () => {
  const { isError, isFetching, refetch } = useMovies();
  const { setSelected, selected } = useSelectedQuerystring();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const movie = useSelectedMovie();

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

      {selected &&
        movie &&
        (matches ? (
          <MovieReviewForm />
        ) : (
          <Dialog open onClose={() => setSelected(selected)}>
            <Box padding={2}>
              <MovieReviewForm />
            </Box>
          </Dialog>
        ))}
    </Stack>
  );
};
