import React, { useState } from 'react';
import SimpleTour from './SimpleTour';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faXmark } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import Modal from './Modal';
import Card from './Card';
import BOQ from './BOQ';

const AreaInput = ({ totalArea, setTotalArea, areaValues, builtArea, availableArea, resetAll, areas, showModal,
  setShowModal, setErrorMessage, isOtherSelected, onAuthorize, MIN_AREA, MAX_AREA, comeBack }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showBOQ, setShowBOQ] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.value.length <= 5) {
      setInputValue(e.target.value);
      setError(false); // Reset error state on input change
    }
  };

  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault(); // Prevent the default behavior
    }
  };

  const handleSubmit = () => {
    const area = parseInt(inputValue, 10);
    if (!isNaN(area)) {
      if (area >= MIN_AREA && area <= MAX_AREA) {
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

  const handleGenerateBOQ = async () => {
    if (!totalArea) {
      console.error("Please enter the total area before generating BOQ.");
      setErrorMessage("Please enter the total area before generating BOQ.")
      setShowModal(true);
      return; // Stop execution if total area is not entered
    }
    // Prepare BOQ data and open BOQ modal
    // We keep database persistence separate; here we simply show the BOQ to user
    setShowBOQ(true);
  };

  const steps = [
    {
      title: 'Enter Total Area',
      content: 'Start by entering the total area of your space in square feet. This will be used to calculate all other areas.',
    },
    {
      title: 'Space Overview',
      content: 'Monitor your available and built space in real-time as you make changes to your layout.',
    },
    {
      title: 'Generate BOQ',
      content: 'Once you\'ve configured your layout, click here to generate your Bill of Quantities.',
    },
    {
      title: 'Reset Function',
      content: 'Click the × button anytime to reset all values and start over with a fresh configuration.',
    },
  ];

  const startTour = () => {
    setShowTour(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
  };

  const handleTourSkip = () => {
    setShowTour(false);
  };

  return (
    <div className="area-input">
      {/* Help Button */}
      <button 
        onClick={startTour}
        className="help-tour-button"
        title="Start guided tour"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        ?
      </button>

      <SimpleTour
        steps={steps}
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
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
            value={comeBack ? totalArea : inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleSubmit}
            placeholder="Enter total area (sq ft)"
            title="Set the area value here"
            className={`set-area-input ${error ? 'error' : ''}`}
            aria-label="Total Area Input"
            data-tip="Enter the total area in square feet" />

          <FontAwesomeIcon
            icon={faXmark}
            className='reset-cross'
            onClick={handleReset}
            title="Click to reset the area input"
            aria-label="Reset Area Button"
            data-tip="Click to reset the area input" />
        </div>
        {error && (
          <div className="error-message" aria-live="polite">
            <span className="warning-icon">⚠️</span>
            Invalid area value. Must be between {MIN_AREA} and {MAX_AREA} square feet.
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
        <svg className="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 24">
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
      <Modal show={showBOQ} onClose={() => setShowBOQ(false)}>
        <BOQ areas={areas} areaValues={areaValues} totalArea={totalArea} onClose={() => setShowBOQ(false)} />
      </Modal>
      <Tooltip />
    </div>
  );
};

export default AreaInput;


