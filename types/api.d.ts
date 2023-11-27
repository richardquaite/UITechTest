type MovieCompany = { id: string; name: string };

type Movie = {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: MovieCompany['id'];
  cost: number;
  releaseYear: number;
};
