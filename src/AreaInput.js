import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faXmark } from '@fortawesome/free-solid-svg-icons';
import { supabase } from './supabaseClient';
import './styles.css';
import Modal from './Modal';
import Card from './Card';
import './LoginForm';

const AreaInput = ({
  totalArea,
  setTotalArea,
  areaValues,
  builtArea,
  availableArea,
  resetAll,
  areas,
  setFinalData,
  showModal,
  setShowModal,
  isOtherSelected,
  setShowLoginForm
}) => {
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

  const handleGenerateBOQ = async () => {
    if (!totalArea) {
      console.error("Please enter the total area before generating BOQ.");
      setShowModal(true);
      return; // Stop execution if total area is not entered
    }

    setFinalData(areas, areaValues, totalArea); // Store the data in finalData

    try {
      // Step 1: Insert into 'quantity' and retrieve the generated 'id'
      const { data: quantityData, error: quantityError } = await supabase
        .from('quantity')
        .insert([{
          linear: areas.linear,
          ltype: areas.lType,
          md: areas.md,
          manager: areas.manager,
          small: areas.small,
          ups: areas.ups,
          bms: areas.bms,
          server: areas.server,
          reception: areas.reception,
          lounge: areas.lounge,
          sales: areas.sales,
          phonebooth: areas.phoneBooth,
          discussionroom: areas.discussionRoom,
          interviewroom: areas.interviewRoom,
          conferenceroom: areas.conferenceRoom,
          boardroom: areas.boardRoom,
          meetingroom: areas.meetingRoom,
          meetingroomlarge: areas.meetingRoomLarge,
          hrroom: areas.hrRoom,
          financeroom: areas.financeRoom,
          other: isOtherSelected ? areaValues.other : 0
        }])
        .select('id'); // Retrieve the ID generated for quantityData

      if (quantityError) {
        console.error('Error inserting data into quantity:', quantityError.message);
        return;
      }
      console.log('Data inserted into quantity successfully:', quantityData);

      // Capture the ID from the quantity insert to use in areas
      const sharedId = quantityData[0]?.id;

      if (!sharedId) {
        console.error('Shared ID not retrieved. Insert into quantity may have failed.');
        return;
      }

      // Step 2: Insert into 'areas' using the same shared ID
      const { data: areasData, error: areasError } = await supabase
        .from('areas')
        .insert([{
          id: sharedId, // Use the shared ID from quantity as the ID in areas
          quantity_id: sharedId, // Optionally set quantity_id if used as a foreign key
          linear: areaValues.linear,
          ltype: areaValues.lType,
          md: areaValues.md,
          manager: areaValues.manager,
          small: areaValues.small,
          ups: areaValues.ups,
          bms: areaValues.bms,
          server: areaValues.server,
          reception: areaValues.reception,
          lounge: areaValues.lounge,
          sales: areaValues.sales,
          phonebooth: areaValues.phoneBooth,
          discussionroom: areaValues.discussionRoom,
          interviewroom: areaValues.interviewRoom,
          conferenceroom: areaValues.conferenceRoom,
          boardroom: areaValues.boardRoom,
          meetingroom: areaValues.meetingRoom,
          meetingroomlarge: areaValues.meetingRoomLarge,
          hrroom: areaValues.hrRoom,
          financeroom: areaValues.financeRoom,
          other: areas.other,
          totalArea: totalArea,
        }]);

      if (areasError) {
        console.error('Error inserting data into areas:', areasError.message);
        return;
      }
      console.log('Data inserted into areas successfully:', areasData);
    } catch (error) {
      console.error('Error saving data:', error);
    }

    window.location.href = 'https://lucky-kataifi-065416.netlify.app/';
  };

  const handleLogin = () => {
    setShowLoginForm(true);
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