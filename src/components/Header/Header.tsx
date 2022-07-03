import { Link, useLocation } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  const location = useLocation();

  function getCurrentPage() {
    if (location.pathname === '/') {
      return 'Homepage';
    } else if (location.pathname === '/about') {
      return 'About Us';
    } else if (location.pathname === '/add') {
      return 'Create Card';
    } else if (location.pathname.includes('movie')) {
      return 'Movie card';
    } else if (location.pathname.includes('contacts')) {
      return 'Contacts';
    } else if (location.pathname.includes('team')) {
      return 'Our team';
    }
  }

  return (
    <header className="header" data-testid="header">
      <div className="header__top">
        <div className="header__logo">Movie Bank</div>
        <div className="header__links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="header__create-form">
          <Link to="add">Create Card</Link>
        </div>
      </div>
      <div className="header__bottom">
        <span>{getCurrentPage()}</span>
      </div>
    </header>
  );
};

export default Header;
