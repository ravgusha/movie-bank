import { createSlice } from '@reduxjs/toolkit';
import { ApiCard } from './CardList';

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

const initialState: IMovieState = {
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

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    fetchMovies: (state) => {
      state.fetchInProgress = true;
    },
    cancelFetchMovies: (state) => {
      state.fetchInProgress = false;
    },
    addSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setMoviesPerPage: (state, action) => {
      state.moviesPerPage = action.payload;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
    setAgeLimit: (state, action) => {
      state.adult = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

const { actions, reducer } = movieSlice;

export default reducer;
export const {
  addMovies,
  fetchMovies,
  cancelFetchMovies,
  addSearchTerm,
  setCurrentPage,
  setMoviesPerPage,
  setTotalResults,
  setCurrentMovie,
  setAgeLimit,
  setLanguage,
} = actions;
