import React from 'react';

const SupportSpaces = ({ areas, updateAreas }) => {
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
      <h3 className="section-heading">Support Spaces</h3>
      <div className="workspace-row">
        {["ups", "bms", "server"].map((type) => (
          <div key={type} className="workspace">
            <img src={`/images/${type}.png`} alt={`${type} Room`} />
            <div className="control-btn-box">
              <input
                type="number"
                className="value-input"
                placeholder="Enter value"
                value={areas[type] || ''}
                onChange={(e) => handleInputChange(type, e.target.value)}
              />
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1)} Room: <span>{areas[type] || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportSpaces;