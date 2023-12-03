import { useMovie } from '@/src/hooks/useMovie';
import { useToggleQuerystringValue } from '@/src/hooks/useToggleQuerystringValue';
import { SELECTED_MOVIE_ID_QUERYSTRING_KEY } from '@/src/constants/constants';

export const useSelectedMovie = () => {
  const { value: selected } = useToggleQuerystringValue(
    SELECTED_MOVIE_ID_QUERYSTRING_KEY
  );

  const { movie } = useMovie(selected);

  return movie;
};
