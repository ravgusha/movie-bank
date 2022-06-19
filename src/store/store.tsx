import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cardReducer, { ICardState } from '../reducers/cardReducer';
import movieReducer, { IMovieState } from '../reducers/movieReducer';

export interface IState {
  cardReducer: ICardState;
  movieReducer: IMovieState;
}

const rootReducer = combineReducers({ cardReducer, movieReducer });

const store = createStore(rootReducer, composeWithDevTools());

export default store;
