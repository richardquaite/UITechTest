type Entity = {
  id: string;
};

type MovieCompany = { name: string };
interface MovieCompanyEntity extends MovieCompany, Entity {}

type Movie = {
  reviews: number[];
  title: string;
  filmCompanyId: MovieCompanyEntity['id'];
  cost: number;
  releaseYear: number;
};
interface MovieEntity extends Movie, Entity {}
