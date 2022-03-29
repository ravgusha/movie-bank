import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList from '../components/CardList/CardList';

const Homepage = () => {
  return (
    <div>
      <MainText></MainText>
      <SearchForm></SearchForm>
      <CardList></CardList>
    </div>
  );
};

export { Homepage };
