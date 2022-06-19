import { ApiCard } from '../components/CardList/CardList';

export interface ICardState {
  cards: Array<ApiCard> | [];
}

type ActionType = { type: 'cards'; data: [] };

const defaultState = {
  cards: [],
};

const cardReducer = (state: ICardState = defaultState, action: ActionType) => {
  switch (action.type) {
    case 'cards':
      return {
        ...state,
        cards: [...state.cards, action.data]
      };
    default:
      return state;
  }
};

export default cardReducer;
