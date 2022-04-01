import { Component } from 'react';
import './CardList.scss';
import CardItem from '../CardItem/CardItem';
import data from '../../data';
class CardList extends Component {
  cards = data.map((item) => {
    return <CardItem data-testid="card" key={item.id} {...item} />;
  });

  render() {
    return <ul data-testid="cards" className="cards">{this.cards}</ul>;
  }
}

export default CardList;
