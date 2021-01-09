import React from 'react';
import ToolTip from '../common/Tooltip';

const EmailConsentCheckbox = props => {

  return (
    <div className="field">
      <div className="ui checkbox">
        <input
          id="email-checkbox"
          name="emailConsent"
          type="checkbox"
          checked={props.emailConsent}
          onChange={props.onCheckboxChange}
        />
              <label>
          Sure, store my Discord account email with my moves. 
          <ToolTip 
            content="We're still improving and might want to reach out if we need to make changes to your move." 
            classes="ui left"
            position="top center"
          />
      </label>
      </div>
    </div>
  );
}

export default EmailConsentCheckbox;
