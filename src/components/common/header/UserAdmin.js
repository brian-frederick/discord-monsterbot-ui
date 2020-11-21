import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUser, logoutUser } from '../../../actions';
import {
  deleteToken,
  isTokenInUrl,
  isAuthStateValid,
  isValidTokenInStorage,
  login,
  saveToken,
  clearUrlParams
} from '../../../utils/discordLogin';

class UserAdmin extends React.Component {

  componentDidMount() {
    if (!_.isEmpty(this.props.user)) {
      return;
    } else if (isTokenInUrl() && isAuthStateValid()) {
      saveToken();
      clearUrlParams();
      this.props.fetchUser()
    } else if (isValidTokenInStorage()) {
      this.props.fetchUser();
    }
  }

  onLogout = () => {
    deleteToken();
    this.props.logoutUser();
    window.location.href = "/";
  }

  loginPrompt() {
    return (    
      <div id="login-prompt" className="header item right floated" onClick={login} >
        Login With Discord
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

export default connect(mapStateToProps, { fetchUser, logoutUser })(UserAdmin);
