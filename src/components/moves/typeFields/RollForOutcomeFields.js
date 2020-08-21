import React from 'react';
import ModifierFields from '../modifier/ModifierFields';


const RollForOutcomeFields = ({
  modifiers,
  missOutcome,
  fairOutcome,
  successOutcome,
  advancedOutcome,
  onChange,
  onModifiersChange
}) => {
  
  return (
    <div>
      <ModifierFields 
        modifiers={modifiers} 
        onModifiersChange={onModifiersChange}
      />

      <p>Dice Roll Outcomes</p>

      <div className="field">
        <label>On a miss...</label>
        <textarea
          type="text"
          placeholder="Miss outcome..."
          name="missOutcome"
          value={missOutcome}
          onChange={onChange}
          rows="2"
        />
      </div>

      <div className="field">
        <label>On a 7+...</label>
        <textarea
          type="text"
          placeholder="7+ outcome..."
          name="fairOutcome"
          value={fairOutcome}
          onChange={onChange}
          rows="2"
        />
      </div>

      <div className="field">
        <label>On a 10+...</label>
        <textarea
          type="text"
          placeholder="10+ outcome..."
          name="successOutcome"
          value={successOutcome}
          onChange={onChange}
          rows="2"
        />
      </div>

      <div className="field">
        <label>On a 12+...</label>
        <textarea
          type="text"
          placeholder="Advanced outcome..."
          name="advancedOutcome"
          value={advancedOutcome}
          onChange={onChange}
          rows="2"
        />
      </div>
    </div>
  );
};

export default RollForOutcomeFields;