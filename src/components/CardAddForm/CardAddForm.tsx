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
  private genres: React.RefObject<HTMLFormElement>;
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
    this.genres = createRef();
  }

  handleTitleChange = () => {
    this.setState({ errors: { ...this.state.errors, title: '' } });
  };

  handleDateChange = () => {
    this.setState({ errors: { ...this.state.errors, date: '' } });
  };

  handlePosterChange = () => {
    this.setState({ errors: { ...this.state.errors, posterUrl: '' } });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Get checked checkboxes
    let { genre } = this.genres;
    const checkboxArray = Array.prototype.slice.call(genre);
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);
    genre = checkedCheckboxes.map(input => input.value);
    console.log("checked array values:", genre);

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

    if (!genre.length) {
      isError = true;
      errors.genres = 'Genres error';
    }

    if (!this.posterUrl) {
        isError = true;
        errors.posterUrl = 'posterUrl error';
      }

    this.setState({ errors });

    if (!isError) {
      this.setState({
        cards: [
          ...this.state.cards,
          {
            title: this.title.current?.value ?? '',
            posterUrl: URL.createObjectURL(this.posterUrl.current.files[0]),
            genres: genre,
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
        <form className="add-form" id="createCardCont" onSubmit={this.handleSubmit} ref={form => (this.genres = form)}>
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
            className="add-form__genre">
            <span className="genre__title">Genres: </span>
            <div>{this.state.errors.genres}</div>
            <CheckboxSet setName={"genre"} setOptions={["action", "comedy", "drama", 'fantasy', 'horror', "mystery", "romance", "thriller", "western"]} />
          </div>
          <div className="add-form__img">
          <div>{this.state.errors.posterUrl}</div>
            <label htmlFor="fileUpload">Add poster</label>
            <input
              type="file"
              id="fileUpload"
              title=" "
              accept="image/jpeg"
              ref={this.posterUrl}
              onChange={this.handlePosterChange}
            />
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


function CheckboxSet(props: { setOptions: string[]; setName: string }) {
    return (
      <div>
        {props.setOptions.map(option => {
          return (
            <label key={option} style={{ textTransform: "capitalize" }}>
              <input type="checkbox" value={option} name={props.setName} />
              {option}
            </label>
          );
        })}
      </div>
    );
  }

export default CardAddForm;
