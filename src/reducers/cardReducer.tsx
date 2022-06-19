import { ApiCard } from '../components/CardList/CardList';

export interface ICardState {
  cards: Array<ApiCard> | [];
}

type ActionType = { type: 'ADD_CARD'; payload: [] };

const defaultState = {
  cards: [],
};

const cardReducer = (state: ICardState = defaultState, action: ActionType) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        cards: [...state.cards, action.payload]
      };
    default:
      return state;
  }
};

export default cardReducer;
