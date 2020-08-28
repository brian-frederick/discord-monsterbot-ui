import React from 'react';

const ToolTip = ({ content }) => {
  return (
    <span
      className="ui right"
      data-tooltip={content}
      data-inverted=""
      data-position="top right"
    >
      <i className="question circle icon"></i>
    </span>
  );
};

export default ToolTip;
