import React from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import './styles.css'; // Import the updated CSS file
import Tooltip from './ToolTip';
import InteractiveInputSlider from './InteractiveInputSlider';
import { InfoIcon } from 'lucide-react';

const publicSpaceDescriptions = {
  reception: "This is the reception area, the first point of contact for visitors.",
  lounge: "This is the lounge, a comfortable area for informal meetings.",
  fitness: "This is the fitness area, equipped with gym facilities.",
  phoneBooth: "This is the phone booth, providing a quiet space for calls.",
  breakoutRoom: "This is the breakout room, a flexible space for small group discussions."
};

const PublicSpaces = ({ areas, updateAreas, breakoutRoomSize, setBreakoutRoomSize, totalArea, builtArea, initialAreaValues, receptionSize, setReceptionSize, loungeSize, setLoungeSize }) => {

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
      <h3 className="section-heading">Public Spaces</h3>
      <div className="public-spaces-grid grid">
        {["reception", "lounge", "phoneBooth", "breakoutRoom"].map((type) => (
          <div key={type} className="workspace">
            <div className="workspace-image-container">
              <img src={`/images/${type === 'breakoutRoom' ? 'breakout' : type}.png`} alt={`${type} Room`} className="workspace-image" />
              <div className="workspace-description">{publicSpaceDescriptions[type]}</div>
            </div>
            <div className="control-btn-box">
              <Counter
                value={Math.round(areas[type] || 0)} // Round the value before displaying
                onIncrement={() => handleIncrement(type)}
                onDecrement={() => handleDecrement(type)}
                onChange={(value) => handleInputChange(type, value)}
              />
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1)}: <span>{Math.round(areas[type] || 0)}</span> {/* Round the value before displaying */}
                {type === "reception" && (
                  <div className="slide-container" style={{ marginBottom: '20px' }}>
                    <InteractiveInputSlider
                      name={"Reception Size"}
                      value={receptionSize}
                      onChange={setReceptionSize}
                      min2={80} max2={700} step2={5}
                      cabinSize={receptionSize}
                      setCabinSize={setReceptionSize}
                      totalArea={totalArea}
                      builtArea={builtArea}
                      type={type}
                      initialAreaValues={initialAreaValues}
                    />
                  </div>
                )}
                {type === "lounge" && (
                  <div className="slide-container">
                    <InteractiveInputSlider
                      name={"Lounge Size"}
                      value={loungeSize}
                      onChange={setLoungeSize}
                      min2={80} max2={1000} step2={5}
                      cabinSize={loungeSize}
                      setCabinSize={setLoungeSize}
                      totalArea={totalArea}
                      builtArea={builtArea}
                      type={type}
                      initialAreaValues={initialAreaValues}
                    />
                  </div>
                )}

                {type === "phoneBooth" && (
                  <Tooltip text={`Size: 25 sq ft`}>
                    <InfoIcon />
                  </Tooltip>
                )}
              </div>
              {type === "breakoutRoom" && (
                <div className="slider-container seats-description">
                  <InteractiveInputSlider
                    name={"Breakout Room Size"}
                    value={breakoutRoomSize}
                    onChange={setBreakoutRoomSize}
                    min2={80} max2={160} step2={5}
                    cabinSize={breakoutRoomSize}
                    setCabinSize={setBreakoutRoomSize}
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

export default PublicSpaces;