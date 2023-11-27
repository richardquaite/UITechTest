import { useMovies } from '../../hooks/useMovies';
import { Movie, MovieLoading } from '../Movie/Movie';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { SortButton } from '../SortButton/SortButton';

export const MoviesTable = () => {
  const {
    data: { movies, count },
    isLoading,
  } = useMovies();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Review
              <SortButton />
            </Stack>
          </TableCell>
          <TableCell>Film Company</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movies.length === 0 && isLoading ? (
          <>
            <MovieLoading />
            <MovieLoading />
            <MovieLoading />
          </>
        ) : movies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>There are no movies to display</TableCell>
          </TableRow>
        ) : (
          movies.map((movie) => <Movie key={movie.id} id={movie.id} />)
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total movies displayed: {count}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
