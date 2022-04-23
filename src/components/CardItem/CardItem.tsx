import { Component } from 'react';
import './CardItem.scss';

export type Card = {
  image: string;
  key: number;
  movieId: number;
  viewCardInfo?: (id: number) => void;
};

class CardItem extends Component<Card> {
  render() {
    return (
      <li className="card" data-testid={this.props.movieId}>
        {!this.props.image ? (
          <img
            data-testid="card"
            src={`${process.env.PUBLIC_URL}/noImage.jpg`}
            onClick={() => {
              if (this.props.viewCardInfo) this.props.viewCardInfo(this.props.movieId);
            }}
          />
        ) : this.props.image.includes('blob') ? (
          <img
            data-testid="card"
            src={`${this.props.image}`}
            onClick={() => {
              if (this.props.viewCardInfo) this.props.viewCardInfo(this.props.movieId);
            }}
          />
        ) : (
          <img
            data-testid="card"
            src={`https://image.tmdb.org/t/p/w200${this.props.image}`}
            onClick={() => {
              if (this.props.viewCardInfo) this.props.viewCardInfo(this.props.movieId);
            }}
          />
        )}
      </li>
    );
  }
}

export default CardItem;
