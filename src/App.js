import React, { useState } from "react";
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
import { supabase } from './supabaseClient';

const initialAreaValues = {
  linear: 20,
  lType: 28,
  md: 140,
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
};

const MAX_AREA = 25000;
const MIN_AREA = 1500;

const App = () => {
  const [totalArea, setTotalArea] = useState(0);
  const [areas, setAreas] = useState(initialAreas);
  const [areaValues, setAreaValues] = useState(initialAreaValues);
  const [variant, setVariant] = useState("medium");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalData, setFinalData] = useState(null);

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
    if (value < 0) {
      alert("Negative values are not allowed");
      return;
    }

    if (value >= MIN_AREA && value <= MAX_AREA) {
      setTotalArea(value);
      setError(false);
      setShowModal(false);
    } else {
      setError(true);
      setShowModal(true);
    }
  };

  const resetAll = () => {
    setTotalArea(0);
    setAreas(initialAreas);
    setError(false);
    setShowModal(false);
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

  const handleSave = async () => {
    setFinalData(areas); // Store the data in finalData

    try {
      const { data, error } = await supabase
        .from('areas')
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
        }]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const builtArea = Object.keys(areas).reduce(
    (acc, key) => acc + areas[key] * areaValues[key],
    0
  );
  const availableArea = totalArea - builtArea;

  const handleGenerateBOQ = () => {
    alert("Generate BOQ button clicked!");
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
          <OpenWorkspaces areas={areas} updateAreas={updateAreas} variant={variant} onVariantChange={handleVariantChange} />
          <Cabins areas={areas} updateAreas={updateAreas} />
          <MeetingRooms areas={areas} updateAreas={updateAreas} />
          <PublicSpaces areas={areas} updateAreas={updateAreas} />
          <SupportSpaces areas={areas} updateAreas={updateAreas} />
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Card />
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
      </button>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default App;
