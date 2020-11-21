import React from 'react';

const ToolTip = ({ content, style }) => {
  return (
    <span
      className={style}
      data-tooltip={content}
      data-inverted=""
      data-position="top center"
    >
      <i className="question circle icon"></i>
    </span>
  );
};

export default ToolTip;
