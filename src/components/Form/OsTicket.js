import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const OsTickets = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [name, setName] = useState(nodeLabel);
  const [domain, setDomain] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [alertToggled, setAlertToggled] = useState(true);
  const [autoRespondToggled, setAutoRespondToggled] = useState(true);

  const handleToggleAlert = () => {
    setAlertToggled(!alertToggled);
  };

  const handleToggleAutoRespond = () => {
    setAutoRespondToggled(!autoRespondToggled);
  };

  const handleSave = () => {
    // Validate form fields
    if (!name || !domain || !apiKey || !subject || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    // Create form data object
    const formData = {
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
    save()
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
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          <label>Domain:<span className="star">*</span></label>
          <textarea
            type="text"
            placeholder="Enter the domain"
            cols="40"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <label>Api key:<span className="star">*</span></label>
          <textarea
            type="Text"
            placeholder="Enter the api key"
            rows="3"
            cols="40"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />

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
            placeholder="write the subject"
            rows="3"
            cols="40"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label>Message:<span className="star">*</span></label>
          <textarea
            placeholder="write the message"
            rows="3"
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
         
        </div>

        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default OsTickets;
