import React from 'react';

const Modifier = ({mod}) => {
  console.log(mod)
  const mathSymbol = mod.plus ? '+' : '-';
  const modVal = mod.type === 'property' ? mod.property : mod.value;

  return (
    <div className="ui large message">{mathSymbol} {modVal}</div>
  );
  
};

export default Modifier;