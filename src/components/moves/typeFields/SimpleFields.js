import React from 'react';
import Dropdown from '../../common/Dropdown';
import ToolTip from '../../common/Tooltip';
import EmailConsentCheckbox from '../../common/EmailConsentCheckbox';
import FormErrorMessage from '../../common/FormErrorMessage';
import { checkForEmailConsent } from '../../../utils/discordLogin';
import { userGuildOptions } from '../../../utils/guilds';

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
      <a href={'/moves/show/' + key} rel="noopener noreferrer" target="_blank">{name} <i className="external alternate icon"></i></a>
      for an example.
    </span>
  );
};

const guildAccessTooltipContent = createMode => createMode ?
'Public moves are accessible to everyone and should only be used for the 12 basic playbooks.' :
'Guilds must be changed separately and can be accessed from the basic move menu.'

export default class SimpleFields extends React.Component {
  state = {
    isTypeInfoOpen: true
  };

  render() {
    return (
      <div>
        <div className="fields">
          <div className={this.props.errors.name ? 'twelve wide field required error' : 'twelve wide field required'}>
            <label>Move Name</label>
            <input 
              type="text"
              placeholder="Move Name"
              name="name"
              value={this.props.name}
              onChange={this.props.onInputChange}
            />
            <FormErrorMessage message={this.props.errors.name} />
          </div>
          
          <div className={this.props.errors.key ? "four wide field required error" : "four wide field required"} >
            <label>
              Command Key
              <ToolTip 
                content="A unique slash command name with only letters, dashes, or underscores under 32 characters long. Cannot be edited after move creation."
                classes="ui right"
                position="top right"
              />
            </label>
            <input 
              type="text"
              placeholder="Command Key"
              name="key"
              value={this.props.keyVal}
              onChange={this.props.onInputChange}
              disabled={!this.props.createMode}
            />
            <FormErrorMessage message={this.props.errors.key} />
          </div>
        </div>

          <Dropdown
            name="playbook"
            label="Playbook"
            options={playbookOptions}
            selected={this.props.playbook}
            onSelectedChange={this.props.onSelectChange}
          />

          <div className={this.props.errors.commandDescription ? 'field required error' : 'field required'}>   
            <label>
              Slash Command Description
              <ToolTip 
              content="A short description to appear under the Discord slash command."
              classes="top left"
              position="top left"
            />
            </label>
            <textarea 
              placeholder="command description"
              name="commandDescription"
              value={this.props.commandDescription}
              onChange={this.props.onInputChange}
              rows='1'
            />
            <FormErrorMessage message={this.props.errors.commandDescription} />
          </div>

          <div className={this.props.errors.description ? 'field required error' : 'field required'}>
            <label>Move Description</label>
            <textarea 
              placeholder="Description"
              name="description"
              value={this.props.description}
              onChange={this.props.onInputChange}
              rows='3'
            />
            <FormErrorMessage message={this.props.errors.description} />
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
                <li>Basic Move Modification allows you to replace the modifiers (like +1 tough) on one of the existing basic moves. {typeExample('ss', 'Shapeshifter')}</li>
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

          <Dropdown
            name="guildId"
            label='Server Access'
            options={userGuildOptions(this.props.guilds)}
            selected={this.props.guildId}
            onSelectedChange={this.props.onSelectChange}
            disabled={!this.props.createMode}
          >
            <ToolTip 
              content={guildAccessTooltipContent(this.props.createMode)}
              classes="top left"
              position="top left"
            />
          </Dropdown>
          
          {(checkForEmailConsent() !== true) && 
            <EmailConsentCheckbox
              emailConsent={this.props.emailConsent}
              onCheckboxChange={this.props.onCheckboxChange}
            />
          }
      </div>
    );
  }

}