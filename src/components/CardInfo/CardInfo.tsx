import { useContext } from 'react';

import { genresList, IGenre } from '../../App';
import { Context } from '../../pages/HomePage';

import './CardInfo.scss';
interface ICardInfo {
  closeCardInfo: () => void;
}

const CardInfo = ({ closeCardInfo }: ICardInfo) => {
  const context = useContext(Context);

  const textedGenres: string[] = [];

  const getTextedGenres = () => {
    if (context.data.currentMovie) {
      context.data.currentMovie.genre_ids?.forEach((genre) => {
        const match = genresList.find((o: IGenre) => o.id === genre);
        if (match) {
          textedGenres.push(match.name);
        }
      });
    }
  };

  getTextedGenres();

  return (
    <div className="info" onClick={closeCardInfo}>
      {context.data.currentMovie ? (
        <div
          className="info__main"
          data-testid="popup"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="info__image">
            {context.data.currentMovie.poster_path == null ? (
              <img src={`${process.env.PUBLIC_URL}/noImage.jpg`} />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w200${context.data.currentMovie.poster_path}`}
              />
            )}
          </div>
          <div className="info__text">
            <div className="info__header">
              <span onClick={closeCardInfo} data-testid="closeBtn">
                X
              </span>
              <p className="info__title">{context.data.currentMovie.title}</p>
              <div className="info__subtitles">
                <p>{context.data.currentMovie.release_date}</p>
                <p>{context.data.currentMovie.original_language}</p>
                <p>{textedGenres.join(' | ')}</p>
              </div>
            </div>
            <div className="info__body">
              <p className="info__description">{context.data.currentMovie.overview}</p>
              <p className="info__rating">{context.data.currentMovie.vote_average}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardInfo;
