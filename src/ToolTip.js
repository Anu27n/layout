import React from 'react';
import './ToolTip.css'; // Create a CSS file for styling

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip">{text}</div>
    </div>
  );
};

export default Tooltip;