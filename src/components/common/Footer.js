import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <div className="ui horizontal inverted small divided link list">
          <a className="item" href="https://www.evilhat.com/home/monster-of-the-week/">Monster of the Week</a>
          <a className="item" href="https://buymeacoffee.com/monsterbot">Buy Me a Coffee</a>
          <Link className="item" to="/terms">Terms of Service</Link>
          <Link className="item" to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
