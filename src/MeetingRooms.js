import React from 'react';
import Counter from './Counter'; // Ensure the correct path to Counter.js
import './styles.css'; // Import the updated CSS file

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

const MeetingRooms = ({ areas, updateAreas }) => {
  const handleIncrement = (type) => {
    const newValue = (areas[type] || 0) + 1;
    updateAreas(type, newValue);
  };

  const handleDecrement = (type) => {
    const newValue = (areas[type] || 0) - 1;
    if (newValue >= 0) {
      updateAreas(type, newValue);
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  const handleInputChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 0) {
      updateAreas(type, parsedValue);
    } else {
      //alert("Negative values are not allowed.");
    }
  };

  return (
    <div className="section">
      <h3 className="section-heading">Meeting Rooms</h3>
      <div className="meeting-rooms-grid">
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
                onIncrement={() => handleIncrement(type)}
                onDecrement={() => handleDecrement(type)}
                onChange={(value) => handleInputChange(type, value)}
              />
              <div className="value-display">
                {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}: <span>{areas[type] || 0}</span>
              </div>
              {SEATS_PER_ROOM[type] > 0 && (
                <div className="seats-description">
                  <strong>1 {type.replace(/([A-Z])/g, ' $1').toLowerCase()} = {SEATS_PER_ROOM[type]} pax</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingRooms;