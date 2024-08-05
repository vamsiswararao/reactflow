import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const Passwords = ({ nodeLabel, handleLabelChange, deleteNode, removeForm,save,copyNode }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [password, setPassword] = useState("");
  const [successAudio, setSuccessAudio] = useState("");
  const [failAudio, setFailAudio] = useState("");

  const handleSave = () => {
    // Validation
    if (!nodeLabel ||!password || !selectedValue || !successAudio ||!failAudio){
      alert("Please fill out all required fields.");
     return;
    }


    // Log form data
    console.log({
      nodeLabel,
      password,
      selectedValue,
      successAudio,
      failAudio,
    });
    save(nodeLabel)

    // Clear errors if everything is valid
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

          <label>Password:<span className="star">*</span></label>
          <input
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
