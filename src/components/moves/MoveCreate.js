import React from 'react';
import aws from '../../apis/aws';
import SimpleFields from './typeFields/SimpleFields'
import RollForOutcomeFields from './typeFields/RollForOutcomeFields';
import MoveModificationFields from './typeFields/MoveModificationFields';

export default class MoveCreate extends React.Component {
  state = {
    key: '',
    type:   { label: 'simple', value: 'simple' },
    name: '',
    playbook: { label: 'The Chosen', value: 'The Chosen' },
    description: '',
    modifiers: [],
    missOutcome: '',
    fairOutcome: '',
    successOutcome: '',
    advancedOutcome: '',
    moveToModify: { label: 'Kick Some Ass', value: 'ksa' }
  }

  onFormSubmit = async event => {
    event.preventDefault();
    console.log('submitting', this.state);
    // const response = await aws.post('/moves', {
    //   params: {
    //     move: {
    //       key: this.state.key,
    //       name: this.state.name,
    //       type: this.state.type.value,
    //       description: this.state.description
    //     }
    //   }
    // });
  };

  renderTypeFields = () => {
    switch (this.state.type.value) {
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

  render() {
    return (
      <div>
        <h1 className="ui header center aligned">Create A Move</h1>
        
        <form className="ui form" onSubmit={this.onFormSubmit}>

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
            <button className="ui button submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  };

};
