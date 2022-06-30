import { FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchTerm, sendSearchRequest } from '../CardList/movieSlice';
import { IState } from '../../store';

import './SearchForm.scss';

const SearchForm = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: IState) => state.movie);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm) {
      return;
    } else {
      dispatch(sendSearchRequest(1));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(addSearchTerm(e.target.value));
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
