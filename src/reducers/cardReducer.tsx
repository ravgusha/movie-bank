import { ApiCard } from '../components/CardList/CardList';
import { addCardAction } from '../actions/cardActions';
import { createReducer } from '@reduxjs/toolkit';

export interface ICardState {
  cards: Array<ApiCard>;
}

const defaultState: ICardState = {
  cards: [],
};

const cardReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(addCardAction, (state, action) => {
      state.cards.push(action.payload);
    })
    .addDefaultCase(() => {});
});

export default cardReducer;
