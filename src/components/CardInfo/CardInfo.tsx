import { Component } from 'react';
import './CardInfo.scss';
import { ApiCard } from '../CardList/CardList';

interface MyProps {
  closeCardInfo: () => void;
  currentMovie?: ApiCard | null;
}

const genresList = {
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
  genresText = [];
  getTextedGenres = () => {
    if (this.props.currentMovie) {
      this.props.currentMovie.genre_ids.forEach((genre) => {
        this.genresText.push(Object.keys(genresList).find((key) => genresList[key] === genre));
      });
    }
  };

  render() {
    this.getTextedGenres();

    return (
      <div className="info">
        <div className="info__content">
          <div className="info__header" onClick={this.props.closeCardInfo}>
            <span>X</span>
          </div>
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
                <p>{this.props.currentMovie.title}</p>
                <p>{this.props.currentMovie.release_date}</p>
                <p>{this.props.currentMovie.original_language}</p>
                <p>{this.genresText.join(' | ')}</p>
              </div>
            </div>
          )}
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
