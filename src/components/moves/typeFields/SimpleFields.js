import React from 'react';
import Dropdown from '../../common/Dropdown';
import ToolTip from '../../common/Tooltip';


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

const typeExample = (key, name) => {
  return (
    <span>
      See<span> </span>
      <a href={'/moves/show/' + key} target="_blank">{name} <i class="external alternate icon"></i></a>
      for an example.
    </span>
  );
}

export default class SimpleFields extends React.Component {
  state = {
    isTypeInfoOpen: true
  };

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

          { this.state.isTypeInfoOpen &&
            <div className="ui info message">
              <i onClick={() => this.setState({ isTypeInfoOpen: false })} className="close icon"></i>
              <div className="header">
                Move types determine what info Monsterbot needs about your move.
              </div>
              <ul className="list">
                <li>Simple moves just require the info above. {typeExample('ps', 'Preternatural Speed')}</li>
                <li>Roll Outcome moves allow you to determine what happens based on a hunter's role. {typeExample('oo', 'Often Overlooked')}</li>
                <li>Basic Move Modification allows you to change the modifiers (like +1 tough) on one of the existing basic moves. {typeExample('ss', 'Shapeshifter')}</li>
              </ul>
            </div>
          }

          
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