import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const CollectorFrom = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [description, setDescription] = useState("");
  const [dtmfKey, setDtmfKey] = useState("");
  const [keyLength, setKeyLength] = useState("");
  const [timeout, setTimeout] = useState("");
  const [repeatCount, setRepeatCount] = useState("");


  

  const handleSave = () => {
    if (!nodeLabel || !selectedValue || !dtmfKey || !keyLength || !timeout ){
        alert("Please fill in all required fields.");
        return;
      
    }
    const formData = {
      nodeLabel: nodeLabel,
      description: description,
      selectedValue: selectedValue,
      dtmfKey: dtmfKey,
      keyLength: keyLength,
      timeout: timeout,
      repeatCount: repeatCount
    };
    
    console.log("Form Data:", formData);
    save(nodeLabel)
    // Clear form fields and errors
    setSelectedValue("");
    setDescription("");
    setDtmfKey("");
    setKeyLength("");
    setTimeout("");
    setRepeatCount("");
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Collector</h3>
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
          <label>Audio:<span className="star">*</span></label>
          <select className="input-select"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Select the audio</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          
          <label>DTMF finish key<span className="star">*</span></label>
          <input 
            value={dtmfKey}
            placeholder="Enter the dtmf finish key"
            onChange={(e) => setDtmfKey(e.target.value)}
          />

          <label>Key length<span className="star">*</span></label>
          <input 
            value={keyLength}
            placeholder="Enter the key length"
            onChange={(e) => setKeyLength(e.target.value)}
          />

          <label>Timeout<span className="star">*</span></label>
          <input 
            value={timeout}
            placeholder="Enter the timeout"
            onChange={(e) => setTimeout(e.target.value)}
          />

          <label>Repeat count</label>
          <input 
            value={repeatCount}
            placeholder="Enter the repeat count"
            onChange={(e) => setRepeatCount(e.target.value)}
          />
          
          <label>Description</label>
          <textarea
            placeholder="Write the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            cols="40"
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

export default CollectorFrom;
