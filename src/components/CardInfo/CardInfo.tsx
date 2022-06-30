import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { genresList, IGenre } from '../../App';
import { setCurrentMovie } from '../../redux/movieSlice';
import { IState } from '../../redux/configureStore';

import './CardInfo.scss';

const CardInfo = () => {
  const currentMovie = useSelector((state: IState) => state.movie.currentMovie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textedGenres: string[] = [];

  const getTextedGenres = () => {
    if (currentMovie) {
      currentMovie.genre_ids?.forEach((genre: number) => {
        const match = genresList.find((o: IGenre) => o.id === genre);
        if (match) {
          textedGenres.push(match.name);
        }
      });
    }
  };

  getTextedGenres();

  const closePopup = () => {
    dispatch(setCurrentMovie(null));
    navigate('/');
  };

  return (
    <div className="info" onClick={closePopup}>
      {currentMovie ? (
        <div
          className="info__main"
          data-testid="popup"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="info__image">
            {currentMovie.poster_path == null ? (
              <img src={`${process.env.PUBLIC_URL}/noImage.jpg`} />
            ) : (
              <img src={`https://image.tmdb.org/t/p/w200${currentMovie.poster_path}`} />
            )}
          </div>
          <div className="info__text">
            <div className="info__header">
              <span onClick={closePopup} data-testid="closeBtn">
                ←
              </span>
              <p className="info__title">{currentMovie.title}</p>
              <div className="info__subtitles">
                <p>{currentMovie.release_date}</p>
                <p>{currentMovie.original_language}</p>
                <p>{textedGenres.join(' | ')}</p>
              </div>
            </div>
            <div className="info__body">
              <p className="info__description">{currentMovie.overview}</p>
              <p className="info__rating">{currentMovie.vote_average}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardInfo;
