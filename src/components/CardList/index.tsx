import { useSelector } from 'react-redux';

import { IState } from '../../redux/types';
import CardItem from './components/CardItem/CardItem';

import './CardList.scss';

const CardList = () => {
  const movies = useSelector((state: IState) => state.movie.movies);
  return (
    <ul data-testid="cards" className="cards">
      {movies?.map((movie, i) => {
        return <CardItem key={i} movie={movie} />;
      })}
    </ul>
  );
};

export default CardList;
