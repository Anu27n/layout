import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './styles.css';

const AreaInput = ({ setTotalArea, builtArea, availableArea, resetAll }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [isSquareFeet, setIsSquareFeet] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(false); // Reset error state on input change
  };

  const handleSubmit = () => {
    const area = parseInt(inputValue, 10);
    if (!isNaN(area)) {
      const convertedArea = isSquareFeet ? area : area / 144; // Convert inches to square feet
      if (convertedArea >= 1500 && convertedArea <= 25000) {
        setTotalArea(convertedArea);
        setError(false);
      } else {
        setError(true); // Set error state if area is out of range
      }
    } else {
      setError(true); // Set error state if input is invalid
    }
  };

  const toggleUnit = () => {
    setIsSquareFeet(!isSquareFeet);
  };

  const handleReset = () => {
    setInputValue('');
    setError(false);
    resetAll(); // Call the resetAll function passed from the parent component
  };

  return (
    <div className="area-input">
      <div className="input-container">
        <input 
          type="number" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder={`Enter total area (${isSquareFeet ? 'sq ft' : 'sq in'})`}
          title="Set the area value here"
          className={`set-area-input ${error ? 'error' : ''}`}
          aria-label="Total Area Input"
          data-tip={`Enter the total area in ${isSquareFeet ? 'square feet' : 'square inches'}`}
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
          className="control-btn"
        >
          Set Area
        </button>
        <button 
          onClick={toggleUnit} 
          title="Toggle between square feet and square inches"
          aria-label="Toggle Unit Button"
          data-tip="Click to toggle between square feet and square inches"
          className="toggle-unit-button"
        >
          {isSquareFeet ? 'Switch to Square Inches' : 'Switch to Square Feet'}
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