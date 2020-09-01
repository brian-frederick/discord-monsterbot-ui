import React from 'react';

const Modifier = ({mod, index, editable, onDelete }) => {
  const mathSymbol = mod.plus ? 'Plus' : 'Minus';
  const modVal = mod.type === 'property' ? mod.property : mod.value;

  return (
    <div className="ui compact segment">
      <div>
      {mathSymbol} {modVal}
        { editable &&
          <i className="close icon right" onClick={() => onDelete(index)}></i>
        }
      </div>
    </div>
  );
  
};

export default Modifier;