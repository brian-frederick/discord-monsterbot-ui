import React from 'react';
import UserAdmin from './UserAdmin';

const Header = () => {

  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <a className="header item" href="/">Monsterbot</a>
        <a className="item" href="/moves/list">moves</a>
        <UserAdmin />
      </div>
    </div>
  );
};

export default Header;
