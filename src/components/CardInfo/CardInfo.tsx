import { Component } from 'react';
import { ApiCard } from '../CardList/CardList';
import { genresList, IGenre } from '../../pages/HomePage';
import './CardInfo.scss';
interface MyProps {
  closeCardInfo: () => void;
  currentMovie?: ApiCard | null;
}
class CardInfo extends Component<MyProps> {
  textedGenres: string[] = [];

  getTextedGenres = () => {
    if (this.props.currentMovie) {
      this.props.currentMovie.genre_ids.forEach((genre) => {
        const match = genresList.find((o: IGenre) => o.id === genre);
        if (match) {
          this.textedGenres.push(match.name);
        }
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
