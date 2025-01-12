import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import './styles.css';
import Tooltip from './ToolTip';
import { InfoIcon } from 'lucide-react';

const supportSpaceDescriptions = {
  ups: "This is the UPS room, ensuring uninterrupted power supply.",
  bms: "This is the BMS room, managing building systems.",
  server: "This is the server room, housing critical IT infrastructure.",
  executiveWashroom: "This is the Executive Washroom, providing premium facilities.",
  other: "This is an additional space for miscellaneous purposes." // Description for "other"
};

const SupportSpaces = ({ areas, updateAreas, isOtherSelected, setIsOtherSelected }) => {    //, areaValues, comeBack
  const handleIncrement = (type) => {
    const newValue = (areas[type] || 0) + 1;
    updateAreas(type, newValue);
  };

  const handleDecrement = (type) => {
    const newValue = (areas[type] || 0) - 1;
    if (newValue >= 0) {
      updateAreas(type, newValue);
    }
  };

  const handleInputChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 0) {
      updateAreas(type, parsedValue);
    }
  };

  const [otherArea, setOtherArea] = useState(0);

  const sizeArea = {
    ups: 90,
    bms: 90,
    server: 40,
    executiveWashroom: 60,
    other: 1 // Size for "other"
  };

  // useEffect(() => {
  //   console.log('Before comeBack in support spaces', comeBack, areaValues.other);
  //   if (comeBack && areaValues.other !== undefined) {
  //     console.log('comeBack in support spaces', comeBack, areaValues.other);
  //     setOtherArea(areaValues.other);
  //   }
  // }, [comeBack, areaValues.other]);

  useEffect(() => {
    if (areas.other !== undefined) {
      setOtherArea(areas.other);
    }
  }, [areas.other]);

  const handleOtherAreaChange = (event) => {
    const value = Math.max(0, Number(event.target.value)); // Prevent negative values
    setOtherArea(value);
    setIsOtherSelected(true);
    updateAreas('other', value); // Update the area in the parent component
  };

  return (
    <div className="section">
      <h3 className="section-heading">Support Spaces</h3>
      <div className="support-spaces-grid grid">
        {["ups", "bms", "server", "executiveWashroom", "other"].map((type) => (
          <div key={type} className="workspace">
            <div className="workspace-image-container">
              <img src={`/images/${type}.png`} alt={`${type} Room`} className="workspace-image" />
              <div className="workspace-description">{supportSpaceDescriptions[type]}</div>
            </div>
            <div className="control-btn-box">
              {type === 'other' ? (
                <div className="other-area-input">
                  <label>
                    Other Area (sq ft):
                    <input
                      type="number"
                      value={otherArea ? otherArea : ''}
                      onChange={handleOtherAreaChange}
                      min="0" // Prevent negative inputs
                      placeholder='Enter Area'
                    />
                  </label>
                  <div className="value-display">
                    Other Room: <span>1</span> (Size: {otherArea} sq ft)
                  </div>
                </div>
              ) : (
                <>
                  <Counter
                    value={areas[type] || 0}
                    onIncrement={() => handleIncrement(type)}
                    onDecrement={() => handleDecrement(type)}
                    onChange={(value) => handleInputChange(type, value)}
                  />
                  <div className="value-display">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Room: <span>{areas[type] || 0}</span>
                    <Tooltip text={`Size: ${sizeArea[type]} sq ft`}>
                      <InfoIcon />
                    </Tooltip>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SupportSpaces;