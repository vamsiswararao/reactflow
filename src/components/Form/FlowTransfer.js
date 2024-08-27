import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const FlowTransferForm =({
    node,
    nodeLabel,
    handleLabelChange,
    deleteNode,
    removeForm,
    save,
    copyNode,
    flow_id

  })=>{

    const [formData, setFormData] = useState({
        app_id:node.data.app_id ,
      // "5c93b0a9b0810",
        flow_id: flow_id,
        inst_id:node.id,
        name: nodeLabel || "", // Initialize with nodeLabel or an empty string
        flow: "",
        description: "",
      });
    
      const [errors, setErrors] = useState({});
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log(apiUrl);
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
        if (!formData.flow) newErrors.flow = "Flow selection is required";
        return newErrors;
      };
    
      const handleSave = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
          console.log("Saved Data:", formData);
          
          // Adding the data to the dummy API
          fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "lml" : "66b0db9cc12ec",
              "nm" : "testing",
              "remarks" : "ytewytfyjewcyffecyw",
              "mtyp" : "66aa1b3e7e166",
              "k" : "66ab27436a029",
              "flw" : "5dfb230c2b44a"
          }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data); // You can handle the response data if needed
              save(formData.name); // Use formData.name instead of nodeLabel
            })
            .catch((error) => {
              console.error("Error:", error);
              // You can handle the error if needed
            });

        } else {
          setErrors(formErrors);
        }
      };

    return (
        <div className="announcement-container">
          <div className="form">
            <h3 style={{ textAlign: 'center' }}>FlowTransfer</h3>
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
                Flow :<span className="star">*</span>
              </label>
              <select
                className="input-select"
                name="flow"
                value={formData.flow}
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
              {errors.flow && <p className="error">{errors.flow}</p>}
              <label>Description :</label>
              <textarea
                placeholder="write the description"
                rows="6"
                cols="40"
                name="description"
                value={formData.description}
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
}

export default FlowTransferForm;
