import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardFirstTime from '../components/DashboardFirstTime';
import DashboardOverview from '../components/DashboardOverview';
import DashboardNewUserWelcome from '../components/DashboardNewUserWelcome';
import DashboardOldUserWelcome from '../components/DashboardOldUserWelcome';
import DashboardComplianceChecklist from '../components/DashboardComplianceChecklist';
import DashboardPenaltyKeywords from '../components/DashboardPenaltyKeywords';
import DashboardLicensesAndCertifications from '../components/DashboardLicensesAndCertifications';
import DashboardLegalDocuments from '../components/DashboardLegalDocuments';
import DashboardStepByStepGuide from '../components/DashboardStepByStepGuide';
import DashboardBestPractices from '../components/DashboardBestPractices';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await axios.get('http://http://172.203.224.99:8888/auth/get-user-data', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
          console.log(userData)
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleStartClick = () => {
    setFirstTime(false);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />
        {firstTime ? <DashboardNewUserWelcome /> : <DashboardOldUserWelcome />}
        {/* {userData && <div>Welcome, {userData.username}!</div>} */}

        <div className="tabs">
          <span
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
            OVERVIEW
          </span>
          <span
            className={`tab ${activeTab === 'complianceChecklist' ? 'active' : ''}`}
            onClick={() => handleTabClick('complianceChecklist')}
          >
            COMPLIANCE CHECKLIST
          </span>
          <span
            className={`tab ${activeTab === 'penaltyKeywords' ? 'active' : ''}`}
            onClick={() => handleTabClick('penaltyKeywords')}
          >
            PENALTY KEYWORDS
          </span>
          <span
            className={`tab ${activeTab === 'stepByStepGuide' ? 'active' : ''}`}
            onClick={() => handleTabClick('stepByStepGuide')}
          >
            STEP-BY-STEP GUIDE
          </span>
          <span
            className={`tab ${activeTab === 'licensesCertifications' ? 'active' : ''}`}
            onClick={() => handleTabClick('licensesCertifications')}
          >
            LICENSE & CERTIFICATIONS
          </span>
          <span
            className={`tab ${activeTab === 'legalDocuments' ? 'active' : ''}`}
            onClick={() => handleTabClick('legalDocuments')}
          >
            LEGAL DOCUMENTS
          </span>
          <span
            className={`tab ${activeTab === 'bestPractices' ? 'active' : ''}`}
            onClick={() => handleTabClick('bestPractices')}
          >
            BEST PRACTICES
          </span>
        </div>

        {firstTime && <DashboardFirstTime onStart={handleStartClick} />}
        {!firstTime && activeTab === 'overview' && <DashboardOverview />}
        {!firstTime && activeTab === 'complianceChecklist' && (
          <DashboardComplianceChecklist complianceChecklist={userData?.userStats?.complianceChecklist} />
        )}
        {!firstTime && activeTab === 'penaltyKeywords' && (
          <DashboardPenaltyKeywords penaltyKeywords={userData?.userStats?.penaltyKeywords} />
        )}
        {!firstTime && activeTab === 'stepByStepGuide' && (
          <DashboardStepByStepGuide stepByStepGuide={userData?.userStats?.stepByStepGuide} />
        )}
        {!firstTime && activeTab === 'licensesCertifications' && (
          <DashboardLicensesAndCertifications certifications={userData?.userStats?.certifications} />
        )}
        {!firstTime && activeTab === 'legalDocuments' && (
          <DashboardLegalDocuments legalDocuments={userData?.userStats?.legalDocuments} />
        )}
        {!firstTime && activeTab === 'bestPractices' && <DashboardBestPractices />}
      </main>
    </div>
  );
};

export default Dashboard;