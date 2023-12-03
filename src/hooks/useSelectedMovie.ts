import { useMovie } from '@/src/hooks/useMovie';
import { useToggleQuerystringValue } from '@/src/hooks/useToggleQuerystringValue';

export const useSelectedMovie = () => {
  const { value: selected } = useToggleQuerystringValue('selected');

  const { movie } = useMovie(selected);

  return movie;
};
