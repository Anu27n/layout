import React, { useState, useEffect } from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import Radio from './Radio'; // Ensure the correct path to Radio.js
import './styles.css'; // Import the updated CSS file
import Tooltip from './ToolTip'; // Import the Tooltip component


const workspaceDescriptions = {
  linear: "This is a linear workspace, designed for open collaboration.",
  lType: "This is an L-type workspace, providing a semi-private environment.",
};

const sizeMapping = {
  medium: "3 X 21",
  large: "3.5 X 2",
  xl: "4 X 2",
  lType: "5 X 4",
};

const sizeArea = {
  medium: "20 sq ft",
  large: "24 sq ft",
  xl: "29 sq ft",
  lType: "5 X 4",
};

const OpenWorkspaces = ({ areas, updateAreas, variant, onVariantChange }) => {
  const [selectedSize, setSelectedSize] = useState(variant);

  useEffect(() => {
    setSelectedSize(variant);
  }, [variant]);

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    onVariantChange(newSize);
  };

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
    if (parsedValue >= -1) {
      updateAreas(type, parsedValue);
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  return (
    <div className="section">
      <h3 className="section-heading">Open Workspaces</h3>
      <div className="open-workspaces-grid grid">
        {["linear", "lType"].map((type) => (
          <div key={type} className="workspace">
            <div className="workspace-image-container">
              <img src={`/images/${type}.png`} alt={`${type} Workstations`} className="workspace-image" />
              <div className="workspace-description">{workspaceDescriptions[type]}</div>
            </div>
            <div className="control-btn-box">
              <Counter
                value={areas[type] || 0}
                onIncrement={() => handleIncrement(type)}
                onDecrement={() => handleDecrement(type)}
                onChange={(value) => handleInputChange(type, value)}
              />
              {type === "linear" && (
                <>
                  <Radio selectedValue={selectedSize} onChange={handleSizeChange} />
                  <div className="size-display">
                     <span>Desk Size:{sizeMapping[selectedSize]}</span>
                  </div>
                </>
              )}
              {type === "lType" && (
                <div className="size-display">
                   <span>Desk Size:{sizeMapping.lType}</span>
                </div>
              )}
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1)} Workstations: <span>{areas[type] || 0}</span>
                {type === "linear" && (
                  <div className="tooltip-container">
                    <Tooltip text={`Size: ${sizeArea[selectedSize]}`}>
                      <button className="info-button">i</button>
                    </Tooltip>
                  </div>
                )}
                {type === "lType" && (
                  <div className="tooltip-container">
                    <Tooltip text={`Size: 34 sq ft`}>
                      <button className="info-button">i</button>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenWorkspaces;