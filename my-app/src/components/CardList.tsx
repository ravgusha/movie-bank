import { Component } from 'react';
import './CardList.scss';
import CardItem from './CardItem';

const data = [
  {
    title: 'House of Gucci',
    poster: 'https://www.kino-teatr.ru/movie/posters/big/8/148548.jpg',
    popularuty: 9,
    genre: 'drama',
    id: 0
  },
  {
    title: 'Dune',
    poster: 'https://www.kino-teatr.ru/movie/posters/big/6/132926.jpg',
    popularuty: 8,
    genre: 'drama',
    id: 1
  },
  {
    title: 'Dont Look Up',
    poster:
      'https://upload.wikimedia.org/wikipedia/ru/7/7c/%D0%9D%D0%B5_%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D1%82%D0%B5_%D0%BD%D0%B0%D0%B2%D0%B5%D1%80%D1%85.jpg',
    popularuty: 10,
    genre: 'comedy',
    id: 2
  },
  {
    title: 'Wrath of Man',
    poster: 'https://upload.wikimedia.org/wikipedia/ru/5/55/%D0%93%D0%BD%D0%B5%D0%B2_%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%28%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%29.png',
    popularuty: 8,
    genre: 'action',
    id: 3
  },
];

class CardList extends Component {
  cards = data.map((item) => {
    return <CardItem key={item.id} {...item} />;
  });

  render() {
    return <div className="cards">{this.cards}</div>;
  }
}

export default CardList;
