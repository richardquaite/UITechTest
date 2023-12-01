import { useMovie } from '@/src/hooks/useMovie';
import { useSelectedQuerystring } from '@/src/hooks/useSelectedQuerystring';

export const useSelectedMovie = () => {
  const { selected } = useSelectedQuerystring();

  const { movie } = useMovie(selected);

  return movie;
};
