type Entity = {
  id: string;
};

type MovieCompany = { name: string };
type MovieCompanyEntity = Entity & MovieCompany;

type Movie = {
  reviews: number[];
  title: string;
  filmCompanyId: MovieCompanyEntity['id'];
  cost: number;
  releaseYear: number;
};
type MovieEntity = Entity & Movie;
