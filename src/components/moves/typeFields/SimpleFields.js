import React from 'react';
import Dropdown from '../../Dropdown';
import ToolTip from '../common/Tooltip';


const typeOptions = [
  { label: 'Simple', value: 'simple' },
  { label: 'Roll Outcome', value: 'roll' },
  { label: 'Basic Move Modification', value: 'modification' }
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
        <div className="fields">
          <div className="twelve wide field">
            <label>Move Name</label>
            <input 
              type="text"
              placeholder="Move Name"
              name="name"
              value={this.props.name}
              onChange={this.props.onInputChange}
            />
          </div>
          
          <div className="four wide field">
            <label>
              Command Key
              <ToolTip content="2-5 letter abbreviation to call this move in Monsterbot." />
            </label>
            <input 
              type="text"
              placeholder="Command Key"
              name="key"
              value={this.props.keyVal}
              onChange={this.props.onInputChange}
            />
          </div>
        </div>

          <Dropdown
            name="playbook"
            label="Playbook"
            options={playbookOptions}
            selected={this.props.playbook}
            onSelectedChange={this.props.onSelectChange}
          />
          <div className="field">
            <label>Move Description</label>
            <textarea 
              placeholder="Description"
              name="description"
              value={this.props.description}
              onChange={this.props.onInputChange}
              rows='3'
            />
          </div>
          
          <Dropdown
            name='type'
            label='Move Type'
            options={typeOptions}
            selected={this.props.type}
            onSelectedChange={this.props.onSelectChange}
          />
      </div>
    );
  }

}