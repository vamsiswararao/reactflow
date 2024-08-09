import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const CollectorForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode, 
  flow_id

}) => {
  const [audio, setAudio] = useState("");
  const [description, setDescription] = useState("");
  const [dtmfKey, setDtmfKey] = useState("");
  const [keyLength, setKeyLength] = useState("");
  const [timeout, setTimesOut] = useState("");
  const [repeatCount, setRepeatCount] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!nodeLabel) newErrors.nodeLabel = "Name is required.";
    if (!audio) newErrors.audio = "Audio selection is required.";
    if (!dtmfKey) newErrors.dtmfKey = "DTMF finish key is required.";
    if (!keyLength) newErrors.keyLength = "Key length is required.";
    if (!timeout) newErrors.timeout = "Timeout is required.";
    return newErrors;
  };

  const handleSave = async () => {
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
      audio_id: audio,
      dtmf_key_finish: dtmfKey,
      key_length: keyLength,
      time_out: timeout,
      repeat_cnt: repeatCount,
      description: description,
    };

    try {
      // Simulate POST request to a dummy URL
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

      console.log("Form Data Saved:", formData);

      // Clear form fields and errors after successful save
      setAudio("");
      setDescription("");
      setDtmfKey("");
      setKeyLength("");
      setTimesOut("");
      setRepeatCount("");
      setErrors({});

      // Call save callback if needed
      save(nodeLabel); // Assuming save function handles the logic after saving
    } catch (error) {
      console.error("Error saving form data:", error);
      // Handle error state or retry logic
    }
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Collector</h3>
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

          <label>Audio:<span className="star">*</span></label>
          <select
            className="input-select"
            value={audio}
            onChange={(e) => setAudio(e.target.value)}
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
          {errors.audio && <p className="error">{errors.audio}</p>}

          <label>DTMF finish key:<span className="star">*</span></label>
          <input
            value={dtmfKey}
            placeholder="Enter the DTMF finish key"
            onChange={(e) => setDtmfKey(e.target.value)}
          />
          {errors.dtmfKey && <p className="error">{errors.dtmfKey}</p>}

          <label>Key length:<span className="star">*</span></label>
          <input
            value={keyLength}
            placeholder="Enter the key length"
            onChange={(e) => setKeyLength(e.target.value)}
          />
          {errors.keyLength && <p className="error">{errors.keyLength}</p>}

          <label>Timeout:<span className="star">*</span></label>
          <input
            value={timeout}
            placeholder="Enter the timeout"
            onChange={(e) => setTimesOut(e.target.value)}
          />
          {errors.timeout && <p className="error">{errors.timeout}</p>}

          <label>Repeat count:</label>
          <input
            value={repeatCount}
            placeholder="Enter the repeat count"
            onChange={(e) => setRepeatCount(e.target.value)}
          />

          <label>Description:</label>
          <textarea
            placeholder="Write the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            cols="40"
          />
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>
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

export default CollectorForm;
