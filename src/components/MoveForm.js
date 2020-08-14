import React from 'react';
import aws from '../apis/aws';
import Dropdown from './Dropdown';

const typeOptions = [
  { label: 'simple', value: 'simple' },
  { label: 'roll', value: 'roll' },
  { label: 'modification', value: 'modification' }
]
export default class MoveForm extends React.Component {
  state = {
    key: '',
    type:   { label: 'simple', value: 'simple' },
    name: '',
    description: '',
  }

  onFormSubmit = async event => {
    event.preventDefault();
    const response = await aws.post('/moves', {
      params: {
        move: {
          key: this.state.key,
          name: this.state.name,
          type: this.state.type.value,
          description: this.state.description
        }
      }
    })
  };

  renderTypeFields = (type) => {
    switch (this.state.type.value) {
      case 'simple':
        return null;
      case 'roll':
        return <p>Roll Fields Under Construction</p>;
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
  }

  render() {
    return (
      <div>
        <h1>Create a move</h1>
        <form className="ui form" onSubmit={this.onFormSubmit}>
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
          <Dropdown
            name='type'
            label='Type'
            options={typeOptions}
            selected={this.state.type}
            onSelectedChange={this.onSelectChange}
          />
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

          {this.renderTypeFields()}
          

          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    );
  };

};
