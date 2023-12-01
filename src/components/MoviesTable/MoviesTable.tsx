import { useMovies } from '../../hooks/useMovies';
import { Movie, MovieLoading } from '../Movie/Movie';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeadProps,
  TableRow,
} from '@mui/material';
import { SortButton } from '../SortButton/SortButton';
import { useMdAndUpBreakpoint } from '../../hooks/useMdAndUpBreakpoint';

export const MoviesTable = () => {
  const {
    data: { movies, count },
    isLoading,
  } = useMovies();

  const isMdAndUp = useMdAndUpBreakpoint();

  const TableHeadProps: TableHeadProps = isMdAndUp
    ? {}
    : { sx: { display: 'none' } };

  return (
    <>
      {!isMdAndUp && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingX="16px"
        >
          Sort by average review
          <SortButton />
        </Stack>
      )}
      <Table>
        <TableHead {...TableHeadProps}>
          <TableRow>
            <TableCell component="th" scope="col">
              Title
            </TableCell>
            <TableCell component="th" scope="col">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                Review
                <SortButton />
              </Stack>
            </TableCell>
            <TableCell component="th" scope="col">
              Film Company
            </TableCell>
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
    </>
  );
};
