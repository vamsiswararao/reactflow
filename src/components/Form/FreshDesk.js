import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


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
  const [formData, setFormData] = useState({
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
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
  const [audioOptions, setAudioOptions] = useState([]); 


  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        // const announcementResponse = await fetch(`${apiUrl}/app_get_data_anoncment`,
        //    {
        //    method: "POST", // Specify the PUT method
        //   headers: {
        //     "Content-Type": "application/json", // Ensure the content type is JSON
        //   },
        //   body: JSON.stringify({
        //     lml: "66c7088544596",
        //     flow_id: "66c708df247df", // Use the provided flow_id
        //     app_id: node.data.app_id, // Use the provided app_id
        //     inst_id: node.id, // Use the provided inst_id
        //   }),
        // }
        // );
        // const announcementData = await announcementResponse.json();
        // console.log(announcementData)
        // const annData= announcementData.resp.app_data
        // console.log(annData)
        // if (!announcementResponse.ok) {
        //   throw new Error("Failed to fetch data");
        // }
  
        // setFormData((prevData) => ({
          
        //    lml: "66c7088544596",
        //   app_id: node.data.app_id,
        //   flow_id: flow_id,
        //   inst_id: node.id,
        //   nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
        //   audio: annData.audio_id || "", // Example of dynamic data usage
        //   repeat: annData.repeat || "", // Example of dynamic data usage
        //   des: annData.des || "", // Example of dynamic data usage
        // }));

                // Fetch audio options with the same data
                const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lml:"66c7088544596",
                    flow_id: flow_id,
                    app_id: node.data.app_id,
                    inst_id: node.id,
                  }),
                });
        
                if (!audioResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const audioData = await audioResponse.json();
                setAudioOptions(audioData.resp.aud_data || []);
                console.log(audioData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nm") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.api_key) newErrors.api_key = "API key is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.domain) newErrors.domain = "Domain is required.";
    if (!formData.priority_id) newErrors.priority_id = "Priority is required.";
    if (!formData.audio_id) newErrors.audio_id = "Audio is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.status_id) newErrors.status_id = "Status is required.";
    if (!formData.source_id) newErrors.source_id = "Source is required.";
    if (!formData.custom_post_field) newErrors.custom_post_field = "Custom post field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } 

    // Save or submit form data
    console.log("Form data:", formData);
    save(nodeLabel);
    // Clear errors and form values
    setErrors({});
    setFormData({
      ...formData,
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
            value={formData.nm}
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
            value={formData.api_key}
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
            value={formData.password}
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
            value={formData.domain}
            onChange={handleInputChange}
          />
          {errors.domain && <div className="error-msg">{errors.domain}</div>}
          
          <label>
            Priority:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="priority_id"
            value={formData.priority_id}
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
                name="audio"
                value={formData.audio}
                onChange={handleInputChange}
              >
                <option value="">Select the audio</option>
                {audioOptions.map((audio, index) => (
                  <option key={index} value={audio.auni}>
                    {audio.anm}
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
            value={formData.description}
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
            value={formData.subject}
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
            value={formData.status_id}
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
            value={formData.source_id}
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
            value={formData.custom_post_field}
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
