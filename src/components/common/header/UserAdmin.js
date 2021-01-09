import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUser, login, logout } from '../../../actions';
import {
  clearUrlParams,
  isAuthStateValid,
  loginWithDiscord,
  parseFromUrl,
  URL_PARAMS
} from '../../../utils/discordLogin';

class UserAdmin extends React.Component {

  async componentDidMount() {
    console.log('props in userAdmin', this.props);
    const code = parseFromUrl(URL_PARAMS.CODE);
    console.log('userAdmin component did mount');
    if (!_.isEmpty(this.props.user)) {
      return;
    } else if (code && isAuthStateValid()) {
      clearUrlParams();
      await this.props.login(code);
    }
      this.props.fetchUser();
  }

  component

  onLogout = () => {
    this.props.logout();
  }

  loginPrompt() {
    return (    
      <div id="login-prompt" className="header item right floated" onClick={loginWithDiscord} >
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

export default connect(mapStateToProps, { login, fetchUser, logout })(UserAdmin);
