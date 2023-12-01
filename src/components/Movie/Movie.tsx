import { useMovie } from '../../hooks/useMovie';
import { Rating, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useSelectedQuerystring } from '../../hooks/useSelectedQuerystring';
import { useMdAndUpBreakpoint } from '../../hooks/useMdAndUpBreakpoint';

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

  const isMdAndUp = useMdAndUpBreakpoint();

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
              {isMdAndUp && (
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
