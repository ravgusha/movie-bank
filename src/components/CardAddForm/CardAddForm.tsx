import React, { Component, createRef } from 'react';
import './CardAddForm.scss';
import CardItem, { Card } from '../CardItem/CardItem';

interface MyState {
  cards: Card[];
  errors: FieldsError;
  disabled: true | false;
  isFirstInput: boolean;
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
  private chosenGenres: string[] = [];

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cards: [],
      errors: { title: '', date: '', country: '', ageLimit: '', genres: '', poster: '' },
      disabled: true,
      isFirstInput: true,
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

  checkIsDisabled = () => {
    if (this.state.isFirstInput) {
      this.setState({ isFirstInput: false, disabled: false });
    } else {
      if (this.checkIsError(this.state.errors)) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
    }
  };

  handleTitleChange = () => {
    this.setState(
      {
        errors: { ...this.state.errors, title: '' },
      },
      () => {
        this.checkIsDisabled();
      }
    );
  };

  handleGenresChange = () => {
    this.chosenGenres = this.genres as unknown as [];
    const checkboxArray = Array.prototype.slice.call(this.chosenGenres);
    const checkedCheckboxes = checkboxArray.filter((input) => input.checked);
    this.chosenGenres = checkedCheckboxes.map((input) => input.value);

    this.setState(
      {
        errors: { ...this.state.errors, genres: '' },
      },
      () => {
        this.checkIsDisabled();
      }
    );
  };

  handleDateChange = () => {
    this.setState(
      {
        errors: { ...this.state.errors, date: '' },
      },
      () => {
        this.checkIsDisabled();
      }
    );
  };

  handlePosterChange = () => {
    this.setState(
      {
        errors: { ...this.state.errors, poster: '' },
      },
      () => {
        this.checkIsDisabled();
      }
    );
  };

  checkIsFormValid = () => {
    const errors: FieldsError = {
      title: '',
      date: '',
      country: '',
      ageLimit: '',
      genres: '',
      poster: '',
    };

    if (!this.title?.current?.value) {
      errors.title = 'Please, add the title';
    }

    if (!this.date?.current?.value) {
      errors.date = 'Please, add the date';
    } else {
      this.year = new Date(this.date.current.value).getFullYear();
    }

    if (!this.chosenGenres.length) {
      errors.genres = 'Please, choose the genres';
    }

    if (!this.poster?.current?.files[0]) {
      errors.poster = 'Please, add the poster';
    } else {
      this.posterUrl = URL.createObjectURL(this.poster.current.files[0]);
    }

    if (!this.ageLimit.current) {
      errors.ageLimit = 'ageLimit error';
    } else {
      this.adultOnly = this.ageLimit.current.checked;
    }
    this.setState({ errors: errors, disabled: this.checkIsError(errors) });

    return !this.checkIsError(errors);
  };

  checkIsError = (errors: FieldsError) => {
    let isError = false;
    Object.values(errors).forEach((el) => {
      if (el) {
        isError = true;
      }
    });
    console.log(isError);
    return isError;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (this.checkIsFormValid()) {
      this.setState({
        cards: [
          ...this.state.cards,
          {
            title: this.title.current?.value ?? '',
            posterUrl: this.posterUrl,
            genres: this.chosenGenres,
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
          data-testid="form"
          ref={(form) => {
            if (form !== null) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.genres = form;
            }
          }}
        >
          <div className="add-form__title">
            <label htmlFor="addTitle">Title:</label>
            <input
              type="text"
              id="addTitle"
              maxLength={20}
              ref={this.title}
              onChange={this.handleTitleChange}
              data-testid="title"
            />
            <div className="add-form__error">{this.state.errors.title}</div>
          </div>
          <div className="add-form__date">
            <label htmlFor="addDate">Release date:</label>
            <input
              type="date"
              id="addDate"
              data-testid="ageCheckbox"
              ref={this.date}
              onChange={this.handleDateChange}
            />
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
            <label className="switch" htmlFor="age">
              <input type="checkbox" ref={this.ageLimit} id="age" />
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
