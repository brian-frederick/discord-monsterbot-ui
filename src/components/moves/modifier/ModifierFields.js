import React from 'react';
import EditableModifier from './EditableModifier';

export default class ModifierFields extends React.Component {

  createNewMod = () => {
    const newDefaultModifier = { type: 'property', plus: true, property: 'cool' };
    const newModifiers = [...this.props.modifiers, newDefaultModifier];
    this.props.onModifiersChange(newModifiers);
  }

  onChange = (index, modifier) => {
    let updatedModifiers = [...this.props.modifiers];
    updatedModifiers[index] = modifier;
    this.props.onModifiersChange(updatedModifiers);
  }

  onDelete = (index) => {
    let modifiers = [...this.props.modifiers]; 
    if (index !== -1) {
      modifiers.splice(index, 1);
      this.props.onModifiersChange(modifiers)
    }
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          Modifiers
          <i className="plus icon right" onClick={this.createNewMod}></i>
        </div>
          
          {
            this.props.modifiers.length > 0 &&
            <div className="ui segments">
              {this.props.modifiers.map((mod, i) => {
                return (
                  <div key={i}>
                    <EditableModifier index={i} mod={mod} onDelete={this.onDelete} onChange={this.onChange} />
                  </div>
                ); 
              })}
          </div>
          }
      </div>
    );  
  };

}


