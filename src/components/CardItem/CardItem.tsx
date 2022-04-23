import './CardItem.scss';

export type ICardItem = {
  image: string;
  key: number;
  movieId: number;
  viewCardInfo?: (id: number) => void;
};

const CardItem = ({ viewCardInfo, movieId, image }: ICardItem) => {
  return (
    <li className="card" data-testid={movieId}>
      {image ? (
        image.includes('blob') ? (
          <img
            src={`${image}`}
            onClick={() => {
              if (viewCardInfo) viewCardInfo(movieId);
            }}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w200${image}`}
            onClick={() => {
              if (viewCardInfo) viewCardInfo(movieId);
            }}
          />
        )
      ) : (
        <img
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
