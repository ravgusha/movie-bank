import { ApiCard } from './components/CardList/CardList';

export interface IState {
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
  | { type: 'searchRequest' }
  | { type: 'searchSuccess' }
  | { type: 'searchTerm'; data: string }
  | { type: 'currentPage'; data: number }
  | { type: 'totalResults'; data: number }
  | { type: 'adult'; data: boolean }
  | { type: 'searchTerm'; data: string }
  | { type: 'language'; data: string }
  | { type: 'moviesPerPage'; data: string }
  | { type: 'movies'; data: [] }
  | { type: 'currentMovie'; data: ApiCard | null };

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

const reducer = (state: IState = defaultState, action: ActionType) => {
  switch (action.type) {
    case 'searchRequest':
      return {
        ...state,
        fetchInProgress: true,
      };
    case 'searchSuccess':
      return {
        ...state,
        fetchInProgress: false,
      };
    case 'searchTerm':
      return {
        ...state,
        searchTerm: action.data,
      };
    case 'currentPage':
      return {
        ...state,
        currentPage: action.data,
      };
    case 'totalResults':
      return {
        ...state,
        totalResults: action.data,
      };
    case 'adult':
      return {
        ...state,
        adult: action.data,
      };
    case 'language':
      return {
        ...state,
        language: action.data,
      };
    case 'moviesPerPage':
      return {
        ...state,
        moviesPerPage: action.data,
      };
    case 'movies':
      return {
        ...state,
        movies: action.data,
      };
    case 'currentMovie':
      return {
        ...state,
        currentMovie: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
