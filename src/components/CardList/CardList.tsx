import { Component } from 'react';
import './CardList.scss';
import CardItem from '../CardItem/CardItem';
interface ApiCard {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface MyProps {
  movies: ApiCard[];
}
class CardList extends Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
  }

  // cards = this.props.movies.map((item) => {
  //   console.log(item)
  //   return <CardItem key={item.id} image={item.poster_path} />;
  // });

  render() {
    return (
      <ul data-testid="cards" className="cards">
        {this.props.movies.map((movie, i) => {
          return <CardItem key={i} image={movie.poster_path} />;
        })}
      </ul>
    );
  }
}

export default CardList;
