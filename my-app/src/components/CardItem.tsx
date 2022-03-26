import { Component } from 'react';
import './CardItem.scss';

type Card = {
  poster: string,
  title: string,
  genre: string,
  id: number
}


class CardItem extends Component<Card> {

  render() {
    return (
      <div className="card">
        <img className="card__img" src={this.props.poster} />
        <h3 className="card__title">{this.props.title}</h3>
        <p className="card__genre">{this.props.genre}</p>
      </div>
    );
  }
}

export default CardItem;
