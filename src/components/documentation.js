import React, { useState } from "react";

// Define a CollapsibleSection component that manages its open/closed state
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the section's open/closed state
  const toggleOpen = () => setIsOpen(!isOpen);

  const sectionClass = `collapsible-section ${!isOpen ? "collapsed" : ""}`;

  return (
    <div className={sectionClass}>
      <button onClick={toggleOpen} className="collapsible-title">
        {title}
        <span className="collapse-button"></span>
      </button>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
};

// Main Documentation component that will render the form with collapsible sections
export default function Documentation(props) {
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the actual data 
    const textData = "Hello, Lambda! This is Software Dev Team!!";
    const apiEndpoint =
      "https://vaz40kx3ck.execute-api.us-east-1.amazonaws.com/v1/upload_file";
    const data = {
      body: textData,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    // Perform the POST request to the API endpoint
    fetch(apiEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Update the state with the API response
        setApiResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // State for the Safety Assessment radio button selection
  const [safetyAssessment, setSafetyAssessment] = useState("");

  // Handler for changes in the Safety Assessment radio buttons
  const handleSafetyAssessmentChange = (event) => {
    setSafetyAssessment(event.target.value);
  };

  const [mentalState, setMentalState] = useState({
    appearance: [],
    speech: [],
    eyeContact: [],
    moterActivity: [],
    affect: [],
    mood: [],
    orientation: [],
    memory: [],
    attention: [],
    perception: [],
    thoughtProcess: [],
    thoughtContent: [],
    behavior: [],
    insight: [],
    judgement: [],
  });

  const handleCheckboxChange = (category, value, isChecked) => {
    if (isChecked) {
      setMentalState((prevState) => ({
        ...prevState,
        [category]: [...prevState[category], value],
      }));
    } else {
      setMentalState((prevState) => ({
        ...prevState,
        [category]: prevState[category].filter((item) => item !== value),
      }));
    }
  };

  // This function checks if a category contains a value
  const isChecked = (category, value) => {
    return mentalState[category].includes(value) || false;
  };

  const checkboxCategories = {
    appearance: ["Neat", "Disheveled", "Inappropriate", "Other", "Bizarre"],
    speech: [
      "Clear & Coherent",
      "Tangential",
      "Pressured",
      "Rapid",
      "Slow",
      "Loud",
      "Quiet",
      "Talkative",
      "Other",
      "Impoverished",
    ],
    eyeContact: ["Normal", "Intense", "Avoidant", "Other"],
    moterActivity: ["Normal", "Restless", "Tics", "Slowed", "Other"],
    affect: [
      "Full Range",
      "Congruent",
      "Flat",
      "Labile",
      "Blunted",
      "Restricted",
      "Incongruent",
      "Other",
    ],
    mood: [
      "Euthymic",
      "Anxious",
      "Angry",
      "Depressed",
      "Euphoric",
      "Irritable",
      "Other",
    ],
    orientation: ["Person", "Place", "Time", "Impaired"],
    memory: ["Intact", "Short Term Impairment", "Long Term Impairment"],
    attention: ["Intact", "Distracted", "Other"],
    perception: [
      "Hallucinations (A)",
      "Hallucinations (V)",
      "Derealization",
      "Depersonalization",
      "Other",
    ],
    thoughtProcess: [
      "Goal Directed",
      "Disorganized",
      "Perseveration",
      "Loose Association",
      "Circumstantial",
      "Logical",
      "Thought Blocking",
      "Flight of Ideas",
      "Magical Thinking",
      "Other",
    ],
    thoughtContent: [
      "Normal",
      "SI",
      "HI",
      "Delusions",
      "Obsessions",
      "Phobias",
      "Paranoia",
      "Ideas of Reference",
      "Ruminations",
      "Other",
    ],
    behavior: [
      "Cooperative",
      "Guarded",
      "Hyperactive",
      "Agitated",
      "Paranoid",
      "Aggressive",
      "Bizarre",
      "Withdrawn",
      "Other",
    ],
    insight: ["Good", "Fair", "Poor"],
    judgement: ["Good", "Fair", "Poor"],
  };

  const camelCaseToTitle = (text) => {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const [useTemplate, setUseTemplate] = useState("no");

  const handleTemplateChange = (event) => {
    setUseTemplate(event.target.value);
  };

  const [acknowledged, setAcknowledged] = useState(false);

  const handleAcknowledgementChange = (event) => {
    setAcknowledged(event.target.checked);
  };

  const [patientLocatedAtHome, setPatientLocatedAtHome] = useState("");

  const handleLocationChange = (event) => {
    setPatientLocatedAtHome(event.target.value);
  };

  // Render the form with multiple CollapsibleSection components
  return (
    <form className="clinical-doc" onSubmit={handleSubmit}>
      <div className="radio-group">
        <p>Was the patient located at home:</p>
        <input
          id="locateHomeYes"
          type="radio"
          name="locateHome"
          value="yes"
          checked={patientLocatedAtHome === "yes"}
          onChange={handleLocationChange}
        />
        <label htmlFor="locateHomeYes">Yes</label>
        <input
          id="locateHomeNo"
          type="radio"
          name="locateHome"
          value="no"
          checked={patientLocatedAtHome === "no"}
          onChange={handleLocationChange}
        />
        <label htmlFor="locateHomeNo">No</label>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Where were they located?"
        ></textarea>
      </div>

      <CollapsibleSection title="Safety Assessment">
        {/* Place for the safety assessment description*/}
        <div className="radio-group">
          <p>Does patient endorse SI/HI/AVH?</p>
          <input
            id="safetyAssessmentYes"
            type="radio"
            name="safetyAssessment"
            value="yes"
            checked={safetyAssessment === "yes"}
            onChange={handleSafetyAssessmentChange}
          />
          <label htmlFor="safetyAssessmentYes">Yes</label>
          <input
            id="safetyAssessmentNo"
            type="radio"
            name="safetyAssessment"
            value="no"
            checked={safetyAssessment === "no"}
            onChange={handleSafetyAssessmentChange}
          />
          <label htmlFor="safetyAssessmentNo">No</label>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Medications">
        {/* Place for the medication table as shown on UI design*/}
        <div className="form-group">
          <label htmlFor="responseToMedication">
            Response to medication/adherence:
          </label>
          <textarea
            id="responseToMedication"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="medicationConcerns">
            Medication concerns for prescribing provider:
          </label>
          <textarea id="medicationConcerns" className="form-control"></textarea>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Clinical Overview">
        {/* Place for the description of the clinical overview as shown on UI design*/}
        <div className="diagnosis-list">
          <p>Diagnosis:</p>
          {/* Place for the diagnosis as shown on UI design*/}
        </div>
        <div className="form-group">
          <label htmlFor="currentSymptoms">Current Symptoms:</label>
          <textarea id="currentSymptoms" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="medicationConcerns">
            Medication concerns for prescribing provider:
          </label>
          <textarea id="medicationConcerns" className="form-control"></textarea>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Mental Status Exam">
        {/* Place for the description of the Mental Status Exam as shown on UI design*/}
        <div className="mental-status-exam-container">
          {Object.keys(checkboxCategories).map((category) => (
            <div key={category} className="row">
              <label>{camelCaseToTitle(category)}</label>
              <div className="checkbox-group">
                {checkboxCategories[category].map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      name={category}
                      value={option}
                      checked={isChecked(category, option)}
                      onChange={(e) =>
                        handleCheckboxChange(category, option, e.target.checked)
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
              <textarea
                className="form-control"
                placeholder={`Comment on ${category}`}
              />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Session Note">
        <div className="radio-group">
          <label>Would you like to use Session Note Template?</label>
          <label>
            <input
              type="radio"
              name="useTemplate"
              value="yes"
              checked={useTemplate === "yes"}
              onChange={handleTemplateChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="useTemplate"
              value="no"
              checked={useTemplate === "no"}
              onChange={handleTemplateChange}
            />
            No
          </label>
        </div>
        <p>Your Psychotherapy Note:</p>
        {/* Place for the psychotherapy note as shown on UI design*/}
        <div className="form-group">
          <label htmlFor="patientReports">
            Patient Reports (Subjective Information):
          </label>
          <textarea id="patientReports" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="clinicalObservations">
            Clinical Observations (Objective Information):
          </label>
          <textarea
            id="clinicalObservations"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="progressUpdates">
            Progress/Updates Since Last Session:
          </label>
          <textarea id="progressUpdates" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="clinicalInterventions">
            Clinical Interventions Used:
          </label>
          <textarea
            id="clinicalInterventions"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="copingSkills">
            Coping Skills Reviewed or Introduced:
          </label>
          <textarea id="copingSkills" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="assessmentProgress">Assessment of Progress:</label>
          <textarea id="assessmentProgress" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan:</label>
          <textarea id="plan" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cptCodes">CPT Codes:</label>
          <textarea id="cptCodes" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="acknowledgement"
              checked={acknowledged}
              onChange={handleAcknowledgementChange}
            />
            I acknowledge that the above information is correct and has been
            reviewed prior to submitting.
          </label>
        </div>
      </CollapsibleSection>

      <div className="form-actions">
        <button type="button" className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}
