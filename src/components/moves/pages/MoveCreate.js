import React from 'react';
import { connect } from 'react-redux';
import MoveForm from '../MoveForm';
import Loading from '../../common/Loading';
import { createMove } from '../../../actions';

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
      missOutcome: '',
      fairOutcome: '',
      successOutcome: '',
      advancedOutcome: '',
      moveToModify: 'ksa'
    }
  }
  

  onFormSubmit = async formVals => {
    this.setState({ loading: true });
    await this.props.createMove(formVals);
    this.setState({ loading: false });
    this.props.history.push('/moves/list');
  };

  render() {
    if (this.state.loading) {
       return  <Loading />
    } else {
      return (
        <div>
          <MoveForm 
            move={this.state.move}
            onFormSubmit={this.onFormSubmit} 
          />
        </div>
      );
    }
  };

};

export default connect(null, { createMove })(MoveCreate);
