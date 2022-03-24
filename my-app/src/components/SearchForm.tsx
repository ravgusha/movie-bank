import { Component } from 'react';
import './SearchForm.scss';

class Searchform extends Component {
  render() {
    return (
      <form className="search-form">
        <input className='search-form__input' type="text" placeholder="Search for movie..." />
        <button className='search-form__button'>Search</button>
      </form>
    );
  }
}

export default Searchform;
