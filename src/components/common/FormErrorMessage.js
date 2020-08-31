import React from 'react';

const FormErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  } else {
    return (
      <div className="ui error message">
        <p>{message}</p>
      </div>
    );
  }
};

export default FormErrorMessage;