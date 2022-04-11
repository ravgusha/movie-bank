import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList from '../components/CardList/CardList';

const HomePage = () => {
  return (
    <div>
      <MainText />
      <SearchForm />
      <CardList />
    </div>
  );
};

export { HomePage };
