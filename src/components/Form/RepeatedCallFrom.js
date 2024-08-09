import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const RepeatedCallForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [formData, setFormData] = useState({
    name: nodeLabel || "", // Initialize with nodeLabel or an empty string
    status_id: "",
    time: "",
    calls: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const data = {
    "lml" : "66b0db9cc12ec",
    "nm" : "testing",
    "remarks" : "transfer testing",
    "mtyp" : "66aa1b3e7e166",
    "k" : "66ab27436a029",
    "flw" : "5dfb230c2b44a"
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.status) newErrors.status = "Status selection is required";
    if (!formData.time) newErrors.time = "Time selection is required";
    if (!formData.calls) newErrors.calls = "Calls selection is required";

    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Saved Data:", formData);
      save(formData.name); // Use formData.name instead of nodeLabel

      try {
        const response = await fetch('http://192.168.21.123/devenv/ssq_portal_ajax_apis_live/public/index.php/v1/flow_transfer_master_add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) { // Check if response is successful
          const data = await response.json();
          console.log("Data saved successfully:", data);
        } else {
          console.error("Error saving data:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="announcement-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>RepeatedCall</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "25px", width: "25px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name :<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label>
            Time (hours):<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
          {errors.time && <p className="error">{errors.time}</p>}
          <label>
            Status :<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="status_id"
            value={formData.status_id}
            onChange={handleInputChange}
          >
            <option>Select...</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          {errors.status && <p className="error">{errors.status}</p>}
          <label>
            Calls :<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Calls"
            name="calls" // Changed from "call" to "calls" to match the state
            value={formData.calls}
            onChange={handleInputChange}
          />
          {errors.calls && <p className="error">{errors.calls}</p>}
          <label>Description :</label>
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
          <button onClick={copyNode} className="copy-btn">
            <FaCopy style={{ height: '20px', width: '20px' }} />
          </button>
          <button onClick={deleteNode} className="delete-btn">
            <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepeatedCallForm;
