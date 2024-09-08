import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './styles.css';

const AreaInput = ({ setTotalArea }) => {
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
      setTotalArea(convertedArea);
    } else {
      setError(true); // Set error state if input is invalid
    }
  };

  const toggleUnit = () => {
    setIsSquareFeet(!isSquareFeet);
  };

  return (
    <div className="area-input">
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
      </div>
      {error && (
        <div className="error-message" aria-live="polite">
          <span className="warning-icon">⚠️</span>
          Invalid area value
        </div>
      )}
      <Tooltip />
    </div>
  );
};

export default AreaInput;