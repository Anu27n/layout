import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faXmark } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import Modal from './Modal';
import Card from './Card';

const AreaInput = ({ totalArea, setTotalArea, areaValues, builtArea, availableArea, resetAll, areas, showModal, setShowModal, isOtherSelected, setShowLoginForm }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.value.length <= 5) {
      setInputValue(e.target.value);
      setError(false); // Reset error state on input change
    }
  };

  const handleSubmit = () => {
    const area = parseInt(inputValue, 10);
    if (!isNaN(area)) {
      if (area >= 1500 && area <= 25000) {
        setTotalArea(area);
        setError(false);
      } else if (area === 0 || area === undefined) {
        setError(false);
        resetAll();
      } else {
        setError(true); // Set error state if area is out of range
        resetAll();
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

  const handleGenerateBOQ = () => {
    setShowLoginForm(true); // Show the login form
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
        <div className='input-wrapper'>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleSubmit}
            placeholder="Enter total area (sq ft)"
            title="Set the area value here"
            className={`set-area-input ${error ? 'error' : ''}`}
            aria-label="Total Area Input"
            data-tip="Enter the total area in square feet"
          />
          <FontAwesomeIcon
            icon={faXmark}
            className='reset-cross'
            onClick={handleReset}
            title="Click to reset the area input"
            aria-label="Reset Area Button"
            data-tip="Click to reset the area input"
          />
        </div>
        {error && (
          <div className="error-message" aria-live="polite">
            <span className="warning-icon">⚠️</span>
            Invalid area value. Must be between 1500 and 25000 square feet.
          </div>
        )}
      </div>

      <button className="generate-boq-button" onClick={handleGenerateBOQ}>
        Generate BOQ
        <svg className="star-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
      </button>
      <div className="flexbox-container">
        <div className="flexbox-item available">
          Available Space: {availableArea} sq ft
        </div>
        <div className="flexbox-item built">
          Built Space: {builtArea} sq ft
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Card /> {/* Ensure this Card component is displayed properly */}
      </Modal>
      <Tooltip />
    </div>
  );
};

export default AreaInput;