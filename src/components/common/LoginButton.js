import React from 'react';
import { loginModalContent } from '../../utils/discordLogin';
import { connect } from 'react-redux';
import { openModal } from '../../actions';



const RawLoginButton = ({ openModal }) => {

  const onLogin = () => {
    openModal(loginModalContent);
  };

  return (
    <div onClick={onLogin} className="ui primary button discord-theme">
      Login with Discord
    </div>
  );

};

export default connect(null, { openModal })(RawLoginButton);
