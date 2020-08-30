import React from 'react';
import SimpleFields from '../moves/typeFields/SimpleFields';
import RollForOutcomeFields from '../moves/typeFields/RollForOutcomeFields';
import MoveModificationFields from '../moves/typeFields/MoveModificationFields';

export default class MoveForm extends React.Component {

  
  constructor(props) {
    super(props);

    console.log('props in form', props);
    // we do a one time copy of the initial state of parent's move.
    // this allows us to reuse the same form for edit and create.
    this.state = {
      // handle errors and validation
      key: props.move.key,
      type: props.move.type,
      name: props.move.name,
      playbook: props.move.playbook,
      description: props.move.description,
      modifiers: props.move.modifiers,
      missOutcome: props.move.missOutcome,
      fairOutcome: props.move.fairOutcome,
      successOutcome: props.move.successOutcome,
      advancedOutcome: props.move.advancedOutcome,
      moveToModify: props.move.moveToModify
      
    };
  }

  renderTypeFields = () => {
    switch (this.state.type) {
      case 'simple':
        return null;
      case 'roll':
        return <RollForOutcomeFields 
          modifiers={this.state.modifiers}
          missOutcome={this.state.missOutcome}
          fairOutcome={this.state.fairOutcome}
          successOutcome={this.state.successOutcome}
          onChange={this.onInputChange}
          onModifiersChange={this.onModifiersChange}
        />;
      case 'modification':
        return (
          <MoveModificationFields
            moveToModify={this.state.moveToModify}
            modifiers={this.state.modifiers}
            onModifiersChange={this.onModifiersChange}
            onSelectChange={this.onSelectChange}
          />
        );
      default:
        return null;
    }
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectChange = (name, option) => {
    this.setState({ [name]: option });
  };

  onModifiersChange = (modifiers) => {
    this.setState({ 'modifiers': modifiers })
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <div>
        <h3 className="ui header center aligned">Create A Move</h3>
        
        <form className="ui form" onSubmit={this.onSubmit}>

          <SimpleFields
            keyVal={this.state.key}
            name={this.state.name}
            description={this.state.description}
            type={this.state.type}
            playbook={this.state.playbook}
            onInputChange={this.onInputChange}
            onSelectChange={this.onSelectChange}
          />

          {this.renderTypeFields()}
          
          <div className="field">
            <button className="ui primary button submit right floated" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }

}
