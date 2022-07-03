import { configureStore } from '@reduxjs/toolkit';
import card  from './cardSlice';
import movie from './movieSlice';

const store = configureStore({reducer: { card, movie }, devTools: process.env.NODE_ENV !== 'production'});

export default store;
