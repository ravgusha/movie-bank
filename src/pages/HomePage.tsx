import { ChangeEvent, FormEvent, useReducer } from 'react';

import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList, { ApiCard } from '../components/CardList/CardList';
import CardInfo from '../components/CardInfo/CardInfo';
import Spinner from '../components/Spinner/Spinner';
import apiKey from '../constants';

type ActionType =
  | { type: 'searchRequest' }
  | { type: 'searchSuccess'; data: ApiCard[] }
  | { type: 'searchTerm'; data: string }
  | { type: 'currentMovie'; data: null | ApiCard };

interface IState {
  movies: ApiCard[];
  searchTerm: string;
  currentMovie: null | ApiCard;
  fetchInProgress: boolean;
}
const reducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case 'searchRequest':
      return {
        ...state,
        fetchInProgress: true,
      };
    case 'searchSuccess':
      return {
        ...state,
        movies: action.data,
        fetchInProgress: false,
      };
    case 'searchTerm':
      return {
        ...state,
        searchTerm: action.data,
      };
    case 'currentMovie':
      return {
        ...state,
        currentMovie: action.data,
      };
  }
};

const HomePage = () => {
  const [data, dispatch] = useReducer(reducer, {
    movies: [],
    searchTerm: '',
    currentMovie: null,
    fetchInProgress: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.searchTerm) {
      return;
    } else {
      dispatch({ type: 'searchRequest' });
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.searchTerm}`)
        .then((data) => data.json())
        .then((data) => {
          dispatch({ type: 'searchSuccess', data: [...data.results] });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({ type: 'searchTerm', data: e.target.value });
    localStorage.setItem('inputValue', e.target.value);
  };

  const viewCardInfo = (id: number) => {
    let filteredMovie = null;
    data.movies.forEach((movie) => {
      if (movie['id'] === id) {
        filteredMovie = movie;
      }
    });
    dispatch({ type: 'currentMovie', data: filteredMovie });
  };

  const closeCardInfo = () => {
    dispatch({ type: 'currentMovie', data: null });
  };

  return (
    <div>
      {data.currentMovie ? (
        <CardInfo closeCardInfo={closeCardInfo} currentMovie={data.currentMovie} />
      ) : null}
      <MainText />
      <SearchForm value={data.searchTerm} handleSubmit={handleSubmit} handleChange={handleChange} />
      {data.fetchInProgress ? (
        <Spinner />
      ) : (
        <CardList movies={data.movies} viewCardInfo={viewCardInfo} />
      )}
    </div>
  );
};

export { HomePage };
