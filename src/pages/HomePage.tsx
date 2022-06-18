import { ChangeEvent, FormEvent, useContext, useEffect, useReducer } from 'react';

import { GlobalContext } from '../App';
import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import Filters from '../components/Filters/Filters';
import apiKey from '../constants';
import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../reducer';

const HomePage = () => {
  // const context = useContext(GlobalContext);
  // const store = createStore(reducer);

  // const [data, dispatch] = useReducer(reducer, {
  //   searchTerm: '',
  //   fetchInProgress: false,
  //   totalResults: 0,
  //   currentPage: 1,
  //   adult: false,
  //   language: '',
  //   moviesPerPage: '20',
  // });

  // useEffect(() => {
  //   if (context.movies) {
  //     context.setMovies([...context.movies]);
  //   }
  // }, []);

  const dispatch = useDispatch();
  const { searchTerm, moviesPerPage, totalResults, fetchInProgress, currentPage, adult, language, movies } =
    useSelector((state: IState) => state);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm) {
      return;
    } else {
      dispatch({ type: 'searchRequest' });
      const endIndex = Number(moviesPerPage);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=${adult}&language=${language}`
      )
        .then((data) => data.json())
        .then((data) => {
          const cuttedMovies = data.results.slice(0, endIndex);
          dispatch({ type: 'movies', data: cuttedMovies });
          // context.setMovies(cuttedMovies);
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
    console.log(e.target.value);
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
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNumber}&include_adult=${adult}&language=${language}`
    )
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: 'searchSuccess' });
        dispatch({ type: 'currentPage', data: data.page });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const numberOfPages = Math.ceil(totalResults / 20);

  return (
    <div>
      <MainText />
      <SearchForm value={searchTerm} handleSubmit={handleSubmit} handleChange={handleChange} />
      <Filters handleChange={handleFilterChange} />
      {fetchInProgress ? <Spinner /> : <CardList movies={movies} />}
      {totalResults > 20 ? (
        <Pagination pages={numberOfPages} changePage={changePage} currentPage={currentPage} />
      ) : null}
    </div>
  );
};

export { HomePage };
