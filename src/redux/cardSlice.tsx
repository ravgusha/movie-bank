import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../components/CardList/CardList';

export interface ICardState {
  cards: Array<ICard>;
}

const initialState: ICardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
  },
});

const { actions, reducer } = cardSlice;

export default reducer;
export const { addCard } = actions;
