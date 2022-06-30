import MainText from './components/MainText/MainText';
import SearchForm from './components/SearchForm/SearchForm';
import CardList from '../../components/CardList/CardList';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from './components/Pagination/Pagination';
import Filters from './components/Filters/Filters';
import { useSelector } from 'react-redux';
import { IState } from '../../redux/configureStore';

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
