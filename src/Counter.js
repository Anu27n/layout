import React from 'react';

const Counter = ({ value, onIncrement, onDecrement, onChange }) => {
  return (
    <div className="counter">
      <button className="counter-btn" onClick={onDecrement}>-</button>
      <input
        type="number"
        className="counter-value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="counter-btn" onClick={onIncrement}>+</button>
    </div>
  );
};

export default Counter;