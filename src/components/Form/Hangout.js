import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const HangOut = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode
}) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Perform validation before saving
    if (formData.name.trim() === "" || !formData.name.url || !formData.name.message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Handle saving logic
    console.log("Saving data:", formData);
    // Reset form after saving if needed
    setFormData({
      name: "",
      url: "",
      message: "",
    });
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>HungOut</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Enter the name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          <label>Url:<span className="star">*</span></label>
          <textarea
            type="url"
            name="url"
            placeholder="Enter the url"
            value={formData.url}
            onChange={handleInputChange}
            rows="4"
            cols="40"
          />
          <label>Message:<span className="star">*</span></label>
          <textarea
            name="message"
            placeholder="Enter the message"
            rows="6"
            cols="40"
            value={formData.message}
            onChange={handleInputChange}
          />
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>
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

export default HangOut;
