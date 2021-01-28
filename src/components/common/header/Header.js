import React from 'react';
import { Link } from 'react-router-dom';
import UserAdmin from './UserAdmin';

const Header = () => {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <Link className="header item" to="/">
          <img id="header-logo" alt="monsterbot logo" className="logo" src="monsterbot_logo_black.png" />
          <p>monsterbot</p>
        </Link>
        <Link className="item" to="/moves/list">moves</Link>
        <UserAdmin />
      </div>
    </div>
  );
};

export default Header;
