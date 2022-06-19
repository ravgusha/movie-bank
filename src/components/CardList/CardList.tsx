import { useSelector } from 'react-redux';
import { IState } from '../../store';
import CardItem from '../CardItem/CardItem';

import './CardList.scss';
export interface ApiCard {
  adult: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
}

const CardList = () => {
  const movies = useSelector((state: IState) => state.movieReducer.movies);
  return (
    <ul data-testid="cards" className="cards">
      {movies?.map((movie, i) => {
        return <CardItem key={i} movie={movie} />;
      })}
    </ul>
  );
};

export default CardList;
