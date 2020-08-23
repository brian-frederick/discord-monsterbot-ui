import React from 'react';
import Dropdown from '../../Dropdown';
import ModifierFields from '../modifier/ModifierFields';

const basicMoves = [
  { label: 'Kick Some Ass', value: 'ksa' },
  { label: 'Act Under Pressure', value: 'aup' },
  { label: 'Help Out', value: 'ho' },
  { label: 'Investigate A Mystery', value: 'IAM' },
  { label: 'Manipulate Someone', value: 'MS' },
  { label: 'Protect Someone', value: 'PS' },
  { label: 'Read A Bad Situation', value: 'RABS' },
  { label: 'Use Magic', value: 'UM' },
];

const MoveModificationFields = ({ moveToModify, modifiers, onModifiersChange, onSelectChange }) => {
  return (
    <div>
      <div className="ui horizontal divider">Move Modifications</div>
      <div className="ui center aligned basic segment">Select a basic move, replace the hunter properties modifier, and/or create additional modifiers </div>

      <div className="six fields">
        <Dropdown
          name="moveToModify"
          label="Modify This Move"
          options={basicMoves}
          selected={moveToModify}
          onSelectedChange={onSelectChange}
        />
      </div>

      <ModifierFields 
        modifiers={modifiers} 
        onModifiersChange={onModifiersChange}
      />

    </div>
  );
};

export default MoveModificationFields;