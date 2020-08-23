import React from 'react';
import CreateModifier from './CreateModifier';
import Modifier from './Modifier';

export default class ModifierFields extends React.Component {
  state = {
    createMode: true
  };

  toggleCreateMode = () => {
    this.setState({ createMode: !this.state.createMode });
  }

  onCreate = (modifier) => {
    const newModifiers = [...this.props.modifiers, modifier];
    this.props.onModifiersChange(newModifiers);
    this.toggleCreateMode();
  }

  onDelete = (index) => {
    let modifiers = [...this.props.modifiers]; 
    if (index !== -1) {
      modifiers.splice(index, 1);
      this.props.onModifiersChange(modifiers)
    }
  }

  renderModifiers = () => {
    return (
      <div className="ui segments">
        {this.props.modifiers.map((mod, i) => { 
            return (
              <div key={i}>
                <Modifier mod={mod} index={i} onDelete={this.onDelete} />
              </div>
            );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="ui segments">
        
        <div className="ui segment">
          Modifiers 
          {!this.state.createMode &&
            <i className="plus icon" onClick={this.toggleCreateMode}></i>
          }
            { this.props.modifiers.length > 0 && this.renderModifiers()}
            {this.state.createMode && 
              <div className="ui raised segments">
                <CreateModifier onCreate={this.onCreate} />
              </div>
            }
        
          </div>

      </div>
    );  
  };
}


