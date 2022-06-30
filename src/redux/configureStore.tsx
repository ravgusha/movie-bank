import { configureStore } from '@reduxjs/toolkit';
import card, { ICardState } from './cardSlice';
import movie, { IMovieState } from './movieSlice';

export interface IState {
  card: ICardState;
  movie: IMovieState;
}

const store = configureStore({reducer: { card, movie }, devTools: process.env.NODE_ENV !== 'production'});

export default store;
