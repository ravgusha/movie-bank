import React, { Component, createRef } from 'react';
import './CardAddForm.scss';
import CardItem, { Card } from '../CardItem/CardItem';

interface MyState {
  cards: Card[];
  errors: FieldsError;
  disabled: true | false;
}

type Fields = 'title' | 'date' | 'country' | 'ageLimit' | 'genres' | 'poster';
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
  private poster: React.RefObject<HTMLInputElement>;
  private posterUrl: string;
  private year: number;
  private adultOnly: boolean;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cards: [],
      errors: { title: '', date: '', country: '', ageLimit: '', genres: '', poster: '' },
      disabled: true,
    };
    this.title = createRef();
    this.date = createRef();
    this.country = createRef();
    this.ageLimit = createRef();
    this.poster = createRef();
    this.genres = createRef();
    this.posterUrl = '';
    this.year = 2000;
    this.adultOnly = false;
  }

  isError = false;

  handleTitleChange = () => {
    this.setState({ errors: { ...this.state.errors, title: '' } });
  };

  handleGenresChange = () => {
    this.setState({ errors: { ...this.state.errors, genres: '' } });
  };

  handleDateChange = () => {
    this.setState({ errors: { ...this.state.errors, date: '' } });
  };

  handlePosterChange = () => {
    this.setState({ errors: { ...this.state.errors, poster: '' } });
  };

  handleFormChange = () => {
    if (!this.isError) {
      this.setState({ disabled: false });
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Get checked checkboxes
    let { genre } = this.genres;
    const checkboxArray = Array.prototype.slice.call(genre);
    const checkedCheckboxes = checkboxArray.filter((input) => input.checked);
    genre = checkedCheckboxes.map((input) => input.value);

    const errors: FieldsError = {
      title: '',
      date: '',
      country: '',
      ageLimit: '',
      genres: '',
      poster: '',
    };

    if (!this.title?.current?.value) {
      this.isError = true;
      errors.title = 'Please, add the title';
    }

    if (!this.date?.current?.value) {
      this.isError = true;
      errors.date = 'Please, add the date';
    } else {
      this.year = new Date(this.date.current.value).getFullYear();
    }

    if (!genre.length) {
      this.isError = true;
      errors.genres = 'Please, choose the genres';
    }

    if (!this.poster.current?.files[0]) {
      this.isError = true;
      errors.poster = 'Please, add the poster';
    } else {
      this.posterUrl = URL.createObjectURL(this.poster.current.files[0]);
    }

    if (!this.ageLimit.current) {
      this.isError = true;
      errors.ageLimit = 'ageLimit error';
    } else {
      this.adultOnly = this.ageLimit.current.checked;
    }

    this.setState({ errors });

    if (this.isError) {
      this.setState({ disabled: true });
    }
    console.log(this.isError);
    if (!this.isError) {
      this.setState({
        cards: [
          ...this.state.cards,
          {
            title: this.title.current?.value ?? '',
            posterUrl: this.posterUrl,
            genres: genre,
            id: 1,
            country: this.country.current?.value ?? '',
            date: this.year,
            ageLimit: this.adultOnly,
          },
        ],
      });
    }
  };

  render() {
    return (
      <>
        <form
          className="add-form"
          id="createCardCont"
          onSubmit={this.handleSubmit}
          ref={(form) => (this.genres = form)}
          onChange={this.handleFormChange}
        >
          <div className="add-form__title">
            <label htmlFor="addTitle">Title: </label>
            <input
              type="text"
              id="addTitle"
              maxLength={20}
              ref={this.title}
              onChange={this.handleTitleChange}
            />
            <div className="add-form__error">{this.state.errors.title}</div>
          </div>
          <div className="add-form__date">
            <label htmlFor="addDate">Release date:</label>
            <input type="date" id="addDate" ref={this.date} onChange={this.handleDateChange} />
            <div className="add-form__error">{this.state.errors.date}</div>
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
          <div className="add-form__genre" onChange={this.handleGenresChange}>
            <span className="genre__title">Genres: </span>
            <CheckboxSet
              setName={'genre'}
              setOptions={[
                'action',
                'comedy',
                'drama',
                'fantasy',
                'horror',
                'mystery',
                'romance',
                'thriller',
                'western',
              ]}
            />
            <div className="add-form__error">{this.state.errors.genres}</div>
          </div>
          <div className="add-form__img">
            <label htmlFor="fileUpload">Add poster</label>
            <input
              type="file"
              id="fileUpload"
              title=" "
              accept="image/jpeg"
              ref={this.poster}
              onChange={this.handlePosterChange}
            />
          </div>
          <div className="add-form__error">{this.state.errors.poster}</div>
          <input type="submit" disabled={this.state.disabled} />
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
      {props.setOptions.map((option) => {
        return (
          <label key={option} style={{ textTransform: 'capitalize' }}>
            <input type="checkbox" value={option} name={props.setName} />
            {option}
          </label>
        );
      })}
    </div>
  );
}

export default CardAddForm;
