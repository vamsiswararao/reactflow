import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const SlackForm = ({ node,nodeLabel, handleLabelChange, deleteNode, removeForm, save, copyNode, flow_id }) => {
  // State for form fields
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  // State for error messages
  const [errors, setErrors] = useState({ nodeLabel: '', url: '', message: '' });

  // Handle save button click
  const handleSave = () => {
    let hasError = false;
    const newErrors = { nodeLabel: '', url: '', message: '' };

    if (nodeLabel.trim() === '') {
      newErrors.nodeLabel = 'Name is required';
      hasError = true;
    }

    if (url.trim() === '') {
      newErrors.url = 'URL is required';
      hasError = true;
    }

    if (message.trim() === '') {
      newErrors.message = 'Message is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      const formData = {
        app_id:node.data.app_id ,
        // "5c93b0a9b0810",
        flow_id: flow_id,
        inst_id:node.id,
        name:nodeLabel,
        url,
        message,
      };

      // Save the data to a dummy API
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          save(nodeLabel); // Call save function after successful API call
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Slack</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input 
            type="text" 
            placeholder="Enter the Name" 
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}

          <label>Url:<span className="star">*</span></label>
          <textarea 
            type="url" 
            placeholder="write the url" 
            rows="4" 
            cols="40"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && <p className="error">{errors.url}</p>}

          <label>Message:<span className="star">*</span></label>
          <textarea 
            placeholder="write the message" 
            rows="4" 
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default SlackForm;
