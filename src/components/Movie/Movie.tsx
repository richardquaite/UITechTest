import { useMovie } from '../../hooks/useMovie';
import {
  Button,
  Link,
  Rating,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelectedQuerystring } from '../../hooks/useSelectedQuerystring';

export const MovieLoading = () => (
  <TableRow>
    <TableCell>...</TableCell>
    <TableCell>...</TableCell>
    <TableCell>...</TableCell>
  </TableRow>
);

export const MovieNotFound = () => (
  <TableRow>
    <TableCell colSpan={3}>Movie not found</TableCell>
  </TableRow>
);

export const Movie = ({ id }: { id: Movie['id'] }) => {
  const { movie, isLoading } = useMovie(id);
  const { selected, setSelected } = useSelectedQuerystring();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  if (!movie && isLoading) {
    return <MovieLoading />;
  }

  if (!movie) {
    return <MovieNotFound />;
  }

  const hasReviews = movie.reviews.length > 0;

  return (
    <TableRow
      onClick={() => setSelected(movie.id)}
      sx={{
        cursor: 'pointer',
        backgroundColor: selected === movie.id ? 'lightblue' : undefined,
      }}
    >
      <TableCell>{movie.title}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row">
          {hasReviews ? (
            <>
              {matches && (
                <Rating
                  readOnly
                  value={movie.averageReviewScore}
                  precision={0.1}
                  max={10}
                />
              )}
              <Typography>{movie.averageReviewScore}</Typography>
            </>
          ) : (
            'No reviews'
          )}
        </Stack>
      </TableCell>
      <TableCell>{movie.filmCompany?.name ?? '-'}</TableCell>
    </TableRow>
  );
};
