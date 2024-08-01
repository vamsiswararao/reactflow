import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

import "./Form.css";

const Announcement = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [formData, setFormData] = useState({
    name: nodeLabel || "",
    selectedValue: "",
    repeatCount: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nodeLabel) newErrors.nodeLabel = "Name is required";
    if (!formData.selectedValue) newErrors.selectedValue = "Audio selection is required";
    if (!formData.repeatCount) newErrors.repeatCount = "Repeat Count is required";
    return newErrors;
  };

  const handleSave = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Saved Data:", formData);
      save(nodeLabel);
    } else {
      setErrors(formErrors);
    }
  };
  return (
    <div className="announcement-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Announcement</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "25px", width: "25px" }} />
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
            Audio:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="selectedValue"
            value={formData.selectedValue}
            onChange={handleInputChange}
          >
            <option>Select the audio</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
          <label>
            Repeat count:<span className="star">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter the repeat count"
            name="repeatCount"
            value={formData.repeatCount}
            onChange={handleInputChange}
          />
          {errors.repeatCount && <p className="error">{errors.repeatCount}</p>}
          <label>Remarks</label>
          <textarea
            placeholder="write the remarks"
            rows="6"
            cols="40"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </div>
        <hr className="bottom-hr" />
        <div className="button-group">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>

        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
