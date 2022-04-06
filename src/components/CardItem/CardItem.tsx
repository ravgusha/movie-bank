import { Component } from 'react';
import './CardItem.scss';

export type Card = {
  posterUrl: string;
  title: string;
  genre: string;
  id: number;
  date: number;
  ageLimit: boolean;
  subtitles: boolean;
};

class CardItem extends Component<Card> {


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
        <p className="card__genre">{this.props.genre}</p>
        <p className="card__subtitles">{this.props.subtitles ? 'with subtitles' : null}</p>
      </li>
    );
  }
}

export default CardItem;
