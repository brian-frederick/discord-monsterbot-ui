import React from 'react';
import Dropdown from '../../common/Dropdown';

const EditableModifier = ({ index, mod, onDelete, onChange }) => {

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

  const onChangeHunterProperty = (changedOptionVal) => {
    const updatedModifier = {...mod, property: changedOptionVal};
    onChange(index, updatedModifier);
  };

  const onChangeModVal = (changedModVal) => {
    const updatedModifier = { ...mod, value: changedModVal };
    onChange(index, updatedModifier);
  };

  const onChangeType = (changedType) => {
    const defaultModByType = 
      changedType === 'property'
      ? { type: 'property', plus: true, property: 'cool'}
      : { type: 'extra', plus: true, value: 1 };

    onChange(index, defaultModByType);
  };

  const onChangePlus = (changedPlus) => {
    const updatedModifier = {...mod, plus: changedPlus};
    onChange(index, updatedModifier);
  };

  const renderTypeFields = (type) => {
    switch(type) {
      case 'property':
        return (
            <Dropdown
              name='property'
              label="Property"
              options={propertyOptions}
              selected={mod.property ? mod.property : 'cool'}
              onSelectedChange={(name, optionVal) => onChangeHunterProperty(optionVal)}
            />
        );
        
      case 'extra':
        return (
          <div className="field">
            <label>Value</label>
            <input 
              type="number"
              name="modVal"
              value={mod.value ? mod.value : 1}
              onChange={e => onChangeModVal(parseInt(e.target.value))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ui raised segment">

      <i className="close icon right" onClick={() => onDelete(index)}></i>
      
      <div className="inline fields">
          <Dropdown
            name='type'
            label='Modifier Type'
            options={typeOptions}
            selected={mod.type}
            onSelectedChange={(name, optionVal) => onChangeType(optionVal)}
          />

          <Dropdown
            name="plus"
            label="Add/Subtract"
            options={plusOptions}
            selected={mod.plus}
            onSelectedChange={(name, optionVal) => onChangePlus(optionVal)}
          />

          {renderTypeFields(mod.type)}        

      </div>
    </div>

  );
};

export default EditableModifier;
