import { Component } from 'react';
import './SearchForm.scss';

class Searchform extends Component {

  render() {
      return (
          <input type="text"
                  className="search-form"
                  placeholder="Search..."/>
      )
  }
}

export default Searchform;