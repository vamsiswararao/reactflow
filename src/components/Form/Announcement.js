import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

import "./Form.css";
const apiUrl = process.env.REACT_APP_API_URL;

const Announcement = ({
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
    app_id:node.data.app_id ,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id:node.id,
    name: nodeLabel || "", // Initialize with nodeLabel or an empty string
    audio_id: "",
    repeat_cnt: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch data from dummy URL on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        //const data = await response.json();
        setFormData((prevData) => ({
          app_id:node.data.app_id ,
          // "5c93b0a9b0810",
          flow_id: flow_id,
          inst_id:node.id,
          name: nodeLabel || "", // Initialize with nodeLabel or an empty string
          audio_id: "5",
          repeat_cnt: "12",
          remarks: "good",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [flow_id,nodeLabel,node]);
  
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
    if (!formData.audio_id) newErrors.selectedValue = "Audio selection is required";
    if (!formData.repeat_cnt) newErrors.repeatCount = "Repeat Count is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(`${apiUrl}/flow_data_update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
       console.log(response)
        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        console.log("Form Data Saved:", formData);
        save(nodeLabel); // Call the save handler from props
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
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label>
            Audio:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audio_id"
            value={formData.audio_id}
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
            name="repeat_cnt"
            value={formData.repeat_cnt}
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

export default Announcement;
