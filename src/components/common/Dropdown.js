import React, { useState, useEffect, useRef } from 'react';
import ToolTip from '../common/Tooltip';

const Dropdown = ({name, options, selected, onSelectedChange, label, disabled, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = event => {
      if (ref.current.contains(event.target)) return;
      setOpen(false);  
    };
      
    document.body.addEventListener('click', onBodyClick);

    //cleanup function
    return () => document.body.removeEventListener('click', onBodyClick);

  }, []);
  
  const renderedOptions = options.map((option) => {
    if (option.value === selected ) {
      return null;
    }

    return (
      <div 
        key={option.value} 
        className="item"
        onClick={() => onSelectedChange(name, option.value)}
      >
        {option.label}
      </div>
    )
  });

  const selectedOption = selectedValue => {
    return options.find(o => o.value === selectedValue)
  };

  return (
    <div className='field' ref={ref}>
      <label className="label">
        {label}
        {children}
      </label>
      <div 
        onClick={()=>setOpen(!open)} 
        className={`ui selection dropdown ${open ? 'visible active': ''} ${disabled ? 'disabled' : ''}`}
      >
        <i className="dropdown icon"></i>
        <div className="text">{selectedOption(selected).label}</div>
        <div className={`menu ${open ? 'visible transition': ''}`}>
          {renderedOptions}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;