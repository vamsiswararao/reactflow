import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const SmsFrom = ({ nodeLabel,handleLabelChange,deleteNode, removeForm,save,copyNode }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [toValue, setToValue] = useState("");

  const handleSave = () => {
    // Basic validation
    if (!nodeLabel || !selectedValue || !toValue || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    // Log form data to the console
    console.log({
      nodeLabel,
      senderId: selectedValue,
      toValue,
      message,
      description,
    });
    save()
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Sms</h3>
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

          <div style={{ display: "flex", width: "315px", marginTop: "10px" }}>
            <label style={{ width: "130px",fontSize:'16px' }}>Sender Id:<span className="star">*</span></label>
            <select
              className="sms-select"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
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
            <label style={{ marginLeft: "5px",fontSize:'16px'}}>
              TO:<span className="star">*</span>
            </label>
            <select
              className="sms-select"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
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
          </div>
          <label style={{ marginTop: '10px' }}>Message:<span className="star">*</span></label>
          <textarea
            placeholder="Enter the message"
            rows="6"
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            placeholder="Enter the description"
            rows="6"
            cols="40"
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

export default SmsFrom;
