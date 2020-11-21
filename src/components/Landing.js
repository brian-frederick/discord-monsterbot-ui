import React from 'react';

const Landing = ({history}) => {

  const onClick = () => {
    history.push('/moves/new');
  }

  return (
    <div id="top-centered-item" className="ui vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui text container">
          <h3>bleep bloop snarl blorp raaar...</h3>
          <div onClick={onClick} className="ui primary button">
            make your move
            <i className="right arrow icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
