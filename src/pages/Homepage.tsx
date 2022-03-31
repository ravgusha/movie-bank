import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList from '../components/CardList/CardList';
import CardAddForm from '../components/CardAddForm/CardAddForm';

const HomePage = () => {
  return (
    <div>
      <CardAddForm />
      <MainText />
      <SearchForm />
      <CardList />
    </div>
  );
};

export { HomePage };
