import './Pagination.scss';

interface IPagination {
  changePage: (i: number) => void;
  pages: number;
  currentPage: number;
}

const Pagination = ({ pages, changePage, currentPage }: IPagination) => {
  const pageLinks = [];
  console.log(currentPage);
  for (let i = 1; i <= pages + 1; i++) {
    const active = currentPage == i ? 'active' : '';
    pageLinks.push(
      <li className={`${active}`} key={i} onClick={() => changePage(i)}>
        <a href="#!">{i}</a>
      </li>
    );
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {pageLinks}
      </ul>
    </div>
  );
};

export default Pagination;
