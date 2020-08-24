import React, { useState } from 'react';
import Dropdown from '../../common/Dropdown';
import '../../../styles/Segment.css';

const CreateModifier = ({onCreate}) => {
  const [type, setType] = useState('property');
  const [plus, setPlus] = useState(true);
  const [modVal, setModVal] = useState(0);
  const [property, setProperty] = useState('cool');

  const typeOptions = [
    {label: 'By Hunter Property', value: 'property'},
    {label: 'Additional Values', value: 'extra'},
  ];

  const plusOptions = [
    {label: '+', value: true},
    {label: '-', value: false}
  ];

  const propertyOptions = [
    { label: 'Cool', value: 'cool'},
    { label: 'Charm', value: 'charm' },
    { label: 'Sharp', value: 'sharp' },
    { label: 'Tough', value: 'tough' },
    { label: 'Weird', value: 'weird' },
    { label: 'Harm', value: 'harm' },
    { label: 'Experience', value: 'experience' },
    { label: 'Luck', value: 'luck' },
  ];

  const onClick = event => {
    event.preventDefault();
    const newModifier = (type === 'property') 
      ? { type, plus: plus, property }
      : { type, plus, value: modVal };
    
    onCreate(newModifier);
  }


  const renderTypeFields = (type) => {
    switch(type) {
      case 'property':
        return (
            <Dropdown
              name='property'
              label="Property"
              options={propertyOptions}
              selected={property}
              onSelectedChange={(name, optionVal) => setProperty(optionVal)}
            />
        );
        
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
    <div className="ui raised segment">
      <div className="inline fields">
          <Dropdown
            name='type'
            label='Modifier Type'
            options={typeOptions}
            selected={type}
            onSelectedChange={(name, optionVal) => setType(optionVal)}
          />

          <Dropdown
            name="plus"
            label="Add/Subtract"
            options={plusOptions}
            selected={plus}
            onSelectedChange={(name, optionVal) => setPlus(optionVal)}
          />

          {renderTypeFields(type)}        

      </div>


      <div className="ui basic compact segment">
          <i className="check icon" onClick={onClick}></i>
      </div>

    </div>

  );
};

export default CreateModifier;