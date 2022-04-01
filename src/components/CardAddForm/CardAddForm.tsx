import { Component, createRef } from 'react';
import './CardAddForm.scss';
import data from '../../data';

interface MyProps {
  list?: string;
}
class CardAddForm extends Component<MyProps> {
  private title: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private country: React.LegacyRef<HTMLSelectElement>;
  private ageLimit: React.RefObject<HTMLInputElement>;
  private posterUrl: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.title = createRef();
    this.date = createRef();
    this.country = createRef();
    this.ageLimit = createRef();
    this.posterUrl = createRef();
  }

  //   handleChange = (newText: string) => {
  //     // this.title = newText;
  //   };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(this.title.current.value);

    const d = new Date(this.date.current.value).getFullYear();
    console.log(d);

    console.log(this.country.current.value);
    console.log(this.ageLimit.current.checked);
    console.log(this.posterUrl.files[0]);
  };

  render() {
    return (
      <form className="add-form" id="createCardCont" onSubmit={this.handleSubmit}>
        <div className="add-form__title">
          <label htmlFor="addTitle">Title: </label>
          <input
            type="text"
            id="addTitle"
            ref={this.title}
            // onChange={(event) => this.handleChange(event.target.value)}
          />
        </div>
        <div className="add-form__date">
          <label htmlFor="addDate">Release date:</label>
          <input type="date" id="addDate" ref={this.date} />
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
          <input type="file" id="fileUpload" title=" " ref={(ref) => this.posterUrl = ref}/>
        </div>
        <input type="submit" />
      </form>
    );
  }
}

export default CardAddForm;
