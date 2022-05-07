import { useNavigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import './CardItem.scss';

export type ICardItem = {
  image: string;
  key: number;
  movieId: number;
  viewCardInfo?: (id: number) => void;
};

const CardItem = ({ viewCardInfo, movieId, image }: ICardItem) => {
  let history = useNavigate();
  return (
    <li className="card" data-testid={movieId}>
      {image ? (
        image.includes('blob') ? (
          <img
            data-testid="card"
            src={`${image}`}
            onClick={() => {
              if (viewCardInfo) viewCardInfo(movieId);
            }}
          />
        ) : (
          <img
            data-testid="card"
            src={`https://image.tmdb.org/t/p/w200${image}`}
            onClick={() => {
              if (viewCardInfo) viewCardInfo(movieId);
              history(generatePath("movie/:id", {
                id: movieId.toString()
              }));
            }}
          />
        )
      ) : (
        <img
          data-testid="card"
          src={`${process.env.PUBLIC_URL}/noImage.jpg`}
          onClick={() => {
            if (viewCardInfo) viewCardInfo(movieId);
          }}
        />
      )}
    </li>
  );
};

export default CardItem;
function useHistory() {
  throw new Error('Function not implemented.');
}

