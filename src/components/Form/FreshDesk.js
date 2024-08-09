import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const FreshDeskForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  save,
  flow_id
}) => {
  // State for form inputs
  const [formValues, setFormValues] = useState({
    app_id:node.data.app_id ,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id:node.id,
    name:nodeLabel || "",
    api_key: "",
    password: "",
    domain: "",
    priority_id: "",
    audio_id: "",
    description: "",
    subject: "",
    status_id: "",
    source_id: "",
    custom_post_field: ""
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    } 
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (
      !formValues.name ||
      !formValues.api_key ||
      !formValues.password ||
      !formValues.domain ||
      !formValues.priority_id ||
      !formValues.audio_id ||
      !formValues.description ||
      !formValues.subject ||
      !formValues.status_id ||
      !formValues.source_id ||
      !formValues.custom_post_field
      ) {
      alert("Please fill in all required fields.");
      return;
    }
    // Save or submit form data
    console.log("Form data:", formValues);
    // You can implement saving logic here
    save(nodeLabel)
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
            name="api_key"
            placeholder="Enter the api key"
            value={formValues.api_key}
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
          <label>
            Domain:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="domain"
            placeholder="Enter the domain"
            value={formValues.domain}
            onChange={handleInputChange}
            required
          />
          <label>
            Priority:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="priority_id"
            value={formValues.priority_id}
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
          <label>
            Send audio file:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audio_id"
            value={formValues.audio_id}
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
          <label>
            Ticket Messages:<span className="star">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Enter the Ticket Message"
            value={formValues.description}
            onChange={handleInputChange}
            rows="6"
            cols="40"
          />
          <label>
            Subject:<span className="star">*</span>
          </label>
          <textarea
            name="subject"
            placeholder="Enter the subject"
            value={formValues.subject}
            onChange={handleInputChange}
            rows="3"
            cols="40"
          />
          <label>
            Status:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="status_id"
            value={formValues.status_id}
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
            name="source_id"
            value={formValues.source_id}
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
            Custom Post Field:<span className="star">*</span>
          </label>
          <textarea
            name="custom_post_field"
            placeholder="Enter the post field"
            value={formValues.custom_post_field}
            onChange={handleInputChange}
            rows="6"
            cols="40"
          />
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleFormSubmit}>
          Save
        </button>
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: '20px', width: '20px' }} />
        </button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default FreshDeskForm;
