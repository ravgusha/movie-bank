import { createSlice } from '@reduxjs/toolkit';
import { ICardState } from './types';


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
