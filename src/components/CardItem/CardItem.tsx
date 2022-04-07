import { Component } from 'react';
import './CardItem.scss';

export type Card = {
  image: string;
  key: number
};

class CardItem extends Component<Card> {

  render() {
    return (
      <li className="card">
          {this.props.image == null ? '' : <img src={`https://image.tmdb.org/t/p/w200${this.props.image}`}/>}
      </li>
    );
  }
}

export default CardItem;
