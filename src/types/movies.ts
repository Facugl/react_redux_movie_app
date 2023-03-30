export interface MoviesState {
  movies: MovieResponse;
  shows: MovieResponse;
  selectMovieOrShow: MovieOrShow;
  status: Status;
}

export interface MovieResponse {
  Search: MovieOrShow[];
  totalResults: string;
  Response: string;
}

export interface MovieOrShow {
  Title: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Runtime: string;
  Year: string;
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Language: string;
  Awards: string;
  Poster: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
