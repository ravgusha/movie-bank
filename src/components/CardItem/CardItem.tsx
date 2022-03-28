import { Component } from 'react';
import './CardItem.scss';

type Card = {
  posterUrl: string;
  title: string;
  genre: string;
  id: number;
};

class CardItem extends Component<Card> {
  render() {
    return (
      <li className="card">
        <img className="card__img" src={this.props.posterUrl} />
        <h3 className="card__title">{this.props.title}</h3>
        <p className="card__genre">{this.props.genre}</p>
      </li>
    );
  }
}

export default CardItem;
