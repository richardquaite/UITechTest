type Sort = 'asc' | 'desc' | undefined;

type ExtendedMovieEntity = MovieEntity & {
  filmCompany: MovieCompanyEntity | null;
  averageReviewScore: number;
};
