import { ApiCard } from '../components/CardList/CardList';

export interface IMovieState {
  searchTerm: string;
  fetchInProgress: boolean;
  totalResults: number;
  currentPage: number;
  adult: boolean;
  language: string;
  moviesPerPage: string;
  movies: Array<ApiCard> | [];
  currentMovie: ApiCard | null;
}

type ActionType =
  | { type: 'FETCH_MOVIES' }
  | { type: 'CANCEL_FETCH_MOVIES' }
  | { type: 'ADD_SEARCH_TERM'; payload: string }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_TOTAL_RESULTS'; payload: number }
  | { type: 'SET_AGE_LIMIT'; payload: boolean }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_MOVIES_PER_PAGE'; payload: string }
  | { type: 'ADD_MOVIES'; payload: [] }
  | { type: 'SET_CURRENT_MOVIE'; payload: ApiCard | null };

const defaultState = {
  searchTerm: '',
  fetchInProgress: false,
  totalResults: 0,
  currentPage: 1,
  adult: false,
  language: '',
  moviesPerPage: '20',
  movies: [],
  currentMovie: null,
};

const movieReducer = (state: IMovieState = defaultState, action: ActionType) => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return {
        ...state,
        fetchInProgress: true,
      };
    case 'CANCEL_FETCH_MOVIES':
      return {
        ...state,
        fetchInProgress: false,
      };
    case 'ADD_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_TOTAL_RESULTS':
      return {
        ...state,
        totalResults: action.payload,
      };
    case 'SET_AGE_LIMIT':
      return {
        ...state,
        adult: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_MOVIES_PER_PAGE':
      return {
        ...state,
        moviesPerPage: action.payload,
      };
    case 'ADD_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'SET_CURRENT_MOVIE':
      return {
        ...state,
        currentMovie: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
