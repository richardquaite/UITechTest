import { useMovie } from '@/src/hooks/useMovie';
import {
  Rating,
  Stack,
  TableCell,
  TableCellProps,
  TableRow,
  Typography,
} from '@mui/material';

import { useSelectedQuerystring } from '@/src/hooks/useSelectedQuerystring';
import { useMdAndUpBreakpoint } from '@/src/hooks/useMdAndUpBreakpoint';
import { Link } from 'react-router-dom';

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
  const { selected, nextSelectedQuery } = useSelectedQuerystring();

  const isMdAndUp = useMdAndUpBreakpoint();

  if (!movie && isLoading) {
    return <MovieLoading />;
  }

  if (!movie) {
    return <MovieNotFound />;
  }

  const hasReviews = movie.reviews.length > 0;

  const TableCellProps: TableCellProps = isMdAndUp
    ? {}
    : {
        sx: {
          display: 'block',
          borderBottom: 'none',
          paddingTop: '8px',
          paddingBottom: '8px',
        },
      };

  return (
    <TableRow
      sx={{
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        backgroundColor: selected === movie.id ? 'lightblue' : undefined,
      }}
    >
      <TableCell {...TableCellProps} component="th" scope="row">
        <Typography variant="h6" component="h2">
          <Link to={nextSelectedQuery(movie.id)}>{movie.title}</Link>
        </Typography>
      </TableCell>
      <TableCell {...TableCellProps}>
        <Stack spacing={2} direction="row">
          {hasReviews ? (
            <>
              <Rating
                readOnly
                value={movie.averageReviewScore}
                precision={0.1}
                max={10}
                size={isMdAndUp ? 'medium' : 'small'}
              />
              <Typography>{movie.averageReviewScore}</Typography>
            </>
          ) : (
            'No reviews'
          )}
        </Stack>
      </TableCell>
      <TableCell {...TableCellProps}>
        {movie.filmCompany?.name ?? '-'}
      </TableCell>
    </TableRow>
  );
};
