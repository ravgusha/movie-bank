import { ApiCard } from '../components/CardList/CardList';
import { addCardAction } from '../actions/cardActions';
import { createReducer } from '@reduxjs/toolkit';

export interface ICardState {
  cards: Array<ApiCard> | [];
}

type ActionType = { type: 'ADD_CARD'; payload: [] };

const defaultState = {
  cards: [],
};

const cardReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(addCardAction, (state, action) => {
      state.cards.push(action.payload);
    })
    .addDefaultCase(() => {});
});

// const cardReducer = (state: ICardState = defaultState, action: ActionType) => {
//   switch (action.type) {
//     case 'ADD_CARD':
//       return {
//         ...state,
//         cards: [...state.cards, action.payload]
//       };
//     default:
//       return state;
//   }
// };

export default cardReducer;
