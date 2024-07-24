import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const ZapierForm = ({ nodeLabel, handleLabelChange, deleteNode, removeForm,copyNode }) => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Validation
    const newErrors = {};
    if (!nodeLabel) newErrors.name = "Name is required";
    if (!url) newErrors.url = "URL is required";
    if (!message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Log the form data
    console.log({
      nodeLabel,
      url,
      message
    });

    // Optionally, you can perform further actions like sending the data to a server
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Zapier</h3>
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
          {errors.name && <p className="error">{errors.name}</p>}
          
          <label>Url:<span className="star">*</span></label>
          <textarea
            placeholder="Write the url"
            rows="4"
            cols="40"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && <p className="error">{errors.url}</p>}
          
          <label>Message:<span className="star">*</span></label>
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
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default ZapierForm;
