// DashboardLicensesAndCertifications.jsx
import React from 'react';
import './DashboardLicensesAndCertifications.css';

const DashboardLicensesAndCertifications = ({ certifications }) => {
  // Separate certifications into required and already have based on their checked status
  const requiredCertifications = certifications.filter(cert => !cert.checked);
  const alreadyHaveCertifications = certifications.filter(cert => cert.checked);

  return (
    <div className="dashboard-lc-container">
      {/* Required Certifications Section */}
      <div className="section">
        <h3 className="section-title required">Required</h3>
        {requiredCertifications.length > 0 ? (
          requiredCertifications.map((cert, index) => (
            <div className="certification-item" key={index}>
              <div className="certification-details">
                <span className="certification-title">{cert.name}</span>
                <span className="certification-subtitle">{cert.subtitle}</span>
              </div>
              <input type="checkbox" className="checkbox" />
            </div>
          ))
        ) : (
          <p>No required certifications.</p>
        )}
      </div>

      {/* Already Have Certifications Section */}
      <div className="section">
        <h3 className="section-title already-have">Already Have</h3>
        {alreadyHaveCertifications.length > 0 ? (
          alreadyHaveCertifications.map((cert, index) => (
            <div className="certification-item" key={index}>
              <div className="certification-details">
                <span className="certification-title">{cert.name}</span>
                <span className="certification-subtitle">{cert.subtitle}</span>
              </div>
              <input type="checkbox" className="checkbox" checked readOnly />
            </div>
          ))
        ) : (
          <p>No certifications available under 'Already Have'.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardLicensesAndCertifications;
