import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () =>{
    return (
      <header className="header" data-testid="header">
        <div className="header__logo">Movie Bank</div>
        <div className="header__links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="header__create-form">
          <Link to="add">Create Card</Link>
        </div>
      </header>
    );
}

export default Header;
