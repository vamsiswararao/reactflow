import React, { useMemo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const SmsFrom = ({ node, nodeLabel, handleLabelChange, deleteNode, removeForm, save, copyNode, flow_id }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [toValue, setToValue] = useState("");
  const [errors, setErrors] = useState({});

  const maxLength = 160;

  const credits = useMemo(() => Math.ceil(message.length / maxLength), [message.length]);

  const getMessageType = () => {
    // Define your logic for message type
    if (message.length > 100) return 'Urgent';
    return 'Normal';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nodeLabel) newErrors.nodeLabel = "Name is required";
    if (!selectedValue) newErrors.selectedValue = "Sender ID is required";
    if (!toValue) newErrors.toValue = "TO selection is required";
    if (!message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSave = () => {
    // Basic validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Validation failed with errors:", formErrors);
      return;
    }

    // Log form data to the console
    const formData = {
      app_id: node.data.app_id,
      flow_id: flow_id,
      inst_id: node.id,
      name: nodeLabel,
      senderId: selectedValue,
      toi_id: toValue,
      message,
      description,
    };
    console.log("Form data before saving:", formData);
    save();
  }

  const handleLabelChangeWithDebug = (e) => {
    console.log("Label changed to:", e.target.value);
    handleLabelChange(e);
  };

  const handleSelectedValueChange = (e) => {
    console.log("Sender ID changed to:", e.target.value);
    setSelectedValue(e.target.value);
  };

  const handleToValueChange = (e) => {
    console.log("TO value changed to:", e.target.value);
    setToValue(e.target.value);
  };

  const handleMessageChange = (e) => {
    console.log("Message changed to:", e.target.value);
    setMessage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    console.log("Description changed to:", e.target.value);
    setDescription(e.target.value);
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
          <label>Name :<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChangeWithDebug}
          />
          {errors.nodeLabel && <p className="error-text">{errors.nodeLabel}</p>}

          <div style={{ display: "flex", width: "315px", marginTop: "10px" }}>
            <label style={{ width: "85px", fontSize: '16px' }}>Sender Id :<span className="star">*</span></label>
            <select
              className="sms-select"
              value={selectedValue}
              onChange={handleSelectedValueChange}
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
            {errors.selectedValue && <p className="error-text">{errors.selectedValue}</p>}
            <label style={{ marginLeft: "5px", fontSize: '16px' }}>
              TO:<span className="star">*</span>
            </label>
            <select
              className="sms-select"
              value={toValue}
              onChange={handleToValueChange}
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
            {errors.toValue && <p className="error-text">{errors.toValue}</p>}
          </div>
          <label style={{ marginTop: '10px' }}>Message :<span className="star">*</span></label>
          <textarea
            placeholder="Enter the message"
            rows="6"
            cols="40"
            value={message}
            onChange={handleMessageChange}
            maxLength={maxLength * 10}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}
          <div style={{ display: 'flex' }}>
            <p>MsgType: {getMessageType()}</p>
            <p>Length: {message.length}</p>
            <p>Credits: {credits}</p>
            <p>Characters Left: {maxLength * credits - message.length}</p>
          </div>
          <label>Description :</label>
          <textarea
            placeholder="Enter the description"
            rows="6"
            cols="40"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{ height: '20px', width: '20px' }} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default SmsFrom;
