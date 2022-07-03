import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { setCurrentMovie } from '../../../../redux/movieSlice';
import { ICardItem, ICard } from '../../../../redux/types';

import './CardItem.scss';

const CardItem = ({ movie }: ICardItem) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openPopup = (movie: ICard) => {
    dispatch(setCurrentMovie(movie));
    navigate(
      generatePath('movie/:id', {
        id: movie.id.toString(),
      })
    );
  };

  return (
    <li className="card" data-testid={movie.id}>
      {movie.poster_path ? (
        movie.poster_path.includes('blob') ? (
          <img data-testid="card" src={`${movie.poster_path}`} />
        ) : (
          <img
            data-testid="card"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            onClick={() => openPopup(movie)}
          />
        )
      ) : (
        <img
          data-testid="card"
          src={`${process.env.PUBLIC_URL}/noImage.jpg`}
          onClick={() => openPopup(movie)}
        />
      )}
    </li>
  );
};

export default CardItem;
