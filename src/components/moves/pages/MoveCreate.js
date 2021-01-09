import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MoveForm from '../MoveForm';
import Loading from '../../common/Loading';
import { createMove } from '../../../actions';
import LoginPrompt from '../../common/LoginPrompt';
import { checkForEmailConsent } from '../../../utils/discordLogin';
class MoveCreate extends React.Component {

  state = {
    loading: false,
    move: {
      key: '',
      type: 'simple',
      name: '',
      playbook: 'The Chosen',
      description: '',
      modifiers: [],
      fail: '',
      success: '',
      high: '',
      advanced: '',
      moveToModify: 'ksa',
      guildId: '1',
    },
  };

  onFormSubmit = async formVals => {
    this.setState({ loading: true });
    await this.props.createMove(formVals, checkForEmailConsent());
    this.setState({ loading: false });
    this.props.history.push('/moves/list');
  };



  render() {
    if (this.state.loading) {
       return  <Loading />;
    } else if (_.isEmpty(this.props.user)) {
      return <LoginPrompt />;
    } else {
      return (
        <div>
          <MoveForm 
            move={this.state.move}
            guilds={this.props.user.guilds}
            onFormSubmit={this.onFormSubmit}
            createMode
          />
        </div>
      );
    }
  };

};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { createMove })(MoveCreate);
