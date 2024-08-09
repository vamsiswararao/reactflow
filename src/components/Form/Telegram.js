import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const TelegramForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!nodeLabel) newErrors.nodeLabel = "Name is required.";
    if (!selectedValue) newErrors.selectedValue = "To is required.";
    if (!message) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData= {
      app_id:node.data.app_id ,
      // "5c93b0a9b0810",
      flow_id: flow_id,
      inst_id:node.id,
      name: nodeLabel,
      to_id:selectedValue,
      message:message
    }

    console.log( formData);
    save(nodeLabel)
    // You can add additional logic for form submission here
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Telegram</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}
          <label>
            To:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
          <label>
            Message:<span className="star">*</span>
          </label>
          <textarea
            placeholder="Write the message"
            rows="4"
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default TelegramForm;
