import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setAgeLimit, setLanguage, setMoviesPerPage } from '../../../../redux/movieSlice';

const Filters = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isSet = e.target.checked ? true : false;
    const value = e.target.value;

    switch (e.target.name) {
      case 'adult':
        dispatch(setAgeLimit(isSet));
        break;
      case 'language':
        dispatch(setLanguage(value));
        break;
      case 'moviesPerPage':
        dispatch(setMoviesPerPage(value));
        break;
    }
  };

  return (
    <>
      <div>
        <span>Category:</span>
        <input name="adult" type="checkbox" onChange={handleFilterChange} />
        <label>Adult</label>
      </div>
      <div>
        <span>Languages:</span>
        <input name="language" type="radio" value="ru" onChange={handleFilterChange} />
        <label>Russian</label>
        <input name="language" type="radio" value="en" onChange={handleFilterChange} />
        <label>English</label>
      </div>
      <div>
        <span>Movies per page:</span>
        <input name="moviesPerPage" type="radio" value="10" onChange={handleFilterChange} />
        <label>10</label>
        <input name="moviesPerPage" type="radio" value="15" onChange={handleFilterChange} />
        <label>15</label>
        <input name="moviesPerPage" type="radio" value="20" onChange={handleFilterChange} />
        <label>20</label>
      </div>
    </>
  );
};

export default Filters;
