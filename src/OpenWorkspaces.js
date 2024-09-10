import React from 'react';

const OpenWorkspaces = ({ areas, updateAreas }) => {
  const handleInputChange = (type, value) => {
    updateAreas(type, value);
  };

  return (
    <div className="section">
      <h3 className="section-heading">Open Workspaces</h3>
      <div className="workspace-row">
        {["linear", "lType"].map((type) => (
          <div key={type} className="workspace">
            <img src={`/images/${type}.png`} alt={`${type} Workstations`} />
            <div className="control-btn-box">
              <input
                type="number"
                className="value-input"
                placeholder="Enter value"
                value={areas[type] || ''}
                onChange={(e) => handleInputChange(type, e.target.value)}
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