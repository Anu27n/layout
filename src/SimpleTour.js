import React, { useState, useEffect } from 'react';
import './SimpleTour.css';

const SimpleTour = ({ steps, isActive, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive && steps.length > 0) {
      setIsVisible(true);
      setCurrentStep(0);
    } else {
      setIsVisible(false);
    }
  }, [isActive, steps]);

  if (!isVisible || !steps[currentStep]) {
    return null;
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      onComplete && onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip && onSkip();
  };

  const step = steps[currentStep];

  return (
    <div className="simple-tour-overlay">
      <div className="simple-tour-tooltip">
        <div className="simple-tour-header">
          <h3 className="simple-tour-title">
            {step.title || `Step ${currentStep + 1}`}
          </h3>
          <button 
            className="simple-tour-close"
            onClick={handleSkip}
            aria-label="Close tour"
          >
            ×
          </button>
        </div>
        
        <div className="simple-tour-content">
          <p>{step.content}</p>
        </div>
        
        <div className="simple-tour-progress">
          <div className="simple-tour-progress-bar">
            <div 
              className="simple-tour-progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="simple-tour-step-counter">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <div className="simple-tour-footer">
          <button 
            className="simple-tour-button simple-tour-skip"
            onClick={handleSkip}
          >
            Skip Tour
          </button>
          
          <div className="simple-tour-navigation">
            {currentStep > 0 && (
              <button 
                className="simple-tour-button simple-tour-back"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            <button 
              className="simple-tour-button simple-tour-next"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTour;
