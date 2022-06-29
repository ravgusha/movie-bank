import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import apiKey from '../../constants';
import { IState } from '../../store';
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

// const { searchTerm, moviesPerPage, adult, language } =
// useSelector((state: IState) => state.movie);

export const sendSearchRequest = createAsyncThunk('movies/sendSearchRequest', () => {
  const { searchTerm, adult, language } = useSelector((state: IState) => state.movie);
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=${adult}&language=${language}`
  );
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    startfetchMovies: (state) => {
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
  // ПОКА НЕ РАБОТАЕТ
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(sendSearchRequest.pending, (state) => {
  //       state.fetchInProgress = true;
  //     })
  //     .addCase(sendSearchRequest.fulfilled, (state, action) => {
  //       const { moviesPerPage } = useSelector((state: IState) => state.movie);
  //       const endIndex = Number(moviesPerPage);
  //       const cuttedMovies = action.payload.results.slice(0, endIndex);

  //       state.fetchInProgress = false;
  //       state.currentPage = 0;
  //       state.movies = cuttedMovies;
  //       state.totalResults = action.payload.total_results;
  //     })
  //     .addCase(sendSearchRequest.rejected, () => {
  //       console.log('error');
  //     }).addDefaultCase(() => {});
  // },
});

const { actions, reducer } = movieSlice;

export default reducer;
export const {
  addMovies,
  startfetchMovies,
  cancelFetchMovies,
  addSearchTerm,
  setCurrentPage,
  setMoviesPerPage,
  setTotalResults,
  setCurrentMovie,
  setAgeLimit,
  setLanguage,
} = actions;
