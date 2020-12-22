import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MoveForm from '../MoveForm';
import Loading from '../../common/Loading';
import LoginPrompt from '../../common/LoginPrompt';
import { editMove, fetchMove } from '../../../actions';
import { moveToForm } from '../../../utils/forms';
import { compoundKey } from '../../../utils/moves';

class MoveEdit extends React.Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    this.props.fetchMove(this.props.match.params.key, this.props.match.params.guildId);
  }
  

  onFormSubmit = async formVals => {
    this.setState({ loading: true });
    await this.props.editMove(formVals);
    this.props.history.push('/moves/list');
  };

  render() {
    if (this.state.loading || !this.props.move || !this.props.move.type) {
       return  <Loading />;
    } else if (_.isEmpty(this.props.user)) {
      return <LoginPrompt />;
    } else {
      const moveVals = moveToForm(this.props.move);
      return (
        <div>
          <MoveForm
            move={moveVals}
            guilds={this.props.user.guilds}
            onFormSubmit={this.onFormSubmit} 
          />
        </div>
      );
    }
  };
  
};

const mapStateToProps = (state, ownProps) => {
  return { 
    move: state.moves[compoundKey(ownProps.match.params)],
    user: state.user
  };
};

export default connect(mapStateToProps, { fetchMove, editMove })(MoveEdit);
