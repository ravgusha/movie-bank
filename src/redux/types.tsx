export interface IState {
  card: ICardState;
  movie: IMovieState;
}

export interface ICardFields {
  title: string;
  date: string;
  language: string;
  ageLimit: boolean;
  video: boolean;
  poster: FileList;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICardState {
  cards: Array<ICard>;
}

export interface IMovieState {
  searchTerm: string;
  fetchInProgress: boolean;
  totalResults: number;
  currentPage: number;
  adult: boolean;
  language: string;
  moviesPerPage: string;
  movies: Array<ICard> | [];
  currentMovie: ICard | null;
}

export interface IResponse {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export interface ICard {
  adult: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
}

export type ICardItem = {
  key: number;
  movie: ICard;
};
