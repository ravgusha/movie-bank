import { useSelector } from 'react-redux';

import MainText from './components/MainText/MainText';
import SearchForm from './components/SearchForm/SearchForm';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from './components/Pagination/Pagination';
import Filters from './components/Filters/Filters';
import CardList from '../../components/CardList';
import { IState } from '../../redux/types';

const Home = () => {
  const { totalResults, fetchInProgress } = useSelector((state: IState) => state.movie);

  return (
    <div>
      <MainText />
      <SearchForm />
      <Filters />
      {fetchInProgress ? <Spinner /> : <CardList />}
      {totalResults > 20 ? <Pagination /> : null}
    </div>
  );
};

export { Home };
