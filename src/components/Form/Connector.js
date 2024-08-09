import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const CollectorFrom = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save, // Function to handle saving form data
  copyNode,
  flow_id
}) => {
  const [connectType, setConnectType] = useState("");
  const [distributionType, setDistributionType] = useState("");
  const [missedCallTo, setMissedCallTo] = useState("");
  const [holdTune, setHoldTune] = useState("");
  const [ringTime, setRingTime] = useState("");
  const [maxCallTime, setMaxCallTime] = useState("");
  const [url, setUrl] = useState("");
  const [sticky, setSticky] = useState("yes");
  const [recording, setRecording] = useState("yes");
  const [enableQueue, setEnableQueue] = useState("no");
  const [queueType, setQueueType] = useState("");
  const [queueTime, setQueueTime] = useState("10");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!nodeLabel) newErrors.nodeLabel = "Name is required.";
    if (!connectType) newErrors.connectType = "Call connect type is required.";
    if (!distributionType) newErrors.distributionType = "Call distribution type is required.";
    if (!holdTune) newErrors.holdTune = "Hold tune is required.";
    if (!sticky) newErrors.sticky = "Sticky selection is required.";
    if (!recording) newErrors.recording = "Recording selection is required.";
    if (!enableQueue) newErrors.enableQueue = "Queue enable selection is required.";
    if (enableQueue === "yes" && !queueType) newErrors.queueType = "Queue type is required.";
    return newErrors;
  };

  const handleSaveClick = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

  
    
   
   
    
    


    const formData = {
      app_id:node.data.app_id ,
      // "5c93b0a9b0810",
      flow_id: flow_id,
      inst_id:node.id,
      name: nodeLabel,
      call_cnt_type_id:connectType,
      call_dst_type_id:distributionType,
      assign_msd_call_id:missedCallTo,
      default_hold_tune:holdTune,
      ring_time:ringTime,
      max_call_time:maxCallTime,
      url,
      sticky,
      recording,
      enable_quene:enableQueue,
      queueType,
      queueTime,
    };

    try {
      const response = await fetch("https://enrbgth6q54c8.x.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      //const data = await response.json();
      console.log("Data saved:", formData);
      save(formData); // Pass the formData object to the save function
      setErrors({}); // Clear errors after successful save
    } catch (error) {
      console.error("Error saving data:", error);
      setErrors({ global: "Error saving data. Please try again." });
    }
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
          {errors.global && <p className="error global-error">{errors.global}</p>}
          
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
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}

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
          {errors.connectType && <p className="error">{errors.connectType}</p>}

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
          {errors.distributionType && <p className="error">{errors.distributionType}</p>}

          <label>Assign missed call to:</label>
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
          {errors.sticky && <p className="error">{errors.sticky}</p>}

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
          {errors.recording && <p className="error">{errors.recording}</p>}

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
          {errors.enableQueue && <p className="error">{errors.enableQueue}</p>}

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
              {errors.queueType && <p className="error">{errors.queueType}</p>}

              <label>Max time in Queue (sec):</label>
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
