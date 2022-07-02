import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiKey from '../constants';
import { IState } from './configureStore';
import { ICard } from '../components/CardList/CardList';

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

export const sendSearchRequest = createAsyncThunk(
  'movies/sendSearchRequest',
  async (page: number, { getState }) => {
    const { movie }: IState = getState();
    return await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie.searchTerm}&page=${page}&include_adult=${movie.adult}&language=${movie.language}`
    ).then((data) => data.json());
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMoviesPerPage: (state, action) => {
      state.moviesPerPage = action.payload;
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

  extraReducers: (builder) => {
    builder
      .addCase(sendSearchRequest.pending, (state) => {
        console.log('1');
        state.fetchInProgress = true;
      })
      .addCase(sendSearchRequest.fulfilled, (state, action) => {
        console.log('2');
        const moviesPerPage = state.moviesPerPage;
        console.log(state.moviesPerPage);
        const endIndex = Number(moviesPerPage);
        const cuttedMovies = action.payload.results.slice(0, endIndex);

        state.fetchInProgress = false;
        state.currentPage = action.payload.page;
        state.movies = cuttedMovies;
        state.totalResults = action.payload.total_results;
      })
      .addCase(sendSearchRequest.rejected, () => {
        console.log('3');
        console.log('error');
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = movieSlice;

export default reducer;
export const { addSearchTerm, setMoviesPerPage, setCurrentMovie, setAgeLimit, setLanguage } =
  actions;
