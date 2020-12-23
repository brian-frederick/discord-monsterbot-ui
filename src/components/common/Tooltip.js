import React from 'react';

const ToolTip = ({ content, classes, position }) => {
  return (
    <span
      className={classes}
      data-tooltip={content}
      data-inverted=""
      data-position={position}
    >
      <i className="question circle icon"></i>
    </span>
  );
};

export default ToolTip;
