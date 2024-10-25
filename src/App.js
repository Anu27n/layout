import React, { useState, useEffect } from "react";
import AreaInput from "./AreaInput";
import OpenWorkspaces from "./OpenWorkspaces";
import Cabins from "./Cabins";
import SupportSpaces from "./SupportSpaces";
import PublicSpaces from "./PublicSpaces";
import MeetingRooms from "./MeetingRooms";
import { Tooltip } from "react-tooltip";
import Treemap from "./Treemap";
import Modal from "./Modal"; 
import Card from "./Card";   
import "./styles.css"; 
import "./fixes.css";  

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
  breakoutRoom: 80, 
  executiveWashroom:60,
  videoRecordingRoom:80,
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
  breakoutRoom: 0, 
  executiveWashroom:0,
  videoRecordingRoom:0,
};

const MAX_AREA = 25000;
const MIN_AREA = 1500;

const calculateReceptionArea = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 3500) {
    return Math.round(totalArea * 0.08);
  } else if (totalArea >= 3500 && totalArea < 4500) {
    return Math.round(totalArea * 0.06);
  } else if (totalArea >= 4500 && totalArea < 5500) {
    return Math.round(totalArea * 0.05);
  } else if (totalArea >= 5500 && totalArea < 6500) {
    return Math.round(totalArea * 0.045);
  } else if (totalArea >= 6500 && totalArea < 12000) {
    return 300;
  } else if (totalArea >= 12000 && totalArea < 18000) {
    return 500;
  } else if (totalArea >= 18000 && totalArea <= 25000) {
    return 700;
  } else {
    return 0;
  }
};

const calculateLoungeArea = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 2500) {
    return Math.round(totalArea * 0.11);
  } else if (totalArea >= 2500 && totalArea < 4500) {
    return Math.round(totalArea * 0.06);
  } else if (totalArea >= 4500 && totalArea < 6500) {
    return Math.round(totalArea * 0.05);
  } else if (totalArea >= 6500 && totalArea < 8500) {
    return Math.round(totalArea * 0.045);
  } else if (totalArea >= 8500 && totalArea <= 10000) {
    return Math.round(totalArea * 0.04);
  } else if (totalArea > 10000 && totalArea <= 25000) {
    return Math.round(totalArea * 0.04);
  } else {
    return 0;
  }
};

const App = () => {
  const [totalArea, setTotalArea] = useState(0);
  const [areas, setAreas] = useState(initialAreas);
  const [areaValues, setAreaValues] = useState(initialAreaValues);
  const [variant, setVariant] = useState("medium");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mdCabinSize, setMdCabinSize] = useState(initialAreaValues.md); 
  const [totalMdCabinArea, setTotalMdCabinArea] = useState(0); // Define totalMdCabinArea

  useEffect(() => {
    const receptionArea = calculateReceptionArea(totalArea);
    const loungeArea = calculateLoungeArea(totalArea);
    setAreas((prevAreas) => ({
      ...prevAreas,
      reception: receptionArea / areaValues.reception,
      lounge: loungeArea / areaValues.lounge,
    }));
  }, [totalArea, areaValues.reception, areaValues.lounge]);

  useEffect(() => {
    setTotalMdCabinArea(mdCabinSize * areas.md);
  }, [mdCabinSize, areas.md]);

  const updateAreas = (type, value) => {
    const newAreas = {
      ...areas,
      [type]: value,
    };
    const builtArea = Object.keys(newAreas).reduce(
      (acc, key) => acc + newAreas[key] * areaValues[key],
      0
    );

    if (builtArea <= totalArea) {
      setAreas(newAreas);
      setError(false);
      setShowModal(false); 
    } else {
      console.log("Built area exceeds the available space, showing modal");
      setError(true); 
      setShowModal(true); 
    }
  };

  const handleSetTotalArea = (value) => {
    if (value >= MIN_AREA && value <= MAX_AREA) {
      setTotalArea(value);
      setError(false);
      setShowModal(false); 
    } else if (value > MAX_AREA) {
      console.log("Total area exceeds the max limit, showing modal");
      setTotalArea(value); 
      setError(true);      // Trigger error due to exceeding max limit
      setShowModal(true);  // Show modal if area exceeds max limit
    } else {
      setError(true);      
      setShowModal(true);  
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

  const handleMdCabinAreaChange = (newMdCabinSize) => {
    setMdCabinSize(newMdCabinSize);
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
          totalMdCabinArea={totalMdCabinArea} 
        />
        <div className="--sections">
          <OpenWorkspaces
            areas={areas}
            updateAreas={updateAreas}
            variant={variant}
            onVariantChange={handleVariantChange}
          />
          <Cabins
            areas={areas}
            updateAreas={updateAreas}
            mdCabinSize={mdCabinSize}
            setMdCabinSize={handleMdCabinAreaChange}
          />
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