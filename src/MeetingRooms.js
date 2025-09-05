import React, { useState } from 'react';
import SimpleTour from './SimpleTour';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import './styles.css'; // Import the updated CSS file
import Tooltip from './ToolTip';
import InteractiveInputSlider from './InteractiveInputSlider';
import { InfoIcon } from 'lucide-react';

const MeetingRooms = ({ areas, updateAreas, hrRoomConfig, salesRoomConfig, financeRoomConfig, areaInfo, initialAreaValues,
  videoRecordingRoomSize, setVideoRecordingRoomSize, conferenceRoomSize, setConferenceRoomSize, boardRoomSize, setBoardRoomSize }) => {
  const { totalArea, builtArea } = areaInfo;
  const [showTour, setShowTour] = useState(false);

  const handleChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 0) updateAreas(type, parsedValue);
  };

  const renderSlider = ({ type, name, value, onChange, min, max, step }) => (
    <InteractiveInputSlider
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      min2={min}
      max2={max}
      step2={step}
      cabinSize={value}
      setCabinSize={onChange}
      totalArea={totalArea}
      builtArea={builtArea}
      initialAreaValues={initialAreaValues}
    />
  );

  const renderRoomSlider = (type, config) => (
    <div className="seats-description">
      <Tooltip text={`Size: ${config.roomSize} sq ft \nCabin: ${4 + config.seatCount} seats`}>
        <InfoIcon />
      </Tooltip>
      <InteractiveInputSlider
        name={"Add. Seat Count"}
        value={config.seatCount}
        onChange={config.setSeatCount}
        min2={0}
        max2={24}
        step2={2}
        cabinSize={config.roomSize}
        setCabinSize={config.setRoomSize}
        totalArea={totalArea}
        builtArea={builtArea}
        type={type}
        initialAreaValues={initialAreaValues}
      />
    </div>
  );

  const steps = [
    {
      title: 'Room Images',
      content: 'Each meeting room type is displayed with its visual representation. These help you understand the layout and capacity.',
    },
    {
      title: 'Room Controls',
      content: 'Use these intuitive controls to add or remove meeting rooms. The + and - buttons make it easy to adjust quantities.',
    },
    {
      title: 'Room Details',
      content: 'This shows the seating capacity and room size. You can adjust additional seats for flexible configurations.',
    },
    {
      title: 'Current Count',
      content: 'Monitor the current number of rooms and their total area allocation in real-time.',
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
    <div className="section">
      {/* Help Button */}
      <button 
        onClick={startTour}
        className="help-tour-button"
        title="Start guided tour"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(40,167,69,0.3)',
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
      <h3 className="section-heading">Meeting Rooms</h3>
      <div className="meeting-rooms-grid grid">
        {[
          "discussionRoom",
          "interviewRoom",
          "conferenceRoom",
          "boardRoom",
          "meetingRoom",
          "meetingRoomLarge",
          "hrRoom",
          "financeRoom",
          "sales",
          "videoRecordingRoom"
        ].map((type) => (
          <div key={type} className="workspace">
            <div className="workspace-image-container">
              <img src={`/images/${type}.png`} alt={`${type} Room`} className="workspace-image" />
              <div className="workspace-description">{meetingRoomDescriptions[type]}</div>
            </div>
            <div className="control-btn-box">
              <Counter
                value={areas[type] || 0}
                onIncrement={() => handleChange(type, (areas[type] || 0) + 1)}
                onDecrement={() => handleChange(type, (areas[type] || 0) - 1)}
                onChange={(value) => handleChange(type, value)}
              />
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}: <span>{areas[type] || 0}</span>

                {SEATS_PER_ROOM[type] > 0 && (
                  <div className="seats-description">
                    <strong>1 {type.replace(/([A-Z])/g, ' $1').toLowerCase()} = {SEATS_PER_ROOM[type]} pax</strong>
                  </div>
                )}
                {type !== "videoRecordingRoom" && type !== "boardRoom" && type !== "conferenceRoom" && (
                  <Tooltip text={`Size: ${sizeArea[type]} sq ft`}>
                    <InfoIcon />
                  </Tooltip>
                )}
                {type === "hrRoom" && renderRoomSlider(type, hrRoomConfig)}
                {type === "sales" && renderRoomSlider(type, salesRoomConfig)}
                {type === "financeRoom" && renderRoomSlider(type, financeRoomConfig)}

                {type === "videoRecordingRoom" && renderSlider({
                  type, name: "Video Recording Room Size", value: videoRecordingRoomSize, onChange: setVideoRecordingRoomSize, min: 80, max: 160, step: 5,
                })}
                {type === "conferenceRoom" && renderSlider({
                  type, name: "Conference Room Size", value: conferenceRoomSize, onChange: setConferenceRoomSize, min: 250, max: 500, step: 5,
                })}
                {type === "boardRoom" && renderSlider({
                  type, name: "Board Room Size", value: boardRoomSize, onChange: setBoardRoomSize, min: 325, max: 650, step: 5,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meetingRoomDescriptions = {
  discussionRoom: "This is the discussion room, ideal for small group discussions.",
  interviewRoom: "This is the interview room, designed for conducting interviews.",
  conferenceRoom: "This is the conference room, suitable for large meetings.",
  boardRoom: "This is the board room, equipped for executive meetings.",
  meetingRoom: "This is the meeting room, perfect for team meetings.",
  meetingRoomLarge: "This is the large meeting room, accommodating larger groups.",
  hrRoom: "This is the HR room, designated for HR activities.",
  financeRoom: "This is the finance room, used for financial discussions.",
  sales: "This is the sales area, designed for sales team activities.",
  videoRecordingRoom: "This is the video recording room, designed for creating professional video content."
};

const SEATS_PER_ROOM = {
  discussionRoom: 18,
  interviewRoom: 4,
  conferenceRoom: 10,
  boardRoom: 16,
  meetingRoom: 0, // Assuming no seats defined for meetingRoom
  meetingRoomLarge: 0, // Assuming no seats defined for meetingRoomLarge
  hrRoom: 0, // Assuming no seats defined for hrRoom
  financeRoom: 0, // Assuming no seats defined for financeRoom
  sales: 0, // Assuming no seats defined for sales
  videoRecordingRoom: 0 // Assuming no seats defined for videoRecordingRoom
};

const sizeArea = {
  discussionRoom: 380,
  interviewRoom: 100,
  conferenceRoom: 250,
  boardRoom: 325,
  meetingRoom: 100,
  meetingRoomLarge: 120,
  hrRoom: 80,
  financeRoom: 100,
  sales: 80,
  videoRecordingRoom: 80
};

export default MeetingRooms;