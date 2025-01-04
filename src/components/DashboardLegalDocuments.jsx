// DashboardLegalDocuments.jsx
import React from 'react';

const DashboardLegalDocuments = ({ legalDocuments }) => {
  return (
    <div>
      <h3>Legal Documents</h3>
      {legalDocuments && legalDocuments.length > 0 ? (
        <ul>
          {legalDocuments.map((document, index) => (
            <li key={index}>
              <a href={document.link} target="_blank" rel="noopener noreferrer">
                {document.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No legal documents available.</p>
      )}
    </div>
  );
};

export default DashboardLegalDocuments;
