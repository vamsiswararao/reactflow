import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const HangOut = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  save,
  flow_id
}) => {
  const [formData, setFormData] = useState({
    app_id:node.data.app_id ,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id:node.id,
    name: nodeLabel ||"",
    url: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      handleLabelChange(event); // Call the prop function to update nodeLabel in parent component
    }  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Perform validation before saving
    if (formData.name.trim() === "" || !formData.url || !formData.message) {
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
    save(nodeLabel)
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
            value={formData.name}
            onChange={handleInputChange}
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
