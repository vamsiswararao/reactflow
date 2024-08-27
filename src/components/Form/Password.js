import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const Passwords = ({ node,nodeLabel, handleLabelChange, deleteNode, removeForm, save, copyNode,flow_id }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [password, setPassword] = useState("");
  const [successAudio, setSuccessAudio] = useState("");
  const [failAudio, setFailAudio] = useState("");

  // Error state variables
  const [nodeLabelError, setNodeLabelError] = useState("");
  const [selectedValueError, setSelectedValueError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successAudioError, setSuccessAudioError] = useState("");
  const [failAudioError, setFailAudioError] = useState("");

  const handleSave = () => {
    // Clear previous error messages
    setNodeLabelError("");
    setSelectedValueError("");
    setPasswordError("");
    setSuccessAudioError("");
    setFailAudioError("");

    // Validate form fields
    let hasError = false;
    if (!nodeLabel) {
      setNodeLabelError("Name is required.");
      hasError = true;
    }
    if (!selectedValue) {
      setSelectedValueError("Audio selection is required.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }
    if (!successAudio) {
      setSuccessAudioError("Success audio selection is required.");
      hasError = true;
    }
    if (!failAudio) {
      setFailAudioError("Fail audio selection is required.");
      hasError = true;
    }

    if (hasError) return;

    // Create form data object
    const formData = {
      app_id:node.data.app_id ,
      // "5c93b0a9b0810",
      flow_id: flow_id,
      inst_id:node.id,
      name:nodeLabel,
      password,
      selectedValue,
      successAudio,
      failAudio,
    };

    // Log form data to console
    console.log("Form Data:", formData);
    save(nodeLabel);
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Password</h3>
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
          {nodeLabelError && <p className="error">{nodeLabelError}</p>}
          
          <label>Audio:<span className="star">*</span></label>
          <select
            className="input-select"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Select the audio</option>
            {[...Array(10)].map((_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {selectedValueError && <p className="error">{selectedValueError}</p>}

          <label>Password:<span className="star">*</span></label>
          <input
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}

          <label>Success audio:<span className="star">*</span></label>
          <select
            className="input-select"
            value={successAudio}
            onChange={(e) => setSuccessAudio(e.target.value)}
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {successAudioError && <p className="error">{successAudioError}</p>}

          <label>Fail audio:<span className="star">*</span></label>
          <select
            className="input-select"
            value={failAudio}
            onChange={(e) => setFailAudio(e.target.value)}
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {failAudioError && <p className="error">{failAudioError}</p>}
        </div>

        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default Passwords;
