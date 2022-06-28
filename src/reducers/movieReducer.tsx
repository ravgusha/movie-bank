import { createReducer } from '@reduxjs/toolkit';
import {
  cancelFetchMoviesAction,
  fetchMoviesAction,
  addSearchTermAction,
  setCurrentPageAction,
  setCurrentMovieAction,
  setMoviesPerPageAction,
  setTotalResultsAction,
  addMoviesAction,
  setLanguageAction,
  setAgeLimitAction,
} from '../actions/movieActions';
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

const defaultState: IMovieState = {
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

const movieReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(fetchMoviesAction, (state) => {
      state.fetchInProgress = true;
    })
    .addCase(cancelFetchMoviesAction, (state) => {
      state.fetchInProgress = false;
    })
    .addCase(addSearchTermAction, (state, action) => {
      state.searchTerm = action.payload;
    })
    .addCase(setCurrentPageAction, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(setMoviesPerPageAction, (state, action) => {
      state.moviesPerPage = action.payload;
    })
    .addCase(setTotalResultsAction, (state, action) => {
      state.totalResults = action.payload;
    })
    .addCase(addMoviesAction, (state, action) => {
      state.movies = action.payload;
    })
    .addCase(setCurrentMovieAction, (state, action) => {
      state.currentMovie = action.payload;
    })
    .addCase(setAgeLimitAction, (state, action) => {
      state.adult = action.payload;
    })
    .addCase(setLanguageAction, (state, action) => {
      state.language = action.payload;
    })
    .addDefaultCase(() => {});
});

// const movieReducer = (state: IMovieState = defaultState, action: ActionType) => {
//   switch (action.type) {
//     case 'FETCH_MOVIES':
//       return {
//         ...state,
//         fetchInProgress: true,
//       };
//     case 'CANCEL_FETCH_MOVIES':
//       return {
//         ...state,
//         fetchInProgress: false,
//       };
//     case 'ADD_SEARCH_TERM':
//       return {
//         ...state,
//         searchTerm: action.payload,
//       };
//     case 'SET_CURRENT_PAGE':
//       return {
//         ...state,
//         currentPage: action.payload,
//       };
//     case 'SET_TOTAL_RESULTS':
//       return {
//         ...state,
//         totalResults: action.payload,
//       };
//     case 'SET_AGE_LIMIT':
//       return {
//         ...state,
//         adult: action.payload,
//       };
//     case 'SET_LANGUAGE':
//       return {
//         ...state,
//         language: action.payload,
//       };
//     case 'SET_MOVIES_PER_PAGE':
//       return {
//         ...state,
//         moviesPerPage: action.payload,
//       };
//     case 'ADD_MOVIES':
//       return {
//         ...state,
//         movies: action.payload,
//       };
//     case 'SET_CURRENT_MOVIE':
//       return {
//         ...state,
//         currentMovie: action.payload,
//       };
//     default:
//       return state;
//   }
// };

export default movieReducer;
