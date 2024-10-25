import React from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import './styles.css'; // Import the updated CSS file

const workspaceDescriptions = {
  md: "This is the MD's cabin, designed for maximum comfort and productivity.",
  manager: "This is the Manager's cabin, equipped with all necessary amenities.",
  small: "This is a small cabin, suitable for individual work.",
};

const Cabins = ({ areas, updateAreas, mdCabinSize, setMdCabinSize }) => {
  const handleIncrement = (type) => {
    const newValue = (areas[type] || 0) + 1;
    updateAreas(type, newValue);
  };

  const handleDecrement = (type) => {
    const newValue = (areas[type] || 0) - 1;
    if (newValue >= 0) {
      updateAreas(type, newValue);
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  const handleInputChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 0) {
      updateAreas(type, parsedValue);
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  const handleSliderChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setMdCabinSize(newSize);
  };

  return (
    <div className="section">
      <h3 className="section-heading">Cabins</h3>
      <div className="cabins-grid">
        {["md", "manager", "small"].map((type) => (
          <div key={type} className="workspace">
            <div className="workspace-image-container">
              <img src={`/images/${type}.png`} alt={`${type} Cabin`} className="workspace-image" />
              <div className="workspace-description">{workspaceDescriptions[type]}</div>
            </div>
            <div className="control-btn-box">
              <Counter
                value={areas[type] || 0}
                onIncrement={() => handleIncrement(type)}
                onDecrement={() => handleDecrement(type)}
                onChange={(value) => handleInputChange(type, value)}
              />
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1)} Cabin: <span>{areas[type] || 0}</span>
              </div>
              {type === "md" && (
                <div className="slider-container">
                  <label htmlFor="md-cabin-size">MD Cabin Size: {mdCabinSize} sq ft</label>
                  <input
                    type="range"
                    id="md-cabin-size"
                    min="120"
                    max="240"
                    value={mdCabinSize}
                    onChange={handleSliderChange}
                    className="slider"
                  />
                </div>
              )}
              {type === "small" && (
                <div className="seats-description">
                  <strong>1 small cabin = 4 pax</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cabins;