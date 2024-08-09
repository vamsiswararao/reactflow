import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const WhoCallingFrom = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  remove,
  save,
  copyNode
}) => {
  const [formData, setFormData] = useState({
    name: nodeLabel || "",
    audio: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log(formData);
    save(formData);
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Who's calling</h3>
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
            onChange={handleInputChange}
          />
          <label>If member of :<span className="star">*</span></label>
          <select
            className="input-select"
            name="selectedValue"
            value={formData.audio}
            onChange={handleInputChange}
          >
            <option value="">select...</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="write the description"
            rows="4"
            cols="40"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{ height: '20px', width: '20px' }} /></button>
        <button onClick={deleteNode} className="delete-btn"><RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default WhoCallingFrom;
