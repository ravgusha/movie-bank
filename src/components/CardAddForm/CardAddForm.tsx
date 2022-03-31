import { Component } from 'react';
import './CardAddForm.scss';

class CardAddForm extends Component {
    // constructor(props){
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.input = React.createRef();
    // }

  render() {
    return (
      <form className="add-form" id="createCardCont">
        <div className="add-form__title">
          <label htmlFor="addTitle">Title: </label>
          <input type="text" id="addTitle" />
        </div>
        <div className="add-form__date">
          <label htmlFor="addDate">Release date:</label>
          <input type="date" id="addDate" />
        </div>
        <div className="add-form__country">
          <label htmlFor="addCountry">Country:</label>
          <select name="country" id="addCountry">
            <option value="">Russia</option>
            <option value="">USA</option>
          </select>
        </div>
        <div className="add-form__age">
          <span className="switch__title">Age limit +18</span>
          <label className="switch">
            <input type="checkbox" />
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
          <input type="file" id="fileUpload" title=" " />
        </div>
        <input type="submit" disabled />
      </form>
    );
  }

}

export default CardAddForm;
