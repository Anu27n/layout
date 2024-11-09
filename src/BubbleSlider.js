import React from 'react';
import './BubbleSlider.css';

const BubbleSlider = ({ value, onChange }) => {
  const min = 120;
  const max = 240;
  const marks = [120, 150, 180, 210, 240];

  const handleSliderChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="bubble-slider-container">
      <div className="slider-wrapper">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          className="bubble-slider"
          style={{
            backgroundSize: `${((value - min) / (max - min)) * 100}% 100%`,
          }}
        />
        <div className="marks-container">
          {marks.map((mark) => (
            <div
              key={mark}
              className={`mark ${value === mark ? 'active' : ''}`}
              style={{
                left: `${((mark - min) / (max - min)) * 100}%`,
              }}
            >
              {mark}
            </div>
          ))}
        </div>
      </div>
      <div className="bubble-value">Current Size: {value} sq ft</div>
    </div>
  );
};

export default BubbleSlider;