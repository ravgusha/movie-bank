import React, { Component, createRef } from 'react';
import './CardAddForm.scss';
import CardItem, { Card } from '../CardItem/CardItem';

interface MyState {
  cards: Card[];
  errors: FieldsError;
}

type Fields = 'title' | 'date' | 'country' | 'ageLimit' | 'genres' | 'posterUrl';
type FieldsError = Record<Fields, string>;

interface MyProps {
  list?: string;
}
class CardAddForm extends Component<MyProps, MyState> {
  private title: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private country: React.RefObject<HTMLSelectElement>;
  private ageLimit: React.RefObject<HTMLInputElement>;
  private genres: string[];
  private posterUrl: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cards: [],
      errors: { title: '', date: '', country: '', ageLimit: '', genres: '', posterUrl: '' },
    };
    this.title = createRef();
    this.date = createRef();
    this.country = createRef();
    this.ageLimit = createRef();
    this.posterUrl = createRef();
    this.genres = [];
  }

  handleTitleChange = () => {
    this.setState({ errors: { ...this.state.errors, title: '' } });
  };

  handleDateChange = () => {
    this.setState({ errors: { ...this.state.errors, date: '' } });
  };

  handleGenresChange = (e: React.FormEvent) => {
    const item = e.target as HTMLInputElement;
    if (item) {
      if (item.checked) this.genres.push(item.value);
      else {
        const index = this.genres.indexOf(item.value);
        this.genres.splice(index, 1);
      }
      console.log(this.genres);
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    let isError = false;
    const errors: FieldsError = {
      title: '',
      date: '',
      country: '',
      ageLimit: '',
      genres: '',
      posterUrl: '',
    };

    if (!this.title?.current?.value) {
      isError = true;
      errors.title = 'Title error';
    }

    if (!this.date?.current?.value) {
      isError = true;
      errors.date = 'Date error';
    }

    if (!this.genres?.length) {
      isError = true;
      errors.genres = 'Genres error';
    }

    this.setState({ errors });

    if (!isError) {
      this.setState({
        cards: [
          ...this.state.cards,
          {
            title: this.title.current?.value ?? '',
            posterUrl: '/url',
            genres: this.genres,
            id: 1,
            country: this.country.current?.value ?? '',
            date: new Date(this.date.current.value).getFullYear(),
            ageLimit: this.ageLimit.current.checked,
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
            <select name="country" id="addCountry" defaultValue={'Russia'} ref={this.country}>
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
          <div
            className="add-form__genre"
            onChange={(e) => this.handleGenresChange(e)}
            // ref={this.genres}
          >
            <span className="genre__title">Genres: </span>
            <div>{this.state.errors.genres}</div>
            <label htmlFor="action">
              <input type="checkbox" id="action" value="action" />
              Action
            </label>
            <label htmlFor="comedy">
              <input type="checkbox" id="comedy" value="comedy" />
              Comedy
            </label>
            <label htmlFor="drama">
              <input type="checkbox" id="drama" value="drama" />
              Drama
            </label>
            <label htmlFor="fantasy">
              <input type="checkbox" id="fantasy" value="fantasy" />
              Fantasy
            </label>
            <label htmlFor="horror">
              <input type="checkbox" id="horror" value="horror" />
              Horror
            </label>
            <label htmlFor="mystery">
              <input type="checkbox" id="mystery" value="mystery" />
              Mystery
            </label>
            <label htmlFor="romance">
              <input type="checkbox" id="romance" value="romance" />
              Romance
            </label>
            <label htmlFor="thriller">
              <input type="checkbox" id="thriller" value="thriller" />
              Thriller
            </label>
            <label htmlFor="western">
              <input type="checkbox" id="western" value="western" />
              Western
            </label>
          </div>
          <div className="add-form__img">
            <label htmlFor="fileUpload">Add poster</label>
            <input type="file" id="fileUpload" title=" " ref={this.posterUrl} />
          </div>
          <input type="submit" />
        </form>
        <div className="cards">
          {this.state.cards.map((card) => {
            return <CardItem key={card.id} {...card} />;
          })}
        </div>
      </>
    );
  }
}

export default CardAddForm;
