import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch();
  
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    switch (e.target.name) {
      case 'adult':
        e.target.checked
          ? dispatch({ type: 'SET_AGE_LIMIT', payload: true })
          : dispatch({ type: 'SET_AGE_LIMIT', payload: false });
        break;
      case 'language':
        e.target.checked
          ? dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })
          : dispatch({ type: 'SET_LANGUAGE', payload: '' });
        break;
      case 'moviesPerPage':
        dispatch({ type: 'SET_MOVIES_PER_PAGE', PAYLOAD: e.target.value });
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
