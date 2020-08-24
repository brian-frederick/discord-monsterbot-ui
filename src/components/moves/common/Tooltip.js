import React from 'react';

const ToolTip = ({ content }) => {
  return (
    <span
      className="ui float-right"
      data-tooltip={content}
      data-inverted=""
      data-position="top right"
    >
      <i class="question circle icon"></i>
    </span>
  );
};

export default ToolTip;
