import { useContext } from 'react';
import { Context } from '../../pages/HomePage';
import './Pagination.scss';

interface IPagination {
  changePage: (i: number) => void;
  pages: number;
}

const Pagination = ({ pages, changePage}: IPagination) => {
  const context = useContext(Context);
  
  const pageLinks = [];

  for (let i = 1; i < pages + 1; i++) {
    const active = context.data.currentPage == i ? 'active' : '';
    pageLinks.push(
      <li className={`${active}`} key={i} onClick={() => changePage(i)}>
        <a href="#!">{i}</a>
      </li>
    );
  }

  return (
    <div className="pagination-container">
        <p>Total pages: {pages}</p>
      <ul className="pagination">
        {pageLinks}
      </ul>
    </div>
  );
};

export default Pagination;
