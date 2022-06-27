import { configureStore } from '@reduxjs/toolkit';
import cardReducer, { ICardState } from '../reducers/cardReducer';
import movieReducer, { IMovieState } from '../reducers/movieReducer';

export interface IState {
  cardReducer: ICardState;
  movieReducer: IMovieState;
}

const store = configureStore({reducer: { cardReducer, movieReducer }, devTools: process.env.NODE_ENV !== 'production'});

export default store;
