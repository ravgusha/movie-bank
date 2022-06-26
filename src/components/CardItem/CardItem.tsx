import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { setCurrentMovieAction } from '../../actions/movieActions';
import { ApiCard } from '../CardList/CardList';

import './CardItem.scss';

export type ICardItem = {
  key: number;
  movie: ApiCard;
};

const CardItem = ({movie }: ICardItem) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li className="card" data-testid={movie.id}>
      {movie.poster_path ? (
        movie.poster_path .includes('blob') ? (
          <img data-testid="card" src={`${movie.poster_path }`} />
        ) : (
          <img
            data-testid="card"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path }`}
            onClick={() => {
               setCurrentMovieAction(movie);
              navigate(
                generatePath('movie/:id', {
                  id: movie.id.toString(),
                })
              );
            }}
          />
        )
      ) : (
        <img
          data-testid="card"
          src={`${process.env.PUBLIC_URL}/noImage.jpg`}
          onClick={() => {
            dispatch(setCurrentMovieAction(movie));
            navigate(
              generatePath('movie/:id', {
                id: movie.id.toString(),
              })
            );
          }}
        />
      )}
    </li>
  );
};

export default CardItem;
