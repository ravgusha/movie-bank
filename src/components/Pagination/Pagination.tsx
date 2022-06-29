import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { sendSearchRequest } from '../CardList/movieSlice';

import './Pagination.scss';

const Pagination = () => {
  const dispatch = useDispatch();

  const { currentPage, totalResults } = useSelector((state: IState) => state.movie);

  const pageLinks = [];
  const pages = Math.ceil(totalResults / 20);

  const changePage = (pageNumber: number) => {
    dispatch(sendSearchRequest(pageNumber));
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
