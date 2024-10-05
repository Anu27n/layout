import React, { useState } from "react";
import AreaInput from "./AreaInput";
import OpenWorkspaces from "./OpenWorkspaces";
import Cabins from "./Cabins";
import SupportSpaces from "./SupportSpaces";
import PublicSpaces from "./PublicSpaces";
import MeetingRooms from "./MeetingRooms";
import { Tooltip } from "react-tooltip";
import Treemap from "./Treemap";
import Modal from "./Modal"; // Ensure Modal is imported correctly
import Card from "./Card";   // Ensure Card is imported correctly
import "./styles.css"; // Ensure this path is correct
import "./fixes.css";  // Ensure this path is correct

const initialAreaValues = {
  linear: 20,
  lType: 34,
  md: 120,
  manager: 80,
  small: 80,
  ups: 90,
  bms: 90,
  server: 40,
  reception: 160,
  lounge: 150,
  sales: 80,
  phoneBooth: 25,
  discussionRoom: 380,
  interviewRoom: 100,
  conferenceRoom: 250,
  boardRoom: 325,
  meetingRoom: 100,
  meetingRoomLarge: 300,
  hrRoom: 80,
  financeRoom: 100,
  breakoutRoom: 80, // Added breakoutRoom
};

const initialAreas = {
  linear: 0,
  lType: 0,
  md: 0,
  manager: 0,
  small: 0,
  ups: 0,
  bms: 0,
  server: 0,
  reception: 0,
  lounge: 0,
  sales: 0,
  phoneBooth: 0,
  discussionRoom: 0,
  interviewRoom: 0,
  conferenceRoom: 0,
  boardRoom: 0,
  meetingRoom: 0,
  meetingRoomLarge: 0,
  hrRoom: 0,
  financeRoom: 0,
  breakoutRoom: 0, // Added breakoutRoom
};

const MAX_AREA = 25000;
const MIN_AREA = 1500;

const App = () => {
  const [totalArea, setTotalArea] = useState(0);
  const [areas, setAreas] = useState(initialAreas);
  const [areaValues, setAreaValues] = useState(initialAreaValues);
  const [variant, setVariant] = useState("medium");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility control

  const updateAreas = (type, value) => {
    if (value < 0) {
      alert("Negative values are not allowed");
      return;
    }

    const newAreas = {
      ...areas,
      [type]: value,
    };
    const builtArea = Object.keys(newAreas).reduce(
      (acc, key) => acc + newAreas[key] * areaValues[key],
      0
    );

    // Check if built area exceeds total available area
    if (builtArea <= totalArea) {
      setAreas(newAreas);
      setError(false);
      setShowModal(false); // Hide modal when within the limit
    } else {
      console.log("Built area exceeds the available space, showing modal");
      setError(true); // Trigger error when area exceeds the limit
      setShowModal(true); // Show modal if limit is exceeded
    }
  };

  const handleSetTotalArea = (value) => {
    if (value < 0) {
      alert("Negative values are not allowed");
      return;
    }

    if (value >= MIN_AREA && value <= MAX_AREA) {
      setTotalArea(value);
      setError(false);
      setShowModal(false); // Hide modal if within valid area range
    } else if (value > MAX_AREA) {
      console.log("Total area exceeds the max limit, showing modal");
      setTotalArea(value); // Set the area even if it's beyond the limit
      setError(true);      // Trigger error due to exceeding max limit
      setShowModal(true);  // Show modal if area exceeds max limit
    } else {
      setError(true);      // Trigger error for invalid area (too small)
      setShowModal(true);  // Show modal for invalid area
    }
  };

  const resetAll = () => {
    setTotalArea(0);
    setAreas(initialAreas);
    setError(false);
    setShowModal(false); // Hide modal on reset
  };

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    const newAreaValues = { ...areaValues };
    switch (newVariant) {
      case "large":
        newAreaValues.linear = 24;
        break;
      case "xl":
        newAreaValues.linear = 29;
        break;
      case "medium":
      default:
        newAreaValues.linear = 20;
        break;
    }
    setAreaValues(newAreaValues);
  };

  const builtArea = Object.keys(areas).reduce(
    (acc, key) => acc + areas[key] * areaValues[key],
    0
  );
  const availableArea = totalArea - builtArea;

  const handleGenerateBOQ = () => {
    window.location.href = "https://lucky-kataifi-065416.netlify.app/";
  };

  return (
    <div className="container">
      <AreaInput
        setTotalArea={handleSetTotalArea}
        builtArea={builtArea}
        availableArea={availableArea}
        resetAll={resetAll}
      />
      <div className="--content">
        <Treemap
          totalArea={totalArea}
          builtArea={builtArea}
          availableArea={availableArea}
          areas={areas}
          areaValues={areaValues}
        />
        <div className="--sections">
          <OpenWorkspaces
            areas={areas}
            updateAreas={updateAreas}
            variant={variant}
            onVariantChange={handleVariantChange}
          />
          <Cabins areas={areas} updateAreas={updateAreas} />
          <MeetingRooms areas={areas} updateAreas={updateAreas} />
          <PublicSpaces areas={areas} updateAreas={updateAreas} />
          <SupportSpaces areas={areas} updateAreas={updateAreas} />
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Card /> {/* Ensure this Card component is being displayed properly */}
        </Modal>
      )}
      {error && (
        <div className="error">
          🚨 Oops! The area exceeded the allowed limits. Please check your input and try again!
        </div>
      )}
      <Tooltip />
      <button className="generate-boq-button" onClick={handleGenerateBOQ}>
        Generate BOQ
        <svg className="star-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
        <svg className="star-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
        <svg className="star-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
        <svg className="star-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
        <svg className="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
        <svg className="star-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
      </button>
    </div>
  );
};

export default App;