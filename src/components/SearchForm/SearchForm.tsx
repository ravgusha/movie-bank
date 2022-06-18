import { FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiKey from '../../constants';
import { IState } from '../../reducer';

import './SearchForm.scss';

const SearchForm= () => {
  const dispatch = useDispatch();
  const { searchTerm, moviesPerPage, adult, language } =
    useSelector((state: IState) => state);
    
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm) {
      return;
    } else {
      dispatch({ type: 'searchRequest' });
      dispatch({ type: 'currentPage', data: 0 });
      const endIndex = Number(moviesPerPage);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=${adult}&language=${language}`
      )
        .then((data) => data.json())
        .then((data) => {
          const cuttedMovies = data.results.slice(0, endIndex);
          dispatch({ type: 'movies', data: cuttedMovies });
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

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        data-testid="input"
        className="search-form__input"
        type="text"
        placeholder="Search for movie..."
        onChange={handleChange}
        value={searchTerm}
      />
      <button className="search-form__button">Search</button>
    </form>
  );
};

export default SearchForm;
