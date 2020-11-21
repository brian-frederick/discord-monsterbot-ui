import React from 'react';
import { login } from '../../utils/discordLogin';

const LoginButton = () => {
  return (
    <div onClick={login} className="ui primary button discord-theme">
      Login with Discord
    </div>
  );

};

export default LoginButton;
