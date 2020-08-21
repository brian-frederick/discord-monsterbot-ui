import React from 'react';
import aws from '../../apis/aws';
import Dropdown from '../Dropdown';
import RollForOutcomeFields from './typeFields/RollForOutcomeFields';

const typeOptions = [
  { label: 'simple', value: 'simple' },
  { label: 'roll', value: 'roll' },
  { label: 'modification', value: 'modification' }
]
export default class MoveCreate extends React.Component {
  state = {
    key: '',
    type:   { label: 'simple', value: 'simple' },
    name: '',
    description: '',
    modifiers: [],
    missOutcome: '',
    fairOutcome: '',
    successOutcome: '',
    advancedOutcome: '',
    basicMove: ''
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

  renderTypeFields = (type) => {
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
        return <p>Modification Fields Under Construction</p>;
      default:
        return null;
    }
  }

  onInputChange = (event) => {
    console.log('theEvent', event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectChange = (name, option) => {
    console.log(option);
    this.setState({ [name]: option });
  };

  onModifiersChange = (modifiers) => {
    this.setState({ 'modifiers': modifiers })
  };

  render() {
    return (
      <div>
        <h1>Create a move</h1>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="five fields">
            <div className="field">
              <label>Key</label>
              <input 
                type="text"
                placeholder="Key"
                name="key"
                value={this.state.key}
                onChange={this.onInputChange}
              />
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label>Name</label>
              <input 
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea 
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onInputChange}
              rows='3'
            />
          </div>
          <div className="three fields">
            <Dropdown
              name='type'
              label='Type'
              options={typeOptions}
              selected={this.state.type}
              onSelectedChange={this.onSelectChange}
            />
          </div>

          {this.renderTypeFields()}
          
          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    );
  };

};
