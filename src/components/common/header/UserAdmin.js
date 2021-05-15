import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUser, login, logout, openModal } from '../../../actions';
import {
  clearUrlParams,
  isAuthStateValid,
  parseFromUrl,
  URL_PARAMS,
  loginModalContent,
} from '../../../utils/discordLogin';

class UserAdmin extends React.Component {

  async componentDidMount() {
    const code = parseFromUrl(URL_PARAMS.CODE);
    if (!_.isEmpty(this.props.user)) {
      return;
    } else if (code && isAuthStateValid()) {
      clearUrlParams();
      await this.props.login(code);
    }
      await this.props.fetchUser();
  }
  
  onLogin = () => {
    this.props.openModal(loginModalContent);
  }

  onLogout = () => {
    this.props.logout();
  }

  loginPrompt() {
    return (    
      <div id="login-prompt" className="header item right floated" onClick={this.onLogin} >
        Discord Login
      </div>
    );
  }

  userInfo() {
    return (
      <div id="user-info" className="ui compact menu right floated">
        <div className="ui simple dropdown item">
          {this.props.user.username}
        <i className="dropdown icon"></i>
        <div className="menu">
          <div onClick={this.onLogout} className="item">Logout</div>
        </div>
      </div>
      </div>
    );

  }

  render() {
    if (!_.isEmpty(this.props.user)) {
      return this.userInfo();
    } else {
      return this.loginPrompt();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { login, fetchUser, logout, openModal })(UserAdmin);
