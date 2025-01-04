// DashboardComplianceChecklist.jsx
import React from 'react';

const DashboardComplianceChecklist = ({ complianceChecklist }) => {
  return (
    <div>
      <h3>Compliance Checklist</h3>
      {complianceChecklist && complianceChecklist.length > 0 ? (
        <ul>
          {complianceChecklist.map((item, index) => (
            <li key={index}>
              <input type="checkbox" checked={item.checked} disabled />
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No compliance checklist available.</p>
      )}
    </div>
  );
};

export default DashboardComplianceChecklist;
