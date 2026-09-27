import React from 'react';
import { DISCORD_CLIENT_ID } from '../config.json';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Landing = ({history}) => {

  const addToServerUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&scope=applications.commands%20bot`;

  return (
    <div id="top-centered-item" className="ui vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui text container">
        <img src="monsterbot_white.png" alt="monsterbot" width="231px" height="173px"></img>
        <h3 id="landing-greeting">Monsterbot</h3>
        <h4 id="landing-subtitle">A Discord Bot for Monster of the Week</h4>
          <div id="landing-button-container" >
            <a
              className='ui large button fluid discord-theme'
              href={addToServerUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Add to Server
              <i className="right external alternate icon"></i>
            </a>

            <Link className="ui large secondary button fluid" to="/docs">Bot Commands</Link>
          </div>


          {/* <div onClick={onSeeMovesClick} className="ui secondary button">
            See the moves
            <i className="right arrow icon"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
