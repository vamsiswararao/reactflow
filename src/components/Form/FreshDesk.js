import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const FreshDeskFrom = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode
}) => {
  // State for form inputs
  const [formValues, setFormValues] = useState({
    name: "",
    apiKey: "",
    password: "",
    domain: "",
    priority: "",
    audioFile: "",
    retries: "",
    description: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (
      !formValues.name ||
      !formValues.apiKey ||
      !formValues.password ||
      !formValues.domain ||
      !formValues.priority ||
      !formValues.audioFile ||
      !formValues.retries
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    // Save or submit form data
    console.log("Form data:", formValues);
    // You can implement saving logic here
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Fresh Desk</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container" onSubmit={handleFormSubmit}>
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter the name"
            value={nodeLabel}
            onChange={handleLabelChange}
            required
          />
          <label>
            API key:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="apiKey"
            placeholder="Enter the api key"
            value={formValues.apiKey}
            onChange={handleInputChange}
            required
          />
          <label>
            Password:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="password"
            placeholder="Enter the password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          <div>
            <label>
              Domain:<span className="star">*</span>
            </label>
            <input
              type="text"
              name="domain"
              placeholder="Enter the domain"
              value={formValues.domain}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>
              Priority:<span className="star">*</span>
            </label>
            <select
              className="input-select"
              name="priority"
              value={formValues.priority}
              onChange={handleInputChange}
              required
            >
              <option value="">Select the priority</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <label>
            Send audio file:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audioFile"
            value={formValues.audioFile}
            onChange={handleInputChange}
            required
          >
            <option value="">Select the audio File</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          
          <label>Ticket Messages:<span className="star">*</span></label>
          <textarea
            name="description"
            placeholder="Enter the Ticket Message"
            value={formValues.description}
            onChange={handleInputChange}
            rows="6"
            cols="40"
          />
<label>Subject:<span className="star">*</span></label>
          <textarea
            name="description"
            placeholder="Enter the subject"
            value={formValues.description}
            onChange={handleInputChange}
            rows="3"
            cols="40"
            />
          <label>
            Status:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audioFile"
            value={formValues.audioFile}
            onChange={handleInputChange}
            required
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label>
            Source:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audioFile"
            value={formValues.audioFile}
            onChange={handleInputChange}
            required
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label>Custom Post Field:<span className="star">*</span></label>
          <textarea
            name="description"
            placeholder="Enter the post field"
            value={formValues.description}
            onChange={handleInputChange}
            rows="3"
            cols="40"
            />
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleFormSubmit}>
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

export default FreshDeskFrom;
