import React from 'react';
import CreateModifier from './CreateModifier';
import Modifier from './Modifier';

export default class ModifierFields extends React.Component {
  state = {
    createMode: false
  };

  toggleCreateMode = () => {
    this.setState({ createMode: !this.state.createMode });
  }

  onCreate = (modifier) => {
    const newModifiers = [...this.props.modifiers, modifier];
    this.props.onModifiersChange(newModifiers);
    this.toggleCreateMode();
  }

  render() {
    return (
      <div>
        <p>Modifiers</p>

        <div className="eight wide field">
          {this.props.modifiers.map( (mod, i) => { return <Modifier key={i} mod={mod}/>})}
        </div>

        {!this.state.createMode && <button onClick={this.toggleCreateMode}></button>}
        
          {this.state.createMode && 
            <CreateModifier
              onCreate={this.onCreate}
            />
          }

      </div>
    );  
  };

}


