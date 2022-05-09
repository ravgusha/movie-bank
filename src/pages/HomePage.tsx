import { ChangeEvent, FormEvent, useContext, useEffect, useReducer } from 'react';

import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList, { ApiCard } from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import apiKey from '../constants';
import { GlobalContext } from '../App';

export const movies: ApiCard[] = [];

type ActionType =
  | { type: 'searchRequest' }
  | { type: 'searchSuccess'; data: ApiCard[] }
  | { type: 'searchTerm'; data: string }
  | { type: 'currentPage'; data: number }
  | { type: 'totalResults'; data: number };

interface IState {
  movies: ApiCard[];
  searchTerm: string;
  fetchInProgress: boolean;
  totalResults: number;
  currentPage: number;
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
    case 'currentPage':
      return {
        ...state,
        currentPage: action.data,
      };
    case 'totalResults':
      return {
        ...state,
        totalResults: action.data,
      };
  }
};

const HomePage = () => {
  const context = useContext(GlobalContext);

  const [data, dispatch] = useReducer(reducer, {
    movies: [],
    searchTerm: '',
    fetchInProgress: false,
    totalResults: 0,
    currentPage: 1,
  });

  useEffect(() => {
    if (context.movies) {
      dispatch({ type: 'searchSuccess', data: [...context.movies] });
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.searchTerm) {
      return;
    } else {
      dispatch({ type: 'searchRequest' });
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.searchTerm}`)
        .then((data) => data.json())
        .then((data) => {
          movies.push(...data.results);
          dispatch({ type: 'searchSuccess', data: [...data.results] });
          dispatch({ type: 'totalResults', data: data.total_results });
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

  const changePage = (pageNumber: number) => {
    dispatch({ type: 'searchRequest' });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.searchTerm}&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: 'searchSuccess', data: [...data.results] });
        dispatch({ type: 'currentPage', data: data.page });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const numberOfPages = Math.ceil(data.totalResults / 20);

  return (
    <div>
      <MainText />
      <SearchForm value={data.searchTerm} handleSubmit={handleSubmit} handleChange={handleChange} />
      {data.fetchInProgress ? <Spinner /> : <CardList movies={data.movies} />}
      {data.totalResults > 20 ? (
        <Pagination pages={numberOfPages} changePage={changePage} currentPage={data.currentPage} />
      ) : null}
    </div>
  );
};

export { HomePage };
