import React from 'react';
import LoginButton from '../common/LoginButton';
import ToolTip from '../common/Tooltip';

const LoginPrompt = () => {
  return (
    <div id="top-centered-item" className="ui vertical center aligned segment">
        <h4>
          Oops. You have to be logged in for this.
          <ToolTip 
            content="We're working on making moves only editable by their creators and giving you the ability to make them exclusively for your server." 
            style="ui left" 
          />
        </h4>
        <LoginButton />
    </div>
  );
};

export default LoginPrompt;
