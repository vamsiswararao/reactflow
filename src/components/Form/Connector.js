import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const CollectorFrom = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save, // Function to handle saving form data
  copyNode
}) => {
  const [connectType, setConnectType] = useState("");
  const [distributionType, setDistributionType] = useState("");
  const [missedCallTo, setMissedCallTo] = useState("");
  const [holdTune, setHoldTune] = useState("");
  const [ringTime, setRingTime] = useState("");
  const [maxCallTime, setMaxCallTime] = useState("");
  const [url, setUrl] = useState("");
  const [sticky, setSticky] = useState(""); // State for Sticky radio button
  const [recording, setRecording] = useState(""); // State for Recording radio button
  const [enableQueue, setEnableQueue] = useState(""); // State for Enable Queue radio button

  const handleSaveClick = () => {
    // Basic validation example
    if (
      !nodeLabel ||
      !connectType ||
      !distributionType ||
      !missedCallTo ||
      !holdTune ||
      !holdTune ||
      !sticky ||
      !recording ||
      !enableQueue
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Gather all form data into an object
    const formData = {
      nodeLabel,
      connectType,
      distributionType,
      missedCallTo,
      holdTune,
      ringTime,
      maxCallTime,
      url,
      sticky,
      recording,
      enableQueue,
      // Add other form fields as needed
    };
    console.log(formData)
    // Call the handleSave function from props to save the data
    save();
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Connector</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
            required
          />
          <label>
            Call connect type:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            value={connectType}
            onChange={(e) => setConnectType(e.target.value)}
            required
          >
            <option value="">Select the call connect type</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <label>
            Call distribution type:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            value={distributionType}
            onChange={(e) => setDistributionType(e.target.value)}
            required
          >
            <option value="">Select the distribution type</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <label>Assign missedcall to:</label>
          <select
            className="input-select"
            value={missedCallTo}
            onChange={(e) => setMissedCallTo(e.target.value)}
          >
            <option value="">Select the assign missedCall</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
          <div className="radio">
          <label style={{width:'60px'}}>
          Sticky:<span className="star">*</span>
            </label>
            <input
              type="radio"
              name="sticky"
              value="yes"
              checked={sticky === "yes"}
              onChange={(e) => setSticky(e.target.value)}
            />
            <span>Yes</span>
            <input
              type="radio"
              name="sticky"
              value="no"
              checked={sticky === "no"}
              onChange={(e) => setSticky(e.target.value)}
            />
            <span>No</span>
          </div>
          <div className="radio">
          <label style={{width:'60px'}}>
          Recording:<span className="star">*</span>
            </label>
            <input
              type="radio"
              name="Recording"
              value="yes"
              checked={recording === "yes"}
              onChange={(e) => setRecording(e.target.value)}
            />
            <span>Yes</span>
            <input
              type="radio"
              name="Recording"
              value="no"
              checked={recording === "no"}
              onChange={(e) => setRecording(e.target.value)}
            />
            <span>No</span>
          </div>
          <div className="radio">
            <label style={{width:'60px'}}>
              Enable Queue:<span className="star">*</span>
            </label>
            <input
              type="radio"
              name="Queue"
              value="yes"
              checked={enableQueue === "yes"}
              onChange={(e) => setEnableQueue(e.target.value)}
            />
            <span>Yes</span>
            <input
              type="radio"
              name="Queue"
              value="no"
              checked={enableQueue === "no"}
              onChange={(e) => setEnableQueue(e.target.value)}
            />
            <span>No</span>
          </div>

          <label>
            Default hold tune:<span className="star">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter the ring time"
            value={holdTune}
            onChange={(e) => setHoldTune(e.target.value)}
          />

          <label>Ring time(sec):</label>
          <input
            type="number"
            placeholder="Enter the ring time"
            value={ringTime}
            onChange={(e) => setRingTime(e.target.value)}
          />
          <label>Max call time (sec):</label>
          <input
            type="number"
            placeholder="Enter the Max Call Time"
            value={maxCallTime}
            onChange={(e) => setMaxCallTime(e.target.value)}
          />
          <label>URL:</label>
          <input
            type="url"
            placeholder="Enter the url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSaveClick}>
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

export default CollectorFrom;
