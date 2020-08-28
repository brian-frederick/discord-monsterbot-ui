import React from 'react';
import { connect } from 'react-redux';
import MoveForm from '../MoveForm';
import { createMove } from '../../../actions';

class MoveCreate extends React.Component {
  state = {
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
  

  onFormSubmit = formVals => {
    console.log('submitting', formVals);
    this.props.createMove(formVals);
  };

  render() {
    return (
      <div>
        <MoveForm 
          move={this.state.move}
          onFormSubmit={this.onFormSubmit} />
      </div>
    );
  };

};

export default connect(null, { createMove })(MoveCreate);
