import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const MissedCall = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode
}) => {
  const [formData, setFormData] = useState({
    app_id: node.data.app_id,
    flow_id: node.flow_id,
    inst_id: node.id,
    name: nodeLabel || ''
  });

  const [error, setError] = useState("");

  // Handle form submission
  const handleSave = async () => {
    // Reset error state
    setError("");

    // Perform validation
    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    // Define the API endpoint (use a dummy endpoint for testing)
    const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Form Data saved:", data);

      // Optionally, you can clear the form or perform other actions here
      setFormData({
        ...formData,
        name: '' // Clear the name field or reset formData as needed
      });
    } catch (error) {
      console.error("Error saving form data:", error);
      setError("Failed to save data.");
    }
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Missed Call</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        {error && <p className="error">{error}</p>}
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

export default MissedCall;
