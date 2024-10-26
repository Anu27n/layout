import React from "react";
import styled from "styled-components";

const Radio = ({ selectedValue, onChange }) => {
  return (
    <StyledWrapper>
      <div className="radio-inputs">
        {['medium', 'large', 'xl'].map(size => (
          <label className="radio" key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedValue === size}
              onChange={onChange}
            />
            <span className="name">{size.charAt(0).toUpperCase() + size.slice(1)}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #f0f0f0; // Slightly lighter background for better visibility
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); // Enhanced shadow for depth
    padding: 0.5rem; // Increased padding for a more spacious layout
    width: 300px;
    font-size: 14px;
  }

  .radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio-inputs .radio input {
    display: none;
  }

  .radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.75rem; // Increased padding for a more clickable area
    color: rgba(51, 65, 85, 1);
    transition: all 0.2s ease-in-out; // Slightly longer transition for smoother effect
  }

  .radio-inputs .radio input:checked + .name {
    background-color: #fff;
    font-weight: bold; // Bold font for better visibility
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); // Inner shadow effect when selected
  }

  .radio-inputs .radio:hover .name {
    background-color: rgba(0, 0, 0, 0.05); // Subtle hover effect for better UX
  }
`;

export default Radio;
