import React from 'react';
import { Link } from 'react-router-dom';
import UserAdmin from './UserAdmin';

const Header = () => {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <Link className="header item" to="/">Monsterbot</Link>
        <Link className="item" to="/moves/list">moves</Link>
        <UserAdmin />
      </div>
    </div>
  );
};

export default Header;
