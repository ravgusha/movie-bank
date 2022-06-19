import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import apiKey from '../../constants';

import './Pagination.scss';

const Pagination = () => {
  const dispatch = useDispatch();


  const { searchTerm, moviesPerPage, currentPage, adult, language, totalResults } = useSelector(
    (state: IState) => state.movieReducer
  );

  const pageLinks = [];
  const pages = Math.ceil(totalResults / 20);

  const changePage = (pageNumber: number) => {
    const endIndex = Number(moviesPerPage);
    dispatch({ type: 'FETCH_MOVIES' });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNumber}&include_adult=${adult}&language=${language}`
    )
      .then((data) => data.json())
      .then((data) => {
        const cuttedMovies = data.results.slice(0, endIndex);
        dispatch({ type: 'ADD_MOVIES', payload: cuttedMovies });
        dispatch({ type: 'CANCEL_FETCH_MOVIES' });
        dispatch({ type: 'SET_CURRENT_PAGE', payload: data.page });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  for (let i = 1; i < pages + 1; i++) {
    const active = currentPage == i ? 'active' : '';
    pageLinks.push(
      <li className={`${active}`} key={i} onClick={() => changePage(i)}>
        <a href="#!">{i}</a>
      </li>
    );
  }

  return (
    <div className="pagination-container">
      <p>Total pages: {pages}</p>
      <ul className="pagination">{pageLinks}</ul>
    </div>
  );
};

export default Pagination;
