import { useMovie } from './useMovie';
import { useSelectedQuerystring } from './useSelectedQuerystring';

export const useSelectedMovie = () => {
  const { selected } = useSelectedQuerystring();

  const { movie } = useMovie(selected);

  return movie;
};
