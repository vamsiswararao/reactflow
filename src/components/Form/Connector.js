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
  copyNode,
}) => {
  const [connectType, setConnectType] = useState("");
  const [distributionType, setDistributionType] = useState("");
  const [missedCallTo, setMissedCallTo] = useState("");
  const [holdTune, setHoldTune] = useState("");
  const [ringTime, setRingTime] = useState("");
  const [maxCallTime, setMaxCallTime] = useState("");
  const [url, setUrl] = useState("");
  const [sticky, setSticky] = useState("yes"); // State for Sticky radio button
  const [recording, setRecording] = useState("yes"); // State for Recording radio button
  const [enableQueue, setEnableQueue] = useState("no"); // State for Enable Queue radio button
  const [queueType, setQueueType] = useState(""); // State for Queue Type dropdown
  const [queueTime, setQueueTime] = useState(""); // State for Queue Time input

  const handleSaveClick = () => {
    // Basic validation example
    if (
      !nodeLabel ||
      !connectType ||
      !distributionType ||
      !missedCallTo ||
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
      queueType,
      queueTime,
      // Add other form fields as needed
    };
    console.log(formData);
    // Call the handleSave function from props to save the data
    save(formData); // Pass the formData object
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
            <label style={{ maxWidth: "90px" }}>
              Sticky:<span className="star">*</span>
            </label>
            <input
              type="radio"
              className="blue-radio"
              name="sticky"
              value="yes"
              checked={sticky === "yes"}
              onChange={(e) => setSticky(e.target.value)}
            />
            <span>Yes</span>
            <input
              type="radio"
              className="blue-radio"
              name="sticky"
              value="no"
              checked={sticky === "no"}
              onChange={(e) => setSticky(e.target.value)}
            />
            <span>No</span>
          </div>
          <div className="radio">
            <label style={{ maxWidth: "90px" }}>
              Recording:<span className="star">*</span>
            </label>
            <input
              type="radio"
              className="blue-radio"
              name="Recording"
              value="yes"
              checked={recording === "yes"}
              onChange={(e) => setRecording(e.target.value)}
            />
            <span>Yes</span>
            <input
              type="radio"
              className="blue-radio"
              name="Recording"
              value="no"
              checked={recording === "no"}
              onChange={(e) => setRecording(e.target.value)}
            />
            <span>No</span>
          </div>
          <div className="radio">
            <label style={{ maxWidth: "90px" }}>
              Enable Queue:<span className="star">*</span>
            </label>
            <input
              type="radio"
              className="blue-radio"
              name="Queue"
              value="yes"
              checked={enableQueue === "yes"}
              onChange={(e) => setEnableQueue(e.target.value)}
            />
            <span>Yes</span>
            <input
              type="radio"
              className="blue-radio"
              name="Queue"
              value="no"
              checked={enableQueue === "no"}
              onChange={(e) => setEnableQueue(e.target.value)}
            />
            <span>No</span>
          </div>
          {enableQueue === "yes" && (
            <>
              <label>
                Queue Tune:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                value={queueType}
                onChange={(e) => setQueueType(e.target.value)}
                required
              >
                <option value="">Select the queue tune</option>
                {[...Array(10)]
                  .map((_, i) => i + 1)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
              </select>
              <label>Max time in Queue  (sec):</label>
              <input
                type="number"
                placeholder="Enter the queue time"
                value={queueTime}
                onChange={(e) => setQueueTime(e.target.value)}
              />
            </>
          )}

          <label>
            Default hold tune:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            value={holdTune}
            onChange={(e) => setHoldTune(e.target.value)}
          >
            <option value="">Select the default hold tune</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>

          <label>Ring time (sec):</label>
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
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: "20px", width: "20px" }} />
        </button>

        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default CollectorFrom;
