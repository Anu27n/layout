import React, { useState } from "react";
import AreaInput from "./AreaInput";
import OpenWorkspaces from "./OpenWorkspaces";
import Cabins from "./Cabins";
import SupportSpaces from "./SupportSpaces";
import PublicSpaces from "./PublicSpaces"; // Import PublicSpaces component
import MeetingRooms from "./MeetingRooms"; // Import MeetingRooms component
import { Tooltip } from "react-tooltip";
import Treemap from "./Treemap"; // Import the Treemap component
import Card from "./Card"; // Import the Card component
import Modal from "./Modal"; // Import the Modal component
import "./styles.css";
import "./fixes.css";

const initialAreaValues = {
  linear: 20, // Default to medium
  lType: 28,
  md: 140,
  manager: 80,
  small: 80,
  ups: 90,
  bms: 90,
  server: 40,
  reception: 160, // Add public spaces area values
  lounge: 150,
  fitness: 250,
  sales: 80,
  phoneBooth: 250,
  discussionRoom: 380, // Add meeting rooms area values
  interviewRoom: 100,
  conferenceRoom: 250,
  boardRoom: 325,
  meetingRoom: 100,
  meetingRoomLarge: 300,
  hrRoom: 80,
  financeRoom: 100,
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
  reception: 0, // Add public spaces initial areas
  lounge: 0,
  fitness: 0,
  sales: 0,
  phoneBooth: 0,
  discussionRoom: 0, // Add meeting rooms initial areas
  interviewRoom: 0,
  conferenceRoom: 0,
  boardRoom: 0,
  meetingRoom: 0,
  meetingRoomLarge: 0,
  hrRoom: 0,
  financeRoom: 0,
};

const MAX_AREA = 25000;
const MIN_AREA = 1500;

const App = () => {
  const [totalArea, setTotalArea] = useState(0);
  const [areas, setAreas] = useState(initialAreas);
  const [areaValues, setAreaValues] = useState(initialAreaValues);
  const [variant, setVariant] = useState("medium");
  const [error, setError] = useState(false);
  const [showCard, setShowCard] = useState(false); // State for displaying the card

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
    } else {
      alert("You have exceeded the available space!");
      setError(true);
    }
  };

  const handleSetTotalArea = (value) => {
    if (value >= MIN_AREA && value <= MAX_AREA) {
      setTotalArea(value);
      setError(false);
      setShowCard(false); // Hide card if area is within valid range
    } else if (value > MAX_AREA) {
      setTotalArea(value);
      setError(true);
      setShowCard(true); // Show card if area exceeds 25,000 sq feet
    } else {
      setError(true);
      setShowCard(false); // Hide card if area is invalid
    }
  };

  const resetAll = () => {
    setTotalArea(0);
    setAreas(initialAreas);
    setError(false);
    setShowCard(false); // Hide card on reset
  };

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    const newAreaValues = { ...areaValues };
    switch (newVariant) {
      case "large":
        newAreaValues.linear = 25;
        break;
      case "xl":
        newAreaValues.linear = 30;
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

  return (
    <div className="container">
      <AreaInput
        setTotalArea={handleSetTotalArea}
        builtArea={builtArea}
        availableArea={availableArea}
        resetAll={resetAll}
      />
      <div className=" --content">
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
          <SupportSpaces areas={areas} updateAreas={updateAreas} />
          <PublicSpaces areas={areas} updateAreas={updateAreas} />{" "}
          {/* Include PublicSpaces component */}
          <MeetingRooms areas={areas} updateAreas={updateAreas} />{" "}
          {/* Include MeetingRooms component */}
        </div>
      </div>
      <Modal show={showCard} onClose={() => setShowCard(false)}>
        <Card />
      </Modal>
      {error && (
        <div className="error">
          Total area must be between {MIN_AREA} and {MAX_AREA} square feet.
        </div>
      )}
      <Tooltip />
    </div>
  );
};

export default App;