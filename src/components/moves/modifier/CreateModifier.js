import React, { useState } from 'react';
import Dropdown from '../../Dropdown';

const CreateModifier = ({onCreate}) => {
  const [type, setType] = useState({label: 'property', value: 'property'});
  const [plus, setPlus] = useState({label: '+', value: true});
  const [modVal, setModVal] = useState(0);
  const [property, setProperty] = useState({ label: 'cool', value: 'cool'});

  const typeOptions = [
    {label: 'property', value: 'property'},
    {label: 'extra', value: 'extra'},
  ];

  const plusOptions = [
    {label: '+', value: true},
    {label: '-', value: false}
  ];

  const propertyOptions = [
    { label: 'cool', value: 'cool'},
    { label: 'charm', value: 'charm' },
    { label: 'sharp', value: 'sharp' },
    { label: 'tough', value: 'tough' },
    { label: 'weird', value: 'weird' },
    { label: 'harm', value: 'harm' },
    { label: 'experience', value: 'experience' },
    { label: 'luck', value: 'luck' },
  ];

  const onClick = event => {
    event.preventDefault();
    const newModifier = (type.value === 'property') 
      ? { type: type.value, plus: plus.value, property: property.value }
      : { type: type.value, plus: plus.value, value: modVal };
    
    onCreate(newModifier);
  }


  const renderTypeFields = (type) => {
    switch(type.value) {
      case 'property':
        return <Dropdown
          name='property'
          label="property"
          options={propertyOptions}
          selected={property}
          onSelectedChange={(name, option) => setProperty(option)}
        />;
      case 'extra':
        return (
          <div className="field">
            <label>Value</label>
            <input 
              type="number"
              name="modVal"
              value={modVal}
              onChange={e => setModVal(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="four fields">
      <Dropdown
        name='type'
        label='Type'
        options={typeOptions}
        selected={type}
        onSelectedChange={(name, option) => setType(option)}
      />

      <Dropdown
        name="plus"
        label="Add/Subtract"
        options={plusOptions}
        selected={plus}
        onSelectedChange={(name, option) => setPlus(option)}
      />

      {renderTypeFields(type)}

      <button className="ui button" onClick={onClick}>Create</button>
    </div>
  );
};

export default CreateModifier;