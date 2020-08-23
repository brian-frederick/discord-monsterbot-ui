import React from 'react';
import Dropdown from '../../Dropdown';


const typeOptions = [
  { label: 'simple', value: 'simple' },
  { label: 'roll', value: 'roll' },
  { label: 'modification', value: 'modification' }
]

const playbookOptions = [
  { label: 'The Chosen', value: 'The Chosen'},
  { label: 'The Crooked', value: 'The Crooked'},
  { label: 'The Divine', value: 'The Divine'},
  { label: 'The Expert', value: 'The Expert'},
  { label: 'The Flake', value: 'The Flake'},
  { label: 'The Initiate', value: 'The Initiate'},
  { label: 'The Monstrous', value: 'The Monstrous'},
  { label: 'The Mundane', value: 'The Mundane'},
  { label: 'The Professional', value: 'The Professional'},
  { label: 'The Spell-Slinger', value: 'The Spell-Slinger'},
  { label: 'The Spooky', value: 'The Spooky'},
  { label: 'The Wronged', value: 'The Wronged'},
  { label: 'Other', value: 'Other'},
];

export default class SimpleFields extends React.Component {

  render() {

    return (
      <div>
        <div className="five fields">
          <div className="field">
            <label>Key</label>
            <input 
              type="text"
              placeholder="Key"
              name="key"
              value={this.props.keyVal}
              onChange={this.props.onInputChange}
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
              value={this.props.name}
              onChange={this.props.onInputChange}
            />
          </div>
        </div>

        <div className="six fields">
          <Dropdown
            name="playbook"
            label="Playbook"
            options={playbookOptions}
            selected={this.props.playbook}
            onSelectedChange={this.props.onSelectChange}
          />
        </div>

        <div className="field">
          <label>Description</label>
          <textarea 
            placeholder="Description"
            name="description"
            value={this.props.description}
            onChange={this.props.onInputChange}
            rows='3'
          />
        </div>

        <div className="three fields">
          <Dropdown
            name='type'
            label='Type'
            options={typeOptions}
            selected={this.props.type}
            onSelectedChange={this.props.onSelectChange}
          />
        </div>
      </div>
    );
  }

}