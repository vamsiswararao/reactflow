import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const SlackForm = ({ nodeLabel, handleLabelChange, deleteNode, removeForm,save,copyNode }) => {
  // State for form fields
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  // Validation function


  // Handle save button click
  const handleSave = () => {
    if (nodeLabel.trim() !== '' && url.trim() !== '' && message.trim() !== '') {
      console.log({
        nodeLabel,
        url,
        message,
      });
      save()
      // Clear the form or proceed with form submission logic
    } else {
      alert('All fields are required.');
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
          <label>Url:<span className="star">*</span></label>
          <textarea 
            type="url" 
            placeholder="write the url" 
            rows="4" 
            cols="40"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <label>Message:<span className="star">*</span></label>
          <textarea 
            placeholder="write the message" 
            rows="4" 
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
