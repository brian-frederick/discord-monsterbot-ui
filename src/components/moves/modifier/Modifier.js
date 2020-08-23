import React from 'react';

const Modifier = ({mod, onDelete, index}) => {
  const mathSymbol = mod.plus ? '+' : '-';
  const modVal = mod.type === 'property' ? mod.property : mod.value;

  return (
    <div className="ui small message">
      {mathSymbol} {modVal}
      <i onClick={() => onDelete(index)} className="close icon"></i>
    </div>
  );
  
};

export default Modifier;