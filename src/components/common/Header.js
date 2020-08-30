import React from 'react';

const Header = () => {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <a className="header item" href="/">Monsterbot</a>
        <a className="item right floated" href="/moves/list">moves</a>
      </div>
    </div>
  );
};

export default Header;
