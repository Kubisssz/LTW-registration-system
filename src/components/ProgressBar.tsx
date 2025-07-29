import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-purple-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-purple-700">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;