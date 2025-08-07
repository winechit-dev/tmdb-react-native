import { Movie } from './Movie';

export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movie: Movie };
};
