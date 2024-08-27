import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const StickyAgentForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {
  const [audio_id, setAudio] = useState("");
  const [hold_tune_id, setHoldTune] = useState("");
  const [connect_to_id, setConnectTo] = useState("");
  const [department_id, setDepartment] = useState("");

  const [description, setDescription] = useState("");

  const handleSave = () => {
    // Basic validation
    if (!nodeLabel || !audio_id || !hold_tune_id  || !connect_to_id || !department_id ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Prepare the form data
    const formData = {
      app_id:node.data.app_id ,
      // "5c93b0a9b0810",
      flow_id: flow_id,
      inst_id:node.id,
      name:nodeLabel,
      audio_id,
      hold_tune_id,
      connect_to_id,
      department_id,
      description
    };

    // Log the form data to the console
    console.log("Form Data:", formData);
    save(nodeLabel)
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
            value={audio_id}
            onChange={(e) => setAudio(e.target.value)}
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
            value={hold_tune_id}
            onChange={(e) => setHoldTune(e.target.value)}
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
            value={connect_to_id}
            onChange={(e) => setConnectTo(e.target.value)}
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
              value={department_id}
              onChange={(e) => setDepartment(e.target.value)}
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
