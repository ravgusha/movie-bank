import { configureStore } from '@reduxjs/toolkit';
import card, { ICardState } from '../components/CardAddForm/cardSlice';
import movie, { IMovieState } from '../components/CardList/movieSlice';

export interface IState {
  card: ICardState;
  movie: IMovieState;
}

const store = configureStore({reducer: { card, movie }, devTools: process.env.NODE_ENV !== 'production'});

export default store;
