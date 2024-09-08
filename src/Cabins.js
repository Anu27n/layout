import React from 'react';

const Cabins = ({ areas, updateAreas }) => {
  return (
    <div className="section">
      <h3 className="section-heading">Cabins</h3>
      <div className="workspace-row">
        {["md", "manager", "small"].map((type) => (
          <div key={type} className="workspace">
            <img src={`/images/${type}.png`} alt={`${type} Cabin`} />
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

export default Cabins;