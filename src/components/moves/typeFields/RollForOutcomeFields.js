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
      <div className="ui horizontal divider">Roll Outcomes and Modifiers</div>
      <div className="ui center aligned basic segment">Select hunter property or other modifiers and describe the roll-based outcomes for the move.</div>

      <ModifierFields 
        modifiers={modifiers} 
        onModifiersChange={onModifiersChange}
      />

      <div className="ui segments">
        <div className="ui segment">
          <p>Dice Roll Outcomes</p>
        </div>
        <div className="ui segments">
          <div className="ui segment">
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
        </div>
      </div>
    </div>
  );
};

export default RollForOutcomeFields;