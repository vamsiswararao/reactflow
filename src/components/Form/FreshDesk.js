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
  // State for form inputs and errors
  const [formValues, setFormValues] = useState({
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    name: nodeLabel || "",
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

  const [errors, setErrors] = useState({});

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
    const newErrors = {};
    if (!formValues.name) newErrors.name = "Name is required.";
    if (!formValues.api_key) newErrors.api_key = "API key is required.";
    if (!formValues.password) newErrors.password = "Password is required.";
    if (!formValues.domain) newErrors.domain = "Domain is required.";
    if (!formValues.priority_id) newErrors.priority_id = "Priority is required.";
    if (!formValues.audio_id) newErrors.audio_id = "Audio is required.";
    if (!formValues.description) newErrors.description = "Description is required.";
    if (!formValues.subject) newErrors.subject = "Subject is required.";
    if (!formValues.status_id) newErrors.status_id = "Status is required.";
    if (!formValues.source_id) newErrors.source_id = "Source is required.";
    if (!formValues.custom_post_field) newErrors.custom_post_field = "Custom post field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } 

    // Save or submit form data
    console.log("Form data:", formValues);
    save(nodeLabel);
    // Clear errors and form values
    setErrors({});
    setFormValues({
      ...formValues,
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
            value={formValues.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="error-msg">{errors.name}</div>}
          
          <label>
            API key:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="api_key"
            placeholder="Enter the api key"
            value={formValues.api_key}
            onChange={handleInputChange}
          />
          {errors.api_key && <div className="error-msg">{errors.api_key}</div>}
          
          <label>
            Password:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="password"
            placeholder="Enter the password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}
          
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
          {errors.domain && <div className="error-msg">{errors.domain}</div>}
          
          <label>
            Priority:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="priority_id"
            value={formValues.priority_id}
            onChange={handleInputChange}
          >
            <option value="">Select the priority</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.priority_id && <div className="error-msg">{errors.priority_id}</div>}
          
          <label>
            Send audio file:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audio_id"
            value={formValues.audio_id}
            onChange={handleInputChange}
          >
            <option value="">Select the audio File</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.audio_id && <div className="error-msg">{errors.audio_id}</div>}
          
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
          {errors.description && <div className="error-msg">{errors.description}</div>}
          
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
          {errors.subject && <div className="error-msg">{errors.subject}</div>}
          
          <label>
            Status:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="status_id"
            value={formValues.status_id}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.status_id && <div className="error-msg">{errors.status_id}</div>}
          
          <label>
            Source:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="source_id"
            value={formValues.source_id}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.source_id && <div className="error-msg">{errors.source_id}</div>}
          
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
          {errors.custom_post_field && <div className="error-msg">{errors.custom_post_field}</div>}
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" type="submit">
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
