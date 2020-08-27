import React from 'react';
import MoveForm from '../MoveForm';

export default class MoveCreate extends React.Component {
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
    // const response = await streams.post('/moves', {
    //   params: {
    //     move: {
    //       key: this.state.key,
    //       name: this.state.name,
    //       type: this.state.type
    //       description: this.state.description
    //     }
    //   }
    // });
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
