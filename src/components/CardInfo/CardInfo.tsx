import { Component } from 'react';
import './CardInfo.scss';
import { ApiCard } from '../CardList/CardList';

interface MyProps {
  closeCardInfo: () => void;
  currentMovie?: ApiCard | null;
}

class CardInfo extends Component<MyProps> {
  render() {
    return (
      <div className="info">
        <div className="info__content">
          <div className="info__header" onClick={this.props.closeCardInfo}>
            <span>X</span>
          </div>
          <div className="info__main">
            <div className="info__image">
              {this.props.currentMovie.poster_path == null ? (
                <img src={`${process.env.PUBLIC_URL}/noImage.jpg`} />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w200${this.props.currentMovie.poster_path}`}
                />
              )}
            </div>
            <div className="info__text">
              <p>{this.props.currentMovie.title}</p>
              <p>{this.props.currentMovie.release_date}</p>
              <p>{this.props.currentMovie.original_language}</p>

             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// adult: boolean;
// backdrop_path: string;
// genre_ids: number[];
// id: number;
// original_language: string;
// original_title: string;
// overview: string;
// popularity: number;
// poster_path: string;
// release_date: string;
// title: string;
// video: boolean;
// vote_average: number;
// vote_count: number;
export default CardInfo;
