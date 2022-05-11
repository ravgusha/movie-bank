import { ChangeEvent, FormEvent, useContext, useEffect, useReducer } from 'react';

import { GlobalContext } from '../App';
import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import Filters from '../components/Filters/Filters';
import apiKey from '../constants';

type ActionType =
  | { type: 'searchRequest' }
  | { type: 'searchSuccess' }
  | { type: 'searchTerm'; data: string }
  | { type: 'currentPage'; data: number }
  | { type: 'totalResults'; data: number }
  | { type: 'adult'; data: boolean }
  | { type: 'searchTerm'; data: string }
  | { type: 'language'; data: string }
  | { type: 'moviesPerPage'; data: string };

interface IState {
  searchTerm: string;
  fetchInProgress: boolean;
  totalResults: number;
  currentPage: number;
  adult: boolean;
  language: string;
  moviesPerPage: string;
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
    case 'adult':
      return {
        ...state,
        adult: action.data,
      };
    case 'language':
      return {
        ...state,
        language: action.data,
      };
    case 'moviesPerPage':
      return {
        ...state,
        moviesPerPage: action.data,
      };
  }
};

const HomePage = () => {
  const context = useContext(GlobalContext);

  const [data, dispatch] = useReducer(reducer, {
    searchTerm: '',
    fetchInProgress: false,
    totalResults: 0,
    currentPage: 1,
    adult: false,
    language: '',
    moviesPerPage: '20',
  });

  useEffect(() => {
    if (context.movies) {
      context.setMovies([...context.movies]);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.searchTerm) {
      return;
    } else {
      dispatch({ type: 'searchRequest' });
      const moviesPerPage = Number(data.moviesPerPage);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.searchTerm}&include_adult=${data.adult}&language=${data.language}`
      )
        .then((data) => data.json())
        .then((data) => {
          const cuttedMovies= (data.results).slice(0, moviesPerPage)
          context.setMovies(cuttedMovies);
          dispatch({ type: 'searchSuccess' });
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

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    switch (e.target.name) {
      case 'adult':
        e.target.checked
          ? dispatch({ type: 'adult', data: true })
          : dispatch({ type: 'adult', data: false });
        break;
      case 'language':
        e.target.checked
          ? dispatch({ type: 'language', data: e.target.value })
          : dispatch({ type: 'language', data: '' });
        break;
      case 'moviesPerPage':
        dispatch({ type: 'moviesPerPage', data: e.target.value });
        break;
    }
  };

  const changePage = (pageNumber: number) => {
    dispatch({ type: 'searchRequest' });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.searchTerm}&page=${pageNumber}&include_adult=${data.adult}&language=${data.language}`
    )
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: 'searchSuccess'});
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
      <Filters handleChange={handleFilterChange} />
      {data.fetchInProgress ? <Spinner /> : <CardList movies={context.movies} />}
      {data.totalResults > 20 ? (
        <Pagination pages={numberOfPages} changePage={changePage} currentPage={data.currentPage} />
      ) : null}
    </div>
  );
};

export { HomePage };
