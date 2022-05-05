import { useContext } from 'react';
import { Context } from '../../pages/HomePage';

import './SearchForm.scss';
interface ISearchForm {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
}

const SearchForm = ({ handleChange, handleSubmit}: ISearchForm) => {
  const context = useContext(Context);
  
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        data-testid="input"
        className="search-form__input"
        type="text"
        placeholder="Search for movie..."
        onChange={handleChange}
        value={context.data.searchTerm}
      />
      <button className="search-form__button">Search</button>
    </form>
  );
};

export default SearchForm;
