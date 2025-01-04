// DashboardStepByStepGuide.jsx
import React from 'react';

const DashboardStepByStepGuide = ({ stepByStepGuide }) => {
  return (
    <div>
      <h3>Step-by-Step Guide</h3>
      {stepByStepGuide && stepByStepGuide.length > 0 ? (
        <ol>
          {stepByStepGuide.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      ) : (
        <p>No step-by-step guide available.</p>
      )}
    </div>
  );
};

export default DashboardStepByStepGuide;
