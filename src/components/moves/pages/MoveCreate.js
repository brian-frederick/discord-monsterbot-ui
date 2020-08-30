import React from 'react';
import { connect } from 'react-redux';
import MoveForm from '../MoveForm';
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
    console.log('submitting', formVals);
    this.setState({ loading: true });
    await this.props.createMove(formVals);
    console.log('submitted!');
    this.setState({ loading: false });
    this.props.history.push('/moves/list');
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="ui container">
          <div className="ui dimmer active">
            <div className="ui large text loader">beep boop raaar</div>
          </div>
          <p></p>
        </div>
      );
    } 
    return (
      <div>
        <MoveForm 
          move={this.state.move}
          onFormSubmit={this.onFormSubmit} 
        />
      </div>
    );
  };

};

export default connect(null, { createMove })(MoveCreate);
