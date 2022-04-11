import { Component } from 'react';
import { ApiCard } from '../CardList/CardList';

import './CardInfo.scss';
interface MyProps {
  closeCardInfo: () => void;
  currentMovie?: ApiCard | null;
}
interface IGenreList {
  [index: string]: number;
}

const genresList: IGenreList = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  'TV Movie ': 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};
class CardInfo extends Component<MyProps> {
  textedGenres: string[] = [];

  getTextedGenres = () => {
    if (this.props.currentMovie) {
      const keys = Object.keys(genresList);
      this.props.currentMovie.genre_ids.forEach((genre) => {
        const match = keys.find((key) => genresList[key] === genre) || '';
        this.textedGenres.push(match);
      });
    }
  };

  render() {
    this.getTextedGenres();

    return (
      <div className="info">
        {this.props.currentMovie == null ? null : (
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
              <div className="info__header">
                <span onClick={this.props.closeCardInfo}>X</span>
                <p className="info__title">{this.props.currentMovie.title}</p>
                <div className="info__subtitles">
                  <p>{this.props.currentMovie.release_date}</p>
                  <p>{this.props.currentMovie.original_language}</p>
                  <p>{this.textedGenres.join(' | ')}</p>
                </div>
              </div>
              <div className="info__body">
                <p className="info__description">{this.props.currentMovie.overview}</p>
                <p className="info__rating">{this.props.currentMovie.vote_average}</p>
              </div>
            </div>
          </div>
        )}
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
