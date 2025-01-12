import React from 'react';
import './InteractiveInputSlider.css';

const InteractiveInputSlider = ({ name, value, onChange, min2, max2, step2, cabinSize, setCabinSize, totalArea, builtArea, type, initialAreaValues }) => {
    const min = min2;
    const max = max2;
    const step = step2;
    const freeSpace = totalArea * 0.05; // 5% of totalArea
    const usableArea = totalArea - freeSpace; // Area available for building

    const handleIncrement = () => {
        if (value < max && totalArea > 0 && builtArea <= usableArea) {
            onChange(value + step);
            if (type === 'financeRoom') {
                setCabinSize(cabinSize + 50)
            } else if (type === 'md' || type === 'manager' || type === "reception" || type === "lounge") {
                setCabinSize(cabinSize + 5)
            } else if (type === "conferenceRoom" || type === "boardRoom") {
                setCabinSize(cabinSize + 25)
            } else {
                setCabinSize(cabinSize + 40)
            }
        }
    };

    const handleDecrement = () => {
        if (value > min && totalArea > 0 && cabinSize > initialAreaValues[type]) {
            onChange(value - step);
            if (type === 'financeRoom' || type === 'boardRoom' || type === 'conferenceRoom') {
                setCabinSize(cabinSize - 50)
            } else if (type === 'md' || type === 'manager' || type === "reception" || type === "lounge") {
                setCabinSize(cabinSize - 5)
            } else {
                setCabinSize(cabinSize - 40)
            }
        }
    };

    const handleInputChange = (event) => {
        const newValue = Number(event.target.value);
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className="interactive-slider-container seats-description">
            <label htmlFor="md-cabin-size">{name}: </label>
            <div className="md-cabin-btn">
                <button onClick={handleDecrement} className="slider-button">-</button>
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleInputChange}
                    className="slider-input"
                />
                <button onClick={handleIncrement} className="slider-button">+</button>
            </div>
            {/* <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${((value - min) / (max - min)) * 100}%` }}></div>
            </div> */}
        </div>
    );
};

export default InteractiveInputSlider;