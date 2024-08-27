import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const OsTickets = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {
  const [name, setName] = useState(nodeLabel);
  const [domain, setDomain] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [alertToggled, setAlertToggled] = useState(true);
  const [autoRespondToggled, setAutoRespondToggled] = useState(true);

  // Error state variables
  const [nameError, setNameError] = useState("");
  const [domainError, setDomainError] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleToggleAlert = () => {
    setAlertToggled(!alertToggled);
  };

  const handleToggleAutoRespond = () => {
    setAutoRespondToggled(!autoRespondToggled);
  };

  const handleSave = () => {
    // Clear all previous error messages
    setNameError("");
    setDomainError("");
    setApiKeyError("");
    setSubjectError("");
    setMessageError("");

    // Validate form fields
    let hasError = false;
    if (!name) {
      setNameError("Name is required.");
      hasError = true;
    }
    if (!domain) {
      setDomainError("Domain is required.");
      hasError = true;
    }
    if (!apiKey) {
      setApiKeyError("API key is required.");
      hasError = true;
    }
    if (!subject) {
      setSubjectError("Subject is required.");
      hasError = true;
    }
    if (!message) {
      setMessageError("Message is required.");
      hasError = true;
    }

    if (hasError) return;

    // Create form data object
    const formData = {
      app_id:node.data.app_id ,
      // "5c93b0a9b0810",
        flow_id: flow_id,
        inst_id:node.id,
      name,
      domain,
      apiKey,
      alert: alertToggled ? "Yes" : "No",
      autoRespond: autoRespondToggled ? "Yes" : "No",
      subject,
      message
    };

    // Log form data to console
    console.log("Form Data:", formData);
    save(name);
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>OS Ticket</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error-message">{nameError}</p>}
          
          <label>Domain:<span className="star">*</span></label>
          <textarea
            type="text"
            placeholder="Enter the domain"
            cols="40"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          {domainError && <p className="error">{domainError}</p>}

          <label>Api key:<span className="star">*</span></label>
          <textarea
            type="text"
            placeholder="Enter the API key"
            rows="3"
            cols="40"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          {apiKeyError && <p className="error">{apiKeyError}</p>}

          <div style={{ display: "flex", alignItems: "center" }}>
            <h5>Alert:<span className="star">*</span></h5>
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>False</p>

            <div className="toggle-switch" onClick={handleToggleAlert}>
              <div
                className={`switch ${alertToggled ? "toggled" : "non-toggled"}`}
              >
                {alertToggled ? (
                  <i className="icon-on"></i> // Icon when toggled on
                ) : (
                  <i className="icon-off"></i> // Icon when toggled off
                )}
              </div>
            </div>
            <p style={{ marginLeft: "10px" }}>True</p>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <h5>Auto respond:<span className="star">*</span></h5>
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>False</p>

            <div className="toggle-switch" onClick={handleToggleAutoRespond}>
              <div
                className={`switch ${autoRespondToggled ? "toggled" : "non-toggled"}`}
              >
                {autoRespondToggled ? (
                  <i className="icon-on"></i> // Icon when toggled on
                ) : (
                  <i className="icon-off"></i> // Icon when toggled off
                )}
              </div>
            </div>
            <p style={{ marginLeft: "10px" }}>True</p>
          </div>

          <label>Subject:<span className="star">*</span></label>
          <textarea
            placeholder="Write the subject"
            rows="6"
            cols="40"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {subjectError && <p className="error">{subjectError}</p>}

          <label>Message:<span className="star">*</span></label>
          <textarea
            placeholder="Write the message"
            rows="6"
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {messageError && <p className="error">{messageError}</p>}
        </div>

        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{ height: '20px', width: '20px' }} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default OsTickets;
