import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const StickyAgentForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [connectType, setConnectType] = useState("");
  const [distributionType, setDistributionType] = useState("");
  const [missedCallTo, setMissedCallTo] = useState("");
  const [holdTune, setHoldTune] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // Basic validation
    if (!nodeLabel || !connectType || !distributionType || !missedCallTo || !holdTune) {
      alert("Please fill out all required fields.");
      return;
    }

    // Prepare the form data
    const formData = {
      nodeLabel,
      connectType,
      distributionType,
      missedCallTo,
      holdTune,
      description
    };

    // Log the form data to the console
    console.log("Form Data:", formData);
    save()
    // Optionally, you can reset the form fields or perform further actions here
    // For example:
    // setNodeLabel("");
    // setConnectType("");
    // setDistributionType("");
    // setMissedCallTo("");
    // setHoldTune("");
    // setDescription("");
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Sticky Agent</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          <label>Audio:<span className="star">*</span></label>
          <select
            className="input-select"
            value={connectType}
            onChange={(e) => setConnectType(e.target.value)}
          >
            <option value="">Select the audio</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <label>Hold tune:<span className="star">*</span></label>
          <select
            className="input-select"
            value={distributionType}
            onChange={(e) => setDistributionType(e.target.value)}
          >
            <option value="">Select The hold tune</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <label>Connect to:<span className="star">*</span></label>
          <select
            className="input-select"
            value={missedCallTo}
            onChange={(e) => setMissedCallTo(e.target.value)}
          >
            <option value="">Select...</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <label>Department:<span className="star">*</span></label>
          <div className="line">
            <select
              className="input-select"
              value={holdTune}
              onChange={(e) => setHoldTune(e.target.value)}
            >
              <option value="">Select The department</option>
              {[...Array(10)]
                .map((_, i) => i + 1)
                .map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
            </select>
          </div>
          <label>Description:</label>
          <textarea
            type="text"
            rows="6"
            cols="40"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

export default StickyAgentForm;
