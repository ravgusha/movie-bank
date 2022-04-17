import React, { Component, createRef } from 'react';
import { v4 as uuid } from 'uuid';

import CardItem from '../CardItem/CardItem';
import { ApiCard } from '../CardList/CardList';

import './CardAddForm.scss';
interface MyState {
  cards: ApiCard[];
  errors: FieldsError;
  disabled: true | false;
  isFirstInput: boolean;
}

type Fields = 'title' | 'date' | 'language' | 'ageLimit' | 'video' | 'poster';
type FieldsError = Record<Fields, string>;

interface MyProps {
  onSubmit?: () => void;
}
class CardAddForm extends Component<MyProps, MyState> {
  private title: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private language: React.RefObject<HTMLSelectElement>;
  private ageLimit: React.RefObject<HTMLInputElement>;
  private video: React.RefObject<HTMLInputElement>;
  private poster: React.RefObject<HTMLInputElement>;
  private form: React.RefObject<HTMLFormElement>;

  private posterUrl: string;
  private year: string;
  private vid: boolean;
  private adultOnly: boolean;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cards: [],
      errors: { title: '', date: '', language: '', ageLimit: '', video: '', poster: '' },
      disabled: true,
      isFirstInput: true,
    };
    this.title = createRef();
    this.date = createRef();
    this.language = createRef();
    this.ageLimit = createRef();
    this.video = createRef();
    this.poster = createRef();
    this.form = createRef();
    this.posterUrl = '';
    this.year = '2000';
    this.adultOnly = false;
    this.vid = false;
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
      language: '',
      ageLimit: '',
      video: '',
      poster: '',
    };

    if (!this.title?.current?.value) {
      errors.title = 'Please, add the title';
    }

    if (!this.date?.current?.value) {
      errors.date = 'Please, add the date';
    } else {
      this.year = new Date(this.date.current.value).getFullYear().toString();
    }

    if (!this.ageLimit.current) {
      errors.ageLimit = 'ageLimit error';
    } else {
      this.adultOnly = this.ageLimit.current.checked;
    }

    if (!this.video.current) {
      errors.video = 'video error';
    } else {
      this.vid = this.video.current.checked;
    }

    if (!this.poster.current?.files) {
      return;
    }

    if (!this.poster?.current?.files[0]) {
      errors.poster = 'Please, add the poster';
    } else {
      this.posterUrl = URL.createObjectURL(this.poster.current.files[0]);
      console.log(typeof this.poster.current.files[0], this.posterUrl)

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
      const unique_id = uuid();
      const small_id = Number(unique_id.replace(/\D/g, ""));
      this.setState({
        cards: [
          ...this.state.cards,
          {
            title: this.title.current?.value ?? '',
            release_date: this.year,
            original_language: this.language.current?.value ?? '',
            adult: this.adultOnly,
            video: this.vid,
            poster_path: this.posterUrl,
            id: small_id,
          },
        ],
      });
      this.form.current?.reset();
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
          ref={this.form}
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
          <div className="add-form__language">
            <label htmlFor="language">Original language:</label>
            <OptionSet
              setOptions={['russian', 'english', 'french', 'spanish', 'korean', 'german']}
              innerRef={this.language}
            />
          </div>
          <div className="add-form__age">
            <label className="switch" htmlFor="age">
              Age limit +18:
              <input type="checkbox" ref={this.ageLimit} id="age" />
              <span className="slider round" />
            </label>
          </div>
          <div className="add-form__video">
            <label htmlFor="video">
              Video:
              <input type="checkbox" ref={this.video} id="video" />
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
            console.log(card.id, card.poster_path)
            return <CardItem movieId={card.id} key={card.id} image={card.poster_path} />;
          })}
        </div>
      </>
    );
  }
}

function OptionSet(props: { setOptions: string[]; innerRef: React.RefObject<HTMLSelectElement> }) {
  return (
    <select ref={props.innerRef} id="language">
      {props.setOptions.map((option) => {
        return (
          <option key={option} value={option} data-testid={option} >
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default CardAddForm;
