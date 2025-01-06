import React, { useState, useEffect } from 'react';
import './Questionnaire.css';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    license: 'NO',
    businessActivities: [],
    cddFramework: 'NO',
    guidelines: [],
    practices: [],
    certifications: [],
    documents: [],
  });

  const [bitString, setBitString] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [questionDesc, setQuestionDesc] = useState('Loading question...');
  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState(null);  // Track userStats separately
  const [loading, setLoading] = useState(true); // New loading state

  // Fetch user data from the API
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch('http://http://172.203.224.99:8888/auth/get-user-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setUserData(data);
        setBitString(data.bit_string);
        setCurrentStep(data.question_no - 1);  // Adjust question number if needed
        setUserStats(data.userStats);
        fetchQuestion(data.question_no); // Fetch the first question
      } else {
        console.error('Error fetching user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch the question based on the current step
  const fetchQuestion = async (step) => {
    if (!userData) return;  // Ensure userData is available before fetching question

    const requestBody = {
      email: userData?.email || "",
      question_no: step,
      keywords: selectedKeywords.length > 0 ? selectedKeywords : ["no"],
      bit_string: userData?.bit_string,
    };

    try {
      const response = await fetch('http://http://172.203.224.99:8888/get-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setBitString(data.output.bit_string);
        setCurrentStep(data.output.question_no - 1);
        setQuestionDesc(data.output.question_desc);
        setKeywords(data.output.keywords);
        setSelectedKeywords([]);
        setUserStats(data.output.userStats);
        setLoading(false); // Set loading to false once data is fetched
      } else {
        console.error('Error fetching question:', data.message);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  // Handle keyword change
  const handleKeywordChange = (event) => {
    const { value, checked } = event.target;
    const updatedKeywords = checked
      ? [...selectedKeywords, value]
      : selectedKeywords.filter(keyword => keyword !== value);

    setSelectedKeywords(updatedKeywords);
  };

  // Handle moving to the next question
  const handleNext = async () => {
    if (currentStep === -1) {
      return; // Prevent moving forward if currentStep is -1
    }
    setLoading(true); // Set loading to true while fetching the next question
    console.log("User statssss: ", userStats)

    const updatedUserStats = {
      ...userStats,
      complianceChecklist: userStats.complianceChecklist || [],
      penaltyKeywords: userStats.penaltyKeywords || [],
      stepByStepGuide: userStats.stepByStepGuide || [],
      faqs: userStats.faqs || [],
      onTheRightSide: userStats.onTheRightSide || [],
      doDont: userStats.doDont || [],
      certifications: userStats.certifications || [],
      legalDocuments: userStats.legalDocuments || [],
    };

    // Send PUT request to update user stats
    console.log("Updated user stats are: ", updatedUserStats)
    setUserStats(updatedUserStats);
    console.log("User stats state: ", userStats)
    await updateUserStats(updatedUserStats);
    fetchQuestion(currentStep + 1);
  };

  const updateUserStats = async (updatedStats) => {
    const token = localStorage.getItem('authToken');
    const email = userData?.email;

    try {
      const response = await fetch(`http://http://172.203.224.99:8888/user/${email}/userStats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          complianceChecklist: updatedStats.complianceChecklist,
          penaltyKeywords: updatedStats.penaltyKeywords,
          stepByStepGuide: updatedStats.stepByStepGuide,
          faqs: updatedStats.faqs,
          onTheRightSide: updatedStats.onTheRightSide,
          doDont: updatedStats.doDont,
          certifications: updatedStats.certifications,
          legalDocuments: updatedStats.legalDocuments
        }),
      });

      const data = await response.json();
      console.log("Data received from updateuserstats api: ", data)

      if (response.ok) {
        setUserStats(data.userStats);  // Update the local userStats state
      } else {
        console.error('Error updating user stats:', data.message);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  // Render user stats on the right side
  const renderUserStats = () => {
    if (!userData) return null;

    return (
      <div className="user-stats">
        {userStats.onTheRightSide}
      </div>
    );
  };

  // Render the question
  const renderQuestion = () => (
    <div className="question">
      <label>{questionDesc}</label>
      <div>
        {keywords.map((keyword, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name="businessActivities"
              value={keyword}
              onChange={handleKeywordChange}
              checked={selectedKeywords.includes(keyword)}
            />
            {keyword}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="questionnaire-container">
      <div className="question-section">
        <h2>Question {currentStep + 1}</h2>
        {loading ? (
          <div>Loading question...</div> // Display loading message while waiting for data
        ) : (
          renderQuestion() || "Placeholder for Question"
        )}

        <button
          className="save-button"
          onClick={handleNext}
          disabled={currentStep === -1} // Disable the button if currentStep is -1
        >
          Save and Next
        </button>
      </div>

      <div className="report-section">
        {renderUserStats()}
      </div>
    </div>
  );
};

export default Questionnaire;