import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import LoginPrompt from '../common/LoginPrompt';

const UserGate = ({user, children, match}) => {
  if (_.isEmpty(user)) {
    return <LoginPrompt />;
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user });
    }
  })

  return (
    <div>
      {childrenWithProps}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {})(UserGate)
