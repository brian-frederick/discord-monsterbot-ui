import React, { useState } from 'react';
import Dropdown from '../../common/Dropdown';
import ModifierFields from '../modifier/ModifierFields';

const basicMoves = [
  { label: 'Kick Some Ass', value: 'ksa', modifier: 'Tough' },
  { label: 'Act Under Pressure', value: 'aup', modifier: 'Cool' },
  { label: 'Help Out', value: 'ho', modifier: 'Cool' },
  { label: 'Investigate A Mystery', value: 'iam', modifier: 'Sharp' },
  { label: 'Manipulate Someone', value: 'ms', modifier: 'Charm' },
  { label: 'Protect Someone', value: 'ps', modifier: 'Tough' },
  { label: 'Read A Bad Situation', value: 'rabs', modifier: 'Sharp' },
  { label: 'Use Magic', value: 'um', modifier: 'Weird' },
];



const MoveModificationFields = ({ moveToModify, modifiers, onModifiersChange, onSelectChange }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const selectedMove = basicMoves.find(move => move.value === moveToModify);
  return (
    <div>
      <div className="ui horizontal divider">Move Modifications</div>
      <div className="ui center aligned basic segment">Select a basic move, replace the hunter properties modifier, and/or create additional modifiers </div>

      <Dropdown
        name="moveToModify"
        label="Modify This Move"
        options={basicMoves}
        selected={moveToModify}
        onSelectedChange={onSelectChange}
      />

      { isInfoOpen &&
        <div className="ui info message">
          <i onClick={() => setIsInfoOpen(false)} className="close icon"></i>
          <p>
            You are modifying {selectedMove.label} which is normally rolled plus {selectedMove.modifier}.
            However, the modifiers you select will REPLACE the standard modifiers. So if you'd like to add a modifier, instead of replacing it, also include the existing plus {selectedMove.modifier} in your list of modifiers.
          </p>
        </div>
      }

      <ModifierFields 
        modifiers={modifiers} 
        onModifiersChange={onModifiersChange}
      />

    </div>
  );
};

export default MoveModificationFields;