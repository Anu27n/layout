import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const AreaInput = ({ setTotalArea, builtArea, availableArea, resetAll }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(false); // Reset error state on input change
  };

  const handleSubmit = () => {
    const area = parseInt(inputValue, 10);
    if (!isNaN(area)) {
      if (area >= 1500 && area <= 25000) {
        setTotalArea(area);
        setError(false);
      } else {
        setError(true); // Set error state if area is out of range
      }
    } else {
      setError(true); // Set error state if input is invalid
    }
  };

  const handleReset = () => {
    setInputValue('');
    setError(false);
    resetAll(); // Call the resetAll function passed from the parent component
  };

  return (
    <div className="area-input">
      <div className="input-container">
        <FontAwesomeIcon 
          icon={faCalculator} 
          className="calculator-icon" 
          title="Calculator" 
          beatFade 
          style={{ color: "#FFD43B" }} 
        />
        <input 
          type="number" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Enter total area (sq ft)"
          title="Set the area value here"
          className={`set-area-input ${error ? 'error' : ''}`}
          aria-label="Total Area Input"
          data-tip="Enter the total area in square feet"
        />
        {error && (
          <div className="error-message" aria-live="polite">
            <span className="warning-icon">⚠️</span>
            Invalid area value. Must be between 1500 and 25000 square feet.
          </div>
        )}
      </div>
      <div className="button-container">
        <button 
          onClick={handleSubmit} 
          title="Click to set the area"
          aria-label="Set Area Button"
          data-tip="Click to set the total area"
          className="set-area-button"
        >
          <div className="bgContainer">
            <span>Set Area</span>
          </div>
          <div className="arrowContainer">
            {/* Add your SVG or arrow icon here */}
          </div>
        </button>
        <button 
          onClick={handleReset} 
          title="Click to reset the area input"
          aria-label="Reset Area Button"
          data-tip="Click to reset the area input"
          className="reset-btn"
        >
          Reset
        </button>
      </div>
      <div className="flexbox-container">
        <div className="flexbox-item available">
          Available Space: {availableArea} sq ft
        </div>
        <div className="flexbox-item built">
          Built Space: {builtArea} sq ft
        </div>
      </div>
      <Tooltip />
    </div>
  );
};

export default AreaInput;
