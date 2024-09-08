import React from 'react';

const OpenWorkspaces = ({ areas, updateAreas }) => {
  return (
    <div className="section">
      <h3 className="section-heading">Open Workspaces</h3>
      <div className="workspace-row">
        {["linear", "lType"].map((type) => (
          <div key={type} className="workspace">
            <img src={`/${type}.png`} alt={`${type} Workstations`} />
            <div className="control-btn-box">
              <button
                className="control-btn"
                onClick={() => updateAreas(type, Math.max(areas[type] - 1, 0))}
              >
                -
              </button>
              <span>{areas[type]}</span>
              <button
                className="control-btn"
                onClick={() => updateAreas(type, areas[type] + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenWorkspaces;