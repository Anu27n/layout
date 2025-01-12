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
 import LoginForm from "./LoginForm";

const initialAreaValues = {
  linear: 24,
  lType: 34,
  md: 120,
  manager: 80,
  small: 80,
  ups: 90,
  bms: 90,
  server: 40,
  reception: 80,
  lounge: 80,
  sales: 80,
  phoneBooth: 25,
  discussionRoom: 380,
  interviewRoom: 100,
  conferenceRoom: 250,
  boardRoom: 325,
  meetingRoom: 100,
  meetingRoomLarge: 120,
  hrRoom: 80,
  financeRoom: 100,
  breakoutRoom: 80,
  executiveWashroom: 60,
  videoRecordingRoom: 80,
  other: 1,
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
  executiveWashroom: 0,
  videoRecordingRoom: 0,
  other: 0,
};

const MAX_AREA = 25000;
const MIN_AREA = 1000;

const calculateReceptionArea = (totalArea) => {
  if (totalArea >= 1000 && totalArea < 3500) {
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
  if (totalArea >= 1000 && totalArea < 2500) {
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

const calculateLinear = (totalArea) => {
  if (totalArea >= 1000 && totalArea <= 25000) {
    return Math.round(totalArea * 0.40);
  } else {
    return 0;
  }
};

const calculateLType = (totalArea, areaValues) => {
  if (totalArea >= 9000 && totalArea < 12000) {
    return areaValues.lType * 5;
  } else if (totalArea >= 12000 && totalArea < 15000) {
    return areaValues.lType * 10;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return areaValues.lType * 15;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return areaValues.lType * 20;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return areaValues.lType * 25;
  } else {
    return 0;
  }
};

const calculateMd = (totalArea, areaValues) => {
  if (totalArea >= 1000 && totalArea < 6000) {
    return areaValues.md * 1;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return areaValues.md * 2;
  } else if (totalArea >= 9000 && totalArea < 12000) {
    return areaValues.md * 3;
  } else if (totalArea >= 12000 && totalArea < 15000) {
    return areaValues.md * 4;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return areaValues.md * 5;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return areaValues.md * 6;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return areaValues.md * 7;
  } else {
    return 0;
  }
};

const calculateManager = (totalArea, areaValues) => {
  if (totalArea >= 1500 && totalArea < 3000) {
    return areaValues.manager * 1;
  } else if (totalArea >= 3000 && totalArea < 6000) {
    return areaValues.manager * 2;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return areaValues.manager * 3;
  } else if (totalArea >= 9000 && totalArea < 12000) {
    return areaValues.manager * 4;
  } else if (totalArea >= 12000 && totalArea < 15000) {
    return areaValues.manager * 5;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return areaValues.manager * 6;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return areaValues.manager * 7;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return areaValues.manager * 8;
  } else {
    return 0;
  }
};

const calculateSmall = (totalArea, areaValues) => {
  if (totalArea >= 1000 && totalArea < 3000) {
    return areaValues.small * 1;
  } else if (totalArea >= 3000 && totalArea < 6000) {
    return areaValues.small * 2;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return areaValues.small * 3;
  } else if (totalArea >= 9000 && totalArea <= 25000) {
    return areaValues.small * 4;
  } else {
    return 0;
  }
};

const calculateDiscussionRoom = (totalArea, areaValues) => {
  if (totalArea >= 12000 && totalArea <= 25000) {
    return areaValues.discussionRoom * 1;
  } else {
    return 0;
  }
};

const calculateInterviewRoom = (totalArea, areaValues) => {
  if (totalArea >= 6000 && totalArea < 12000) {
    return areaValues.interviewRoom * 1;
  } else if (totalArea >= 12000 && totalArea <= 25000) {
    return areaValues.interviewRoom * 2;
  } else {
    return 0;
  }
};

const calculateConferenceRoom = (totalArea, areaValues) => {
  if (totalArea >= 9000 && totalArea < 15000) {
    return areaValues.conferenceRoom * 2;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return areaValues.conferenceRoom * 3;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return areaValues.conferenceRoom * 4;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return areaValues.conferenceRoom * 5;
  } else {
    return 0;
  }
};

const calculateBoardRoom = (totalArea, areaValues) => {
  if (totalArea >= 12000 && totalArea <= 25000) {
    return areaValues.boardRoom * 1;
  } else {
    return 0;
  }
};

const calculateMeetingRoom = (totalArea, areaValues) => {
  if (totalArea >= 1000 && totalArea < 3000) {
    return areaValues.meetingRoom * 1;
  } else if (totalArea >= 3000 && totalArea < 6000) {
    return areaValues.meetingRoom * 2;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return areaValues.meetingRoom * 3;
  } else if (totalArea >= 9000 && totalArea < 12000) {
    return areaValues.meetingRoom * 4;
  } else if (totalArea >= 12000 && totalArea <= 25000) {
    return areaValues.meetingRoom * 6;
  } else {
    return 0;
  }
};

const calculateMeetingRoomLarge = (totalArea, areaValues) => {
  if (totalArea >= 15000 && totalArea <= 25000) {
    return areaValues.meetingRoomLarge * 2;
  } else {
    return 0;
  }
};

const calculateVideoRecordingRoom = (totalArea, areaValues) => {
  if (totalArea >= 15000 && totalArea <= 25000) {
    return areaValues.videoRecordingRoom * 1;
  } else {
    return 0;
  }
};

const calculatePhoneBooth = (totalArea, areaValues) => {
  if (totalArea >= 3000 && totalArea < 9000) {
    return areaValues.phoneBooth * 2;
  } else if (totalArea >= 9000 && totalArea < 18000) {
    return areaValues.phoneBooth * 4;
  } else if (totalArea >= 18000 && totalArea <= 25000) {
    return areaValues.phoneBooth * 8;
  } else {
    return 0;
  }
};

const calculateServer = (totalArea, areaValues) => {
  if (totalArea >= 1000 && totalArea < 6000) {
    return areaValues.server * 1;
  } else if (totalArea >= 6000 && totalArea < 12000) {
    return areaValues.server * 2;
  } else if (totalArea >= 12000 && totalArea < 18000) {
    return areaValues.server * 4;
  } else if (totalArea >= 18000 && totalArea <= 25000) {
    return areaValues.server * 8;
  } else {
    return 0;
  }
};

const calculateExecutiveWashroom = (totalArea, areaValues) => {
  if (totalArea >= 9000 && totalArea <= 25000) {
    return areaValues.executiveWashroom * 2;
  } else {
    return 0;
  }
};

const App = ({ onAuthorize }) => {
  const [totalArea, setTotalArea] = useState(0);
  const [builtArea, setBuiltArea] = useState(0);
  const [availableArea, setAvailableArea] = useState(0);
  const [areas, setAreas] = useState(initialAreas);
  const [areaValues, setAreaValues] = useState(initialAreaValues);
  const [variant, setVariant] = useState("large");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mdCabinSize, setMdCabinSize] = useState(areaValues.md);
  const [breakoutRoomSize, setBreakoutRoomSize] = useState(areaValues.breakoutRoom);
  const [videoRecordingRoomSize, setVideoRecordingRoomSize] = useState(areaValues.videoRecordingRoom);
  const [smallCabinSize, setSmallCabinSize] = useState(areaValues.small);
  const [hrRoomSize, setHrRoomSize] = useState(areaValues.hrRoom);
  const [salesRoomSize, setSalesRoomSize] = useState(areaValues.sales);
  const [financeRoomSize, setFinanceRoomSize] = useState(areaValues.financeRoom);
  const [smallCabinSeatCount, setSmallCabinSeatCount] = useState(0);
  const [hrRoomSeatCount, setHrRoomSeatCount] = useState(0);
  const [salesSeatCount, setSalesSeatCount] = useState(0);
  const [financeRoomSeatCount, setFinanceRoomSeatCount] = useState(0);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [managerCabinSize, setManagerCabinSize] = useState(areaValues.manager);
  const [receptionSize, setReceptionSize] = useState(areaValues.reception);
  const [loungeSize, setLoungeSize] = useState(areaValues.lounge)
  const [conferenceRoomSize, setConferenceRoomSize] = useState(areaValues.conferenceRoom);
  const [boardRoomSize, setBoardRoomSize] = useState(areaValues.boardRoom);
  // const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const linear = calculateLinear(totalArea);
    const lType = calculateLType(totalArea, areaValues);
    const md = calculateMd(totalArea, areaValues);
    const manager = calculateManager(totalArea, areaValues);
    const small = calculateSmall(totalArea, areaValues);
    const discussionRoom = calculateDiscussionRoom(totalArea, areaValues);
    const interviewRoom = calculateInterviewRoom(totalArea, areaValues);
    const conferenceRoom = calculateConferenceRoom(totalArea, areaValues);
    const boardRoom = calculateBoardRoom(totalArea, areaValues);
    const meetingRoom = calculateMeetingRoom(totalArea, areaValues);
    const meetingRoomLarge = calculateMeetingRoomLarge(totalArea, areaValues);
    const videoRecordingRoom = calculateVideoRecordingRoom(totalArea, areaValues);
    const phoneBooth = calculatePhoneBooth(totalArea, areaValues);
    const server = calculateServer(totalArea, areaValues);
    const executiveWashroom = calculateExecutiveWashroom(totalArea, areaValues);
    const receptionArea = calculateReceptionArea(totalArea);
    const loungeArea = calculateLoungeArea(totalArea);
    const otherArea = 0;

    setAreas((prevAreas) => ({
      ...prevAreas,
      linear: Math.round(linear / areaValues.linear),
      lType: lType / areaValues.lType,
      md: Math.round(md / areaValues.md),
      manager: manager / areaValues.manager,
      small: small / areaValues.small,
      discussionRoom: discussionRoom / areaValues.discussionRoom,
      interviewRoom: interviewRoom / areaValues.interviewRoom,
      conferenceRoom: conferenceRoom / areaValues.conferenceRoom,
      boardRoom: boardRoom / areaValues.boardRoom,
      meetingRoom: meetingRoom / areaValues.meetingRoom,
      meetingRoomLarge: meetingRoomLarge / areaValues.meetingRoomLarge,
      videoRecordingRoom: videoRecordingRoom / areaValues.videoRecordingRoom,
      phoneBooth: phoneBooth / areaValues.phoneBooth,
      server: server / areaValues.server,
      executiveWashroom: executiveWashroom / areaValues.executiveWashroom,
      reception: Math.round(receptionArea / areaValues.reception),
      lounge: Math.round(loungeArea / areaValues.lounge),
      other: otherArea / areaValues.other,
    }));
  }, [totalArea,areaValues]);

  const [errorMessage, setErrorMessage] = useState("");

  const setErrorMessageHandler = (message) => {
    setError(true);
    setShowModal(true);
    setErrorMessage(message);
  };

  // Calculate builtArea and set it to state
  useEffect(() => {
    const calculatedBuiltArea = Object.keys(areas).reduce(
      (acc, key) => acc + areas[key] * areaValues[key],
      0
    );
    setBuiltArea(calculatedBuiltArea);
  }, [areas, areaValues]);

  // Calculate availableArea based on totalArea and builtArea
  useEffect(() => {
    setAvailableArea(totalArea - builtArea);
  }, [totalArea, builtArea]);

  const updateAreas = (type, value) => {
    if (!totalArea) {
      setErrorMessageHandler(
        "The input box for total area cannot be left empty.\n" +
        "Please fill in the total area in square feet before making any changes."
      );
      return;
    }

    const newAreas = {
      ...areas,
      [type]: value
    };

    const calculatedBuiltArea = Object.keys(newAreas).reduce(
      (acc, key) => acc + newAreas[key] * areaValues[key],
      0
    );

    const freeSpace = totalArea * 0.05; // 5% of totalArea
    const usableArea = totalArea - freeSpace; // Area available for building

    if (calculatedBuiltArea <= usableArea) {
      setBuiltArea(calculatedBuiltArea); // Only update builtArea and areas if valid
      setAreas(newAreas);
      setError(false);
      setShowModal(false);
    } else {
      console.log("Built area exceeds the available space, showing modal");
      // setError(true);
      // setShowModal(true);
      if (calculatedBuiltArea <= usableArea) {
        setBuiltArea(calculatedBuiltArea); // Only update builtArea and areas if valid
        setAreas(newAreas);
        setError(false);
        setShowModal(false);
      } else {
        console.log("Built area exceeds the available space, showing modal");
        // setError(true);
        // setShowModal(true);
        setErrorMessageHandler(
          "The built area exceeds the available usable space.\n" +
          "To resolve this, either increase the total area or adjust the number of rooms to ensure the built area fits within the usable space."
        );
      }
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
      // setError(true);      // Trigger error due to exceeding max limit
      // setShowModal(true);  // Show modal if area exceeds max limit
      setErrorMessageHandler(
        "The total area entered is below the minimum required limit.\n" +
        "Please provide a value that meets the minimum space requirements."
      );
    } else {
      // setError(true);
      // setShowModal(true);
      setErrorMessageHandler(
        "The total area entered is below the minimum required limit.\n" +
        "Please provide a value that meets the minimum space requirements."
      );
    }
  };

  const resetAll = () => {
    setTotalArea(0);
    setSmallCabinSeatCount(0);
    setHrRoomSeatCount(0);
    setSalesSeatCount(0);
    setFinanceRoomSeatCount(0);
    setAreas(initialAreas);
    setError(false);
    setShowModal(false); // Hide modal on reset
  };

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    const newAreaValues = { ...areaValues };
    switch (newVariant) {
      case "medium":
        newAreaValues.linear = 20;
        break;
      case "xl":
        newAreaValues.linear = 29;
        break;
      case "large":
      default:
        newAreaValues.linear = 24;
        break;
    }
    setAreaValues(newAreaValues);
  };

  const handleRoomAreaChange = (roomType, setRoomSize) => (newCabinSize) => {
    setRoomSize(newCabinSize);
    setAreaValues((prevAreaValues) => ({
      ...prevAreaValues,
      [roomType]: newCabinSize,
    }));
  };

  const handleMdCabinAreaChange = handleRoomAreaChange("md", setMdCabinSize);
  const handleSmallCabinAreaChange = handleRoomAreaChange("small", setSmallCabinSize);
  const handleHrRoomAreaChange = handleRoomAreaChange("hrRoom", setHrRoomSize);
  const handleSalesRoomAreaChange = handleRoomAreaChange("sales", setSalesRoomSize);
  const handleFinanceRoomAreaChange = handleRoomAreaChange("financeRoom", setFinanceRoomSize);
  const handleBreakoutRoomAreaChange = handleRoomAreaChange("breakoutRoom", setBreakoutRoomSize);
  const handleVideoRecordingRoomAreaChange = handleRoomAreaChange("videoRecordingRoom", setVideoRecordingRoomSize);
  const handleConferenceRoomAreaChange = handleRoomAreaChange("conferenceRoom", setConferenceRoomSize);
  const handleBoardRoomAreaChange = handleRoomAreaChange("boardRoom", setBoardRoomSize);
  const handleManagerCabinSizeChange = handleRoomAreaChange("manager", setManagerCabinSize);
  const handleReceptionSizeChange = handleRoomAreaChange("reception", setReceptionSize);
  const handleLoungeSizeChange = handleRoomAreaChange("lounge", setLoungeSize);

  const handleSeatCountChange = (setter) => (newCount) => {
    setter(newCount);
  };

  const handleSmallCabinSeatCountChange = handleSeatCountChange(setSmallCabinSeatCount);
  const handleHrRoomSeatCountChange = handleSeatCountChange(setHrRoomSeatCount);
  const handleSalesRoomSeatCountChange = handleSeatCountChange(setSalesSeatCount);
  const handleFinanceRoomSeatCountChange = handleSeatCountChange(setFinanceRoomSeatCount);

  const hrRoomConfig = {
    seatCount: hrRoomSeatCount,
    setSeatCount: handleHrRoomSeatCountChange,
    roomSize: hrRoomSize,
    setRoomSize: handleHrRoomAreaChange,
  };

  const salesRoomConfig = {
    seatCount: salesSeatCount,
    setSeatCount: handleSalesRoomSeatCountChange,
    roomSize: salesRoomSize,
    setRoomSize: handleSalesRoomAreaChange,
  };

  const financeRoomConfig = {
    seatCount: financeRoomSeatCount,
    setSeatCount: handleFinanceRoomSeatCountChange,
    roomSize: financeRoomSize,
    setRoomSize: handleFinanceRoomAreaChange,
  };

  const smallCabinConfig = {
    seatCount: smallCabinSeatCount,
    setSeatCount: handleSmallCabinSeatCountChange,
    roomSize: smallCabinSize,
    setRoomSize: handleSmallCabinAreaChange,
  };

  const areaInfo = {
    totalArea,
    builtArea,
  };

  return (

    <div className="container">
      <AreaInput
        setTotalArea={handleSetTotalArea}
        totalArea={totalArea}
        areaValues={areaValues}
        builtArea={builtArea}
        availableArea={availableArea}
        resetAll={resetAll}
        areas={areas}
        showModal={showModal}
        setShowModal={setShowModal}
        isOtherSelected={isOtherSelected}
        onAuthorize={onAuthorize}
        MAX_AREA={MAX_AREA}
        MIN_AREA={MIN_AREA}
      // setShowLoginForm={setShowLoginForm}
      />
      <div className="--content">
        <Treemap
          totalArea={totalArea}
          builtArea={builtArea}
          availableArea={availableArea}
          areas={areas}
          areaValues={areaValues}
          totalMdCabinArea={mdCabinSize}
        />
        <div className="--sections">
          <OpenWorkspaces
            areas={areas} updateAreas={updateAreas}
            variant={variant} onVariantChange={handleVariantChange}
          />
          <Cabins
            areas={areas} updateAreas={updateAreas}
            mdCabinSize={mdCabinSize} setMdCabinSize={handleMdCabinAreaChange}
            smallCabinConfig={smallCabinConfig} totalArea={totalArea}
            builtArea={builtArea} initialAreaValues={initialAreaValues}
            managerCabinSize={managerCabinSize} setManagerCabinSize={handleManagerCabinSizeChange}
          />
          <MeetingRooms areas={areas} updateAreas={updateAreas}
            hrRoomConfig={hrRoomConfig} salesRoomConfig={salesRoomConfig}
            financeRoomConfig={financeRoomConfig} areaInfo={areaInfo} initialAreaValues={initialAreaValues}
            videoRecordingRoomSize={videoRecordingRoomSize} setVideoRecordingRoomSize={handleVideoRecordingRoomAreaChange}
            conferenceRoomSize={conferenceRoomSize} setConferenceRoomSize={handleConferenceRoomAreaChange}
            boardRoomSize={boardRoomSize} setBoardRoomSize={handleBoardRoomAreaChange}
          />
          <PublicSpaces areas={areas} updateAreas={updateAreas}
            breakoutRoomSize={breakoutRoomSize} setBreakoutRoomSize={handleBreakoutRoomAreaChange}
            totalArea={totalArea} builtArea={builtArea} initialAreaValues={initialAreaValues}
            receptionSize={receptionSize} setReceptionSize={handleReceptionSizeChange}
            loungeSize={loungeSize} setLoungeSize={handleLoungeSizeChange}
          />
          <SupportSpaces areas={areas} updateAreas={updateAreas} areaValues={areaValues}
            isOtherSelected={isOtherSelected} setIsOtherSelected={setIsOtherSelected} />
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Card message={errorMessage} /> {/* Ensure this Card component is being displayed properly */}
        </Modal>
      )}
      {error && (
        <div className="error">
          🚨 Oops! The area exceeded the allowed limits. Please check your input and try again!
        </div>
      )}
      <Tooltip />
    </div>
  );
};

export default App;