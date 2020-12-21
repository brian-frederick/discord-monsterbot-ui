import React from 'react';

const ToolTip = ({ content, classes }) => {
  return (
    <span
      className={classes}
      data-tooltip={content}
      data-inverted=""
      data-position="top center"
    >
      <i className="question circle icon"></i>
    </span>
  );
};

export default ToolTip;
