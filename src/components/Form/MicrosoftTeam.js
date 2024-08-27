import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const MicrosoftTeam = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {
  const [formData, setFormData] = useState({
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    name: nodeLabel || '',
    url: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: '',
    url: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Initialize error state
    let isValid = true;
    const newErrors = {
      name: '',
      url: '',
      message: ''
    };

    // Validate fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.url.trim()) {
      newErrors.url = "URL is required.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if valid
    setErrors({
      name: '',
      url: '',
      message: ''
    });

    console.log("Form Data:", formData);
    save(nodeLabel);
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Microsoft Team</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Enter the Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}

          <label>Url:<span className="star">*</span></label>
          <textarea
            name="url"
            placeholder="Write the URL"
            rows="4"
            cols="40"
            value={formData.url}
            onChange={handleChange}
          />
          {errors.url && <div className="error-message">{errors.url}</div>}

          <label>Message:<span className="star">*</span></label>
          <textarea
            name="message"
            placeholder="Write the Message"
            rows="4"
            cols="40"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: '20px', width: '20px' }} />
        </button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default MicrosoftTeam;
