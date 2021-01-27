import React from 'react';

const Landing = ({history}) => {

  const onClick = () => {
    history.push('/moves/list');
  }

  return (
    <div id="top-centered-item" className="ui vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui text container">
        <img src="monsterbot_white.png" alt="monsterbot" width="231px" height="173px"></img>
        <h3 id="landing-greeting">bleep bloop snarl blorp raaar...</h3>
          <div onClick={onClick} className="ui primary button">
            See the moves
            <i className="right arrow icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
