import React from 'react';
import '../../../styles/Segment.css';

const Modifier = ({mod, onDelete, index}) => {
  const mathSymbol = mod.plus ? 'Plus' : 'Minus';
  const modVal = mod.type === 'property' ? mod.property : mod.value;

  return (
    <div className="ui compact segment">
      <div>
      {mathSymbol} {modVal}
          <i className="close icon right" onClick={() => onDelete(index)}></i>
      </div>
    </div>
  );
  
};

export default Modifier;