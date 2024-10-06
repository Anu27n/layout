import React, { useState } from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import './styles.css'; // Import the updated CSS file

const publicSpaceDescriptions = {
  reception: "This is the reception area, the first point of contact for visitors.",
  lounge: "This is the lounge, a comfortable area for informal meetings.",
  fitness: "This is the fitness area, equipped with gym facilities.",
  phoneBooth: "This is the phone booth, providing a quiet space for calls.",
  breakoutRoom: "This is the breakout room, a flexible space for small group discussions."
};

const PublicSpaces = ({ areas, updateAreas }) => {
  const [description, setDescription] = useState(''); // Example usage of useState

  const handleIncrement = (type) => {
    const newValue = (areas[type] || 0) + 1;
    updateAreas(type, newValue);
    setDescription(publicSpaceDescriptions[type]); // Use setDescription
  };

  const handleDecrement = (type) => {
    const newValue = (areas[type] || 0) - 1;
    if (newValue >= 0) {
      updateAreas(type, newValue);
      setDescription(publicSpaceDescriptions[type]); // Use setDescription
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  const handleInputChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 0) {
      updateAreas(type, parsedValue);
      setDescription(publicSpaceDescriptions[type]); // Use setDescription
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  return (
    <div className="section">
      <h3 className="section-heading">Public Spaces</h3>
      <div className="public-spaces-grid">
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="description-display">
        <p>{description}</p> {/* Display the description */}
      </div>
    </div>
  );
};

export default PublicSpaces;