import React from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import './styles.css'; // Import the updated CSS file
import Tooltip from './ToolTip';
import InteractiveInputSlider from './InteractiveInputSlider';
import { InfoIcon } from 'lucide-react';

const workspaceDescriptions = {
  md: "This is the MD's cabin, designed for maximum comfort and productivity.",
  manager: "This is the Manager's cabin, equipped with all necessary amenities.",
  small: "This is a small cabin, suitable for individual work.",
};

const Cabins = ({ areas, updateAreas, mdCabinSize, setMdCabinSize, smallCabinConfig, totalArea, builtArea, initialAreaValues, managerCabinSize, setManagerCabinSize }) => {

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

  return (
    <div className="section">
      <h3 className="section-heading">Cabins</h3>
      <div className="cabins-grid grid">
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

                {type === "manager" && (
                  <div className='seats-description'>
                    {/* <Tooltip text={`Size: 80 sq ft`}>
                      <InfoIcon />
                    </Tooltip> */}
                    <InteractiveInputSlider
                      name={"Manager Cabin Size"}
                      value={managerCabinSize}
                      cabinSize={managerCabinSize}
                      setCabinSize={setManagerCabinSize}
                      onChange={setManagerCabinSize}
                      min2={50} max2={180} step2={5}
                      totalArea={totalArea}
                      builtArea={builtArea}
                      type={type}
                      initialAreaValues={initialAreaValues}
                    />
                  </div>
                )}
                {type === "small" && (
                  <div className="seats-description">
                    {/* <strong>1 small cabin = {areas["small"] * 4 + smallCabinCount} pax</strong> */}
                    <Tooltip text={`Size: ${smallCabinConfig.roomSize} sq ft \nCabin: ${4 + smallCabinConfig.seatCount} seats`} >
                      <InfoIcon />
                    </Tooltip>
                    <InteractiveInputSlider
                      name={"Add. Seat Count"}
                      value={smallCabinConfig.seatCount}
                      onChange={smallCabinConfig.setSeatCount}
                      min2={0} max2={24} step2={2}
                      cabinSize={smallCabinConfig.roomSize}
                      setCabinSize={smallCabinConfig.setRoomSize}
                      totalArea={totalArea}
                      builtArea={builtArea}
                      type={type}
                      initialAreaValues={initialAreaValues}
                    />
                  </div>
                )}
              </div>
              {type === "md" && (
                <div className="slider-container seats-description">
                  <InteractiveInputSlider
                    name={"MD Cabin Size"}
                    value={mdCabinSize}
                    onChange={setMdCabinSize}
                    min2={120} max2={240} step2={5}
                    cabinSize={mdCabinSize}
                    setCabinSize={setMdCabinSize}
                    totalArea={totalArea}
                    builtArea={builtArea}
                    type={type}
                    initialAreaValues={initialAreaValues}
                  />
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