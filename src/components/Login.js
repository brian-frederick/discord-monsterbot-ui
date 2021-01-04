import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import {
  URL_PARAMS,
  parseFromUrl,
} from '../utils/discordLogin';



const Login = ({history, loggedIn, login, match}) => {
  const code = parseFromUrl(history.location.search, URL_PARAMS.CODE);
  // check for params in url
  useEffect(() => {
    console.log('code', code);
    if (loggedIn) {
      console.log('we are logged in. going to landing!');
      history.push('/');
    } else if (code) {
      console.log('code is in url. sending login info!');
      login(code);
    } else {
      console.log('do not know what else to do. everything is terrible.');
      //history.push('/');
    }
  }, [])


  return <div>hi</div>;

};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {login})(Login);
