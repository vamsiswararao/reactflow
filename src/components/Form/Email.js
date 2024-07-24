import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const EmailFrom = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // Perform validations
    if (!selectedValue || subject.trim() === "" || message.trim() === "" ){
      alert("Please fill in all fields.");
      return;
    }

    // Construct your data object
    const formData = {
      name: nodeLabel,
      to: selectedValue,
      subject,
      message,
      description
    };

    // You can now save formData or pass it to a parent component via a callback
console.log(formData)
    // Example: onSave(formData);

    // Clear form after saving
    setSelectedValue("");
    setSubject("");
    setMessage("");
    setDescription("");
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Email</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input type="text" placeholder="Enter the Name" value={nodeLabel} onChange={handleLabelChange} />
          <label>To:<span className="star">*</span></label>
          <select
                    className="input-select"

            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option>Select</option>
            {[...Array(10)].map((_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label>Subject:<span className="star">*</span></label>
          <textarea
            placeholder="write the subject"
            rows="4"
            cols="40"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label>Message:<span className="star">*</span></label>
          <textarea
            placeholder="write the message"
            rows="4"
            cols="40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            placeholder="write the description"
            rows="6"
            cols="40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default EmailFrom;
