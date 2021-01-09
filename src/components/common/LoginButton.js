import React from 'react';
import { loginWithDiscord } from '../../utils/discordLogin';

const LoginButton = () => {
  return (
    <div onClick={loginWithDiscord} className="ui primary button discord-theme">
      Login with Discord
    </div>
  );

};

export default LoginButton;
