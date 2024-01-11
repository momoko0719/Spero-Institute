import React, { useState, useRef } from "react";

// Define a CollapsibleSection component that manages its open/closed state
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the section's open/closed state
  const toggleOpen = () => setIsOpen(!isOpen);

  const sectionClass = `collapsible-section ${!isOpen ? "collapsed" : ""}`;

  return (
    <div className={sectionClass}>
      <button type="button" onClick={toggleOpen} className="collapsible-title">
        {title}
        <span className="collapse-button"></span>
      </button>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
};

// Main Documentation component that will render the form with collapsible sections
export default function Documentation(props) {
  const formRef = useRef(null);

  //handle api calls
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const formValues = {};

    for (let [name, value] of formData.entries()) {
      if (formData.getAll(name).length > 1) {
        formValues[name] = JSON.stringify(formData.getAll(name));
      } else if (value.trim() !== "") {
        formValues[name] = value;
      }
    }

    const fields = Object.keys(formValues);
    const values = Object.values(formValues).map(value => typeof value === 'string' ? `'${value}'` : value);

    const insertQuery = `INSERT INTO speroEHRData.form_clinic(${fields.join(', ')}) VALUES (${values.join(', ')});`;

    const createTableQuery = `CREATE TABLE speroEHRData.form_clinic(locateHome VARCHAR(255),locateHomeText VARCHAR(255),safetyAssessment VARCHAR(255),responseToMedicationText VARCHAR(255),medicationConcernsText VARCHAR(255),currentSymptomsText VARCHAR(255),medicationConcernsOverviewText VARCHAR(255),appearance VARCHAR(255),appearanceComment VARCHAR(255),speech VARCHAR(255),speechComment VARCHAR(255),eyeContact VARCHAR(255),eyeContactComment VARCHAR(255),moterActivity VARCHAR(255),moterActivityComment VARCHAR(255),affect VARCHAR(255),affectComment VARCHAR(255),mood VARCHAR(255),moodComment VARCHAR(255),orientation VARCHAR(255),orientationComment VARCHAR(255),memory VARCHAR(255),memoryComment VARCHAR(255),attention VARCHAR(255),attentionComment VARCHAR(255),perception VARCHAR(255),perceptionComment VARCHAR(255),thoughtProcess VARCHAR(255),thoughtProcessComment VARCHAR(255),thoughtContent VARCHAR(255),thoughtContentComment VARCHAR(255),behavior VARCHAR(255),behaviorComment VARCHAR(255),insight VARCHAR(255),insightComment VARCHAR(255),judgement VARCHAR(255),judgementComment VARCHAR(255),useTemplate VARCHAR(255),patientReportsText VARCHAR(255),clinicalObservationsText VARCHAR(255),progressUpdatesText VARCHAR(255),clinicalInterventionsText VARCHAR(255),copingSkillsText VARCHAR(255),assessmentProgressText VARCHAR(255),planText VARCHAR(255),cptCodesText VARCHAR(255),acknowledgement VARCHAR(255));`;
    const checkTableQuery = `SHOW TABLES LIKE 'form_clinic';`;


    console.log(formValues);
    console.log(insertQuery);
    console.log(createTableQuery);
    console.log(checkTableQuery);

    const req_value = 
    {
      "query": insertQuery,
      "create": createTableQuery,
      "check": checkTableQuery  
    }

    const apiEndpoint =
      "https://vaz40kx3ck.execute-api.us-east-1.amazonaws.com/v1/db_query";

    const headers = {
      "Content-Type": "application/json",
    };

    fetch(apiEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req_value),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setApiResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const camelCaseToTitle = (text) => {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
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

  // Render the form with multiple CollapsibleSection components
  return (
    <form ref={formRef} className="clinical-doc" onSubmit={handleSubmit}>
      <div className="radio-group">
        <p>Was the patient located at home:</p>
        <input id="locateHomeYes" type="radio" name="locateHome" value="yes" />
        <label htmlFor="locateHomeYes">Yes</label>
        <input id="locateHomeNo" type="radio" name="locateHome" value="no" />
        <label htmlFor="locateHomeNo">No</label>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Where were they located?"
          name="locateHomeText"
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
          />
          <label htmlFor="safetyAssessmentYes">Yes</label>
          <input
            id="safetyAssessmentNo"
            type="radio"
            name="safetyAssessment"
            value="no"
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
            name="responseToMedicationText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="medicationConcerns">
            Medication concerns for prescribing provider:
          </label>
          <textarea
            id="medicationConcerns"
            className="form-control"
            name="medicationConcernsText"
          ></textarea>
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
          <textarea
            id="currentSymptoms"
            className="form-control"
            name="currentSymptomsText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="medicationConcernsOverview">
            Medication concerns for prescribing provider:
          </label>
          <textarea
            id="medicationConcernsOverview"
            className="form-control"
            name="medicationConcernsOverviewText"
          ></textarea>
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
                    <input type="checkbox" name={category} value={option} />
                    {option}
                  </label>
                ))}
              </div>
              <textarea
                className="form-control"
                name={`${category}Comment`}
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
            <input type="radio" name="useTemplate" value="yes" />
            Yes
          </label>
          <label>
            <input type="radio" name="useTemplate" value="no" />
            No
          </label>
        </div>
        <p>Your Psychotherapy Note:</p>
        {/* Place for the psychotherapy note as shown on UI design*/}
        <div className="form-group">
          <label htmlFor="patientReports">
            Patient Reports (Subjective Information):
          </label>
          <textarea
            id="patientReports"
            className="form-control"
            name="patientReportsText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="clinicalObservations">
            Clinical Observations (Objective Information):
          </label>
          <textarea
            id="clinicalObservations"
            className="form-control"
            name="clinicalObservationsText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="progressUpdates">
            Progress/Updates Since Last Session:
          </label>
          <textarea
            id="progressUpdates"
            className="form-control"
            name="progressUpdatesText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="clinicalInterventions">
            Clinical Interventions Used:
          </label>
          <textarea
            id="clinicalInterventions"
            className="form-control"
            name="clinicalInterventionsText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="copingSkills">
            Coping Skills Reviewed or Introduced:
          </label>
          <textarea
            id="copingSkills"
            className="form-control"
            name="copingSkillsText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="assessmentProgress">Assessment of Progress:</label>
          <textarea
            id="assessmentProgress"
            className="form-control"
            name="assessmentProgressText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan:</label>
          <textarea
            id="plan"
            className="form-control"
            name="planText"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cptCodes">CPT Codes:</label>
          <textarea
            id="cptCodes"
            className="form-control"
            name="cptCodesText"
          ></textarea>
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="acknowledgement" />I acknowledge that
            the above information is correct and has been reviewed prior to
            submitting.
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
