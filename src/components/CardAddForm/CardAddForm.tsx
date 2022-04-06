import React, { Component, createRef } from 'react';
import './CardAddForm.scss';
import CardItem, { Card } from '../CardItem/CardItem';

interface MyState {
  cards: Card[];
  errors: FieldsError;
  disabled: true | false;
  isFirstInput: boolean;
}

type Fields = 'title' | 'date' | 'genre' | 'ageLimit' | 'subtitles' | 'poster';
type FieldsError = Record<Fields, string>;

interface MyProps {
  onSubmit?: () => void;
}
class CardAddForm extends Component<MyProps, MyState> {
  private title: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private genre: React.RefObject<HTMLSelectElement>;
  private ageLimit: React.RefObject<HTMLInputElement>;
  private subtitles: React.RefObject<HTMLInputElement>;
  private poster: React.RefObject<HTMLInputElement>;
  private form: React.RefObject<HTMLFormElement>;

  private posterUrl: string;
  private year: number;
  private subs: boolean;
  private adultOnly: boolean;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cards: [],
      errors: { title: '', date: '', genre: '', ageLimit: '', subtitles: '', poster: '' },
      disabled: true,
      isFirstInput: true,
    };
    this.title = createRef();
    this.date = createRef();
    this.genre = createRef();
    this.ageLimit = createRef();
    this.subtitles = createRef();
    this.poster = createRef();
    this.form = createRef();
    this.posterUrl = '';
    this.year = 2000;
    this.adultOnly = false;
    this.subs = false;
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
      genre: '',
      ageLimit: '',
      subtitles: '',
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

    if (!this.ageLimit.current) {
      errors.ageLimit = 'ageLimit error';
    } else {
      this.adultOnly = this.ageLimit.current.checked;
    }

    if (!this.subtitles.current) {
      errors.subtitles = 'subtitles error';
    } else {
      this.subs = this.subtitles.current.checked;
    }

    if (!this.poster?.current?.files[0]) {
      errors.poster = 'Please, add the poster';
    } else {
      this.posterUrl = URL.createObjectURL(this.poster.current.files[0]);
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
            date: this.year,
            genre: this.genre.current?.value ?? '',
            ageLimit: this.adultOnly,
            subtitles: this.subs,
            posterUrl: this.posterUrl,
            id: 1,
          },
        ],
      });
      this.form.reset();
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
          ref={(el) => (this.form = el)}
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
          <div className="add-form__genre">
            <label htmlFor="genres">Genre:</label>
            <OptionSet
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
              innerRef={this.genre}
            />
          </div>
          <div className="add-form__age">
            {/* <span className="switch__title"></span> */}
            <label className="switch" htmlFor="age">
              Age limit +18:
              <input type="checkbox" ref={this.ageLimit} id="age" />
              <span className="slider round" />
            </label>
          </div>
          <div className="add-form__subtitles">
            <label htmlFor="subtitles">
              Subtitles:
              <input type="checkbox" ref={this.subtitles} id="subtitles" />
            </label>
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

function OptionSet(props: { setOptions: string[]; innerRef: React.RefObject<HTMLSelectElement> }) {
  return (
    <select ref={props.innerRef} id="genres">
      {props.setOptions.map((option) => {
        return (
          <option key={option} value={option} data-testid={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default CardAddForm;
