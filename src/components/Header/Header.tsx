import { Component} from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     display: false,
  //   };
  // }

  render() {
    return (
      <header className="header" data-testid="header">
        <div className="header__logo">Movie Bank</div>
        <div className="header__links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="header__create-form">
          <div>Create Card</div>
        </div>
      </header>
    );
  }
}

export default Header;
