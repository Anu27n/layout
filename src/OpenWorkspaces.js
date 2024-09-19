import React from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js

const OpenWorkspaces = ({ areas, updateAreas, variant, onVariantChange }) => {
  const handleIncrement = (type) => {
    const newValue = (areas[type] || 0) + 1;
    updateAreas(type, newValue);
  };

  const handleDecrement = (type) => {
    const newValue = (areas[type] || 0) - 1;
    if (newValue >= 0) {
      updateAreas(type, newValue);
    } else {
      alert("Negative values are not allowed.");
    }
  };

  const handleInputChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 0) {
      updateAreas(type, parsedValue);
    } else {
      alert("Negative values are not allowed.");
    }
  };

  return (
    <div className="section">
      <h3 className="section-heading">Open Workspaces</h3>
      <div className="workspace-row">
        {["linear", "lType"].map((type) => (
          <div key={type} className="workspace">
            <img src={`/images/${type}.png`} alt={`${type} Workstations`} />
            <div className="control-btn-box">
              {type === "linear" && (
                <select value={variant} onChange={(e) => onVariantChange(e.target.value)}>
                  <option value="medium">Medium (20 sq feet)</option>
                  <option value="large">Large (25 sq feet)</option>
                  <option value="xl">XL (30 sq feet)</option>
                </select>
              )}
              <Counter
                value={areas[type] || 0}
                onIncrement={() => handleIncrement(type)}
                onDecrement={() => handleDecrement(type)}
                onChange={(value) => handleInputChange(type, value)}
              />
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1)} Workstations: <span>{areas[type] || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenWorkspaces;