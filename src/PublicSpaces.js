import React from 'react';

const PublicSpaces = ({ areas, updateAreas }) => {
  return (
    <div className="section">
      <h3 className="section-heading">Public Spaces</h3>
      <div className="workspace-row">
        {["ups", "bms", "server"].map((type) => (
          <div key={type} className="workspace">
            <img src={`/images/${type}.png`} alt={`${type} Room`} />
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

export default PublicSpaces;