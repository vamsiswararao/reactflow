import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

import "./Form.css";

const VoicemailForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [formData, setFormData] = useState({
    selectedValue: "",
    repeatCount: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({
    selectedValue: "",
    repeatCount: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { selectedValue: "", repeatCount: "", remarks: "" };

    if (!formData.selectedValue) {
      newErrors.selectedValue = "Audio selection is required.";
      isValid = false;
    }
    if (!formData.repeatCount) {
      newErrors.repeatCount = "Recording duration is required.";
      isValid = false;
    } else if (isNaN(formData.repeatCount) || formData.repeatCount <= 0) {
      newErrors.repeatCount = "Please enter a valid recording duration.";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saved Data:", formData);
      save()
      // You can also add code here to handle the form submission
    }
  };

  return (
    <div className="announcement-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Voice Mail</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "25px", width: "25px" }} />
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
            name="selectedValue"
            value={formData.selectedValue}
            onChange={handleInputChange}
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
          {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
          <label>Recording duration:<span className="star">*</span></label>
          <input
            type="text"
            name="repeatCount"
            placeholder="Enter the repeat count"
            value={formData.repeatCount }
            onChange={handleInputChange}
          />
          {errors.repeatCount && <p className="error">{errors.repeatCount}</p>}
          <label>Remarks</label>
          <textarea
            name="remarks"
            placeholder="Write the remarks"
            rows="6"
            cols="40"
            value={formData.remarks}
            onChange={handleInputChange}
          />
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

export default VoicemailForm;
