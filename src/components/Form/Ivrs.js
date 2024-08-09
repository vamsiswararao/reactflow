import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const Ivrs = ({
  node,
  nodeLabel,
  handleLabelChange,
  handleCheckboxChange,
  visiblePorts,
  deleteNode,
  removeForm,
  copyNode,
  save,
}) => {
  const { data } = node;
  const { IvrsPorts } = data;
  const [port, setPort] = useState(IvrsPorts);
  const [name, setName] = useState(nodeLabel);
  const [audio, setAudio] = useState("");
  const [repeats, setRepeats] = useState("");
  const [dialTimeout, setDialTimeout] = useState("");
  const [repeatKey, setRepeatKey] = useState("");
  const [noDtmfAudio, setNoDtmfAudio] = useState("");
  const [invalidDtmfAudio, setInvalidDtmfAudio] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setPort(IvrsPorts);
  }, [IvrsPorts]);

  const handlePortChange = (index) => {
    const updatedPorts = port.map((checked, i) =>
      i === index ? !checked : checked
    );
    setPort(updatedPorts);
    handleCheckboxChange(updatedPorts);
  };

  const handleSave = () => {
    const formData = {
      name:nodeLabel || "",
      audio_id:audio,
      repeats,
      dial_time_out:dialTimeout,
      repeat_key:repeatKey,
      no_dtmf_audio:noDtmfAudio,
      invalid_dtmf_audio:invalidDtmfAudio,
      description,
      ports: port,
    };
    console.log(formData); // Log the form data
    save(nodeLabel); // Save the node data with node ID
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>IVRS</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <label>
              Audio:<span className="star">*</span>
            </label>
            <select
              className="input-select"
              name="selectedValue"
              value={audio}
              onChange={(e) => setAudio(e.target.value)}
            >
              <option value="">Select the audio</option>
              {[...Array(10)].map((_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Ivrs</label>
            <div style={{ display: "flex", width: "350px", flexWrap: "wrap" }}>
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "6px",
                  }}
                >
                  <label>{index} </label>
                  <input
                    style={{ margin: "7px", width: "22px" }}
                    type="checkbox"
                    checked={port[index]}
                    onChange={() => handlePortChange(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <label>
            No of repeats:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the no of repeats"
            value={repeats}
            onChange={(e) => setRepeats(e.target.value)}
          />
          <label>
            Dial timeout (sec):<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the dial timeout"
            value={dialTimeout}
            onChange={(e) => setDialTimeout(e.target.value)}
          />
          <label>
            Repeat key:<span className="star">*</span>
          </label>
          <div style={{ display: "flex" }}>
            <select
              className="input-select"
              value={repeatKey}
              onChange={(e) => setRepeatKey(e.target.value)}
            >
              <option value="">Select...</option>
              {[...Array(10)].map((_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>
              No DTMF audio:<span className="star">*</span>
            </label>
            <select
              className="input-select"
              name="selectedValue"
              value={noDtmfAudio}
              onChange={(e) => setNoDtmfAudio(e.target.value)}
            >
              <option value="">Select the audio</option>
              {[...Array(10)].map((_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>
              Invalid DTMF audio:<span className="star">*</span>
            </label>
            <select
              className="input-select"
              name="selectedValue"
              value={invalidDtmfAudio}
              onChange={(e) => setInvalidDtmfAudio(e.target.value)}
            >
              <option value="">Select the audio</option>
              {[...Array(10)].map((_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <label>Description:</label>
          <textarea
            type="text"
            placeholder="Enter the description"
            rows="6"
            cols="40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">
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

export default Ivrs;
