import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loading from '../../common/Loading';
import LoginPrompt from '../../common/LoginPrompt';
import Dropdown from '../../common/Dropdown';
import EmailConsentCheckbox from '../../common/EmailConsentCheckbox';
import FormErrorMessage from '../../common/FormErrorMessage';
import { compoundKey } from '../../../utils/moves';
import { parseGuildName, userGuildOptions } from '../../../utils/guilds';
import { moveAlreadyExists } from '../../../utils/forms';
import { fetchMove, fetchMoves, editMoveGuild } from '../../../actions';
import { checkForEmailConsent, saveEmailConsent } from '../../../utils/discordLogin';

class MoveEditGuild extends React.Component {
  state = {
    emailConsent: checkForEmailConsent(),
    error: false,
    errorMsg: '',
    guildId: this.props.match.params.guildId,
    key: this.props.match.params.key,
    loading: false,
  };

  componentDidMount() {
    if (this.props.move) {
      this.setState({guildId: this.props.move.guildId});
    } else {
      this.props.fetchMove(this.state.key, this.state.guildId);
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({loading: true});

    await this.props.fetchMoves(this.state.guildId);
    
    const invalid = moveAlreadyExists({key: this.state.key, guildId: this.state.guildId}, this.props.moves);
    if (invalid) {
      this.setState({errorMsg: 'A move with this key already exists for this guild.'});
      this.setState({loading: false});
      return;
    }
    
    const guild = {
      id: this.state.guildId,
      name: parseGuildName(this.props.user.guilds, this.state.guildId)
    };
    
    await this.props.editMoveGuild(this.state.key, this.props.match.params.guildId, guild, this.state.emailConsent);
    saveEmailConsent(this.state.emailConsent);
    this.props.history.push('/moves/list');
  };

  onSelectChange = (name, option) => {
    this.setState({
      [name]: option,
      errorMsg: ''
    });
  };

  onCheckboxChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    if (this.state.loading || !this.props.move) {
       return  <Loading />;
    } else if (_.isEmpty(this.props.user)) {
      return <LoginPrompt />;
    } else {
      return (
        <div>
          <h3 className="ui header center aligned">
            Edit server for {this.props.move.name} ({this.state.key})
            <div id="move-show-options" className="right">
              <button
                className="admin-option"
                data-tooltip="back"
                data-position="bottom center"
                data-inverted  
              >
                <i onClick={this.props.history.goBack} className="arrow left icon"></i>
              </button>
            </div>
          </h3>
          <p>Move is currently for server: {this.props.move.guildName}</p>
          <form className={this.state.errorMsg.length > 0 ? 'ui form error' : 'ui form'} onSubmit={this.onSubmit}>
            <Dropdown
              name="guildId"
              label='Server'
              options={userGuildOptions(this.props.user.guilds)}
              selected={this.state.guildId}
              onSelectedChange={this.onSelectChange}
            />
            {(checkForEmailConsent() !== true) && 
              <EmailConsentCheckbox
                emailConsent={this.state.emailConsent}
                onCheckboxChange={this.onCheckboxChange}
              />
            }
            <FormErrorMessage message={this.state.errorMsg} />
            <div className="field">
                <button className="ui primary button submit right floated" type="submit" >Submit</button>
            </div>
          </form>
        </div>
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    move: state.moves[compoundKey(ownProps.match.params)],
    moves: state.moves,
    user: state.user
  };
};

export default connect(mapStateToProps, {fetchMove, fetchMoves, editMoveGuild })(MoveEditGuild);
