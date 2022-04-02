import { Component } from 'react';
import './CardItem.scss';

export type Card = {
  posterUrl: string;
  title: string;
  genres: string[];
  id: number;
  date: number;
  country: string;
  ageLimit: boolean;
};

class CardItem extends Component<Card> {
  genres = this.props.genres.map((item, index) => (
    <span key={index}>
      {' '}
      {item} {index < this.props.genres.length - 1 ? '|' : ''}
    </span>
  ));

  render() {
    return (
      <li className="card">
        <div className="card__image">
          <img className="card__img" src={this.props.posterUrl} />
          <span className="card__age">{this.props.ageLimit ? '18+' : null}</span>
        </div>
        <h3 className="card__title">
          {this.props.title} ({this.props.date})
        </h3>
        <p className="card__genre">{this.genres}</p>
        <p className="card__country">{this.props.country}</p>
      </li>
    );
  }
}

export default CardItem;
