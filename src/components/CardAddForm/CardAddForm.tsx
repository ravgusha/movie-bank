import React, { Component, createRef } from 'react';
import './CardAddForm.scss';
import CardItem, { Card } from '../CardItem/CardItem';

interface MyState {
  cards: Card[];
  errors: FieldsError;
}

type Fields = 'title' | 'date' | 'country' | 'ageLimit' | 'posterUrl';
type FieldsError = Record<Fields, string>;

interface MyProps {
  list?: string;
}
class CardAddForm extends Component<MyProps, MyState> {
  private title: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private country: React.LegacyRef<HTMLSelectElement>;
  private ageLimit: React.RefObject<HTMLInputElement>;
  private posterUrl: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cards: [],
      errors: { title: '', date: '', country: '', ageLimit: '', posterUrl: '' },
    };
    this.title = createRef();
    this.date = createRef();
    this.country = createRef();
    this.ageLimit = createRef();
    this.posterUrl = createRef();
  }

  handleTitleChange = () => {
    this.setState({ errors: { ...this.state.errors, title: '' } });
  };

  handleDateChange = () => {
    this.setState({ errors: { ...this.state.errors, date: '' } });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isError = false;
    const errors: FieldsError = { title: '', date: '', country: '', ageLimit: '', posterUrl: '' };

    if (!this.title?.current?.value) {
      isError = true;
      errors.title = 'Title error';
    }

    if (!this.date?.current?.value) {
      isError = true;
      errors.date = 'Date error';
    }

    this.setState({ errors });

    if (!isError) {
      this.setState({
        cards: [
          ...this.state.cards,
          {
            title: this.title.current!.value,
            posterUrl: '/url',
            genres: ['TEST'],
            id: 1,
            country: 'RUSSIA',
            date: '10.21.11',
            ageLimit: true,
          },
        ],
      });
    }
  };

  render() {
    return (
      <>
        <form className="add-form" id="createCardCont" onSubmit={this.handleSubmit}>
          <div className="add-form__title">
            <label htmlFor="addTitle">Title: </label>
            <input type="text" id="addTitle" ref={this.title} onChange={this.handleTitleChange} />
            <div>{this.state.errors.title}</div>
          </div>
          <div className="add-form__date">
            <label htmlFor="addDate">Release date:</label>
            <input type="date" id="addDate" ref={this.date} onChange={this.handleDateChange} />
            <div>{this.state.errors.date}</div>
          </div>
          <div className="add-form__country">
            <label htmlFor="addCountry">Country:</label>
            <select name="country" id="addCountry" ref={this.country}>
              <option value="Russia">Russia</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="add-form__age">
            <span className="switch__title">Age limit +18</span>
            <label className="switch">
              <input type="checkbox" ref={this.ageLimit} />
              <span className="slider round" />
            </label>
          </div>
          <div className="add-form__genre">
            <span className="genre__title">Genres: </span>
            <div className="genre__action">
              <input type="checkbox" id="action" />
              <label htmlFor="action">Action</label>
            </div>
            <div className="genre__comedy">
              <input type="checkbox" id="comedy" />
              <label htmlFor="comedy">Comedy</label>
            </div>
            <div className="genre__drama">
              <input type="checkbox" id="drama" />
              <label htmlFor="drama">Drama</label>
            </div>
            <div className="fantasy">
              <input type="checkbox" id="fantasy" />
              <label htmlFor="fantasy">Fantasy</label>
            </div>
            <div className="horror">
              <input type="checkbox" id="horror" />
              <label htmlFor="horror">Horror</label>
            </div>
            <div className="mystery">
              <input type="checkbox" id="mystery" />
              <label htmlFor="mystery">Mystery</label>
            </div>
            <div className="genre__romance">
              <input type="checkbox" id="romance" />
              <label htmlFor="romance">Romance</label>
            </div>
            <div className="genre__thriller">
              <input type="checkbox" id="thriller" />
              <label htmlFor="thriller">Thriller</label>
            </div>
            <div className="genre__western">
              <input type="checkbox" id="western" />
              <label htmlFor="western">Western</label>
            </div>
          </div>
          <div className="add-form__img">
            <label htmlFor="fileUpload">Add poster</label>
            <input type="file" id="fileUpload" title=" " ref={this.posterUrl} />
          </div>
          <input type="submit" />
        </form>
        <div>
          {this.state.cards.map((card) => {
            return <CardItem key={card.id} {...card} />;
          })}
        </div>
      </>
    );
  }
}

export default CardAddForm;
