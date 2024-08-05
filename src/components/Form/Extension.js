import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const Extensions = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
}) => {
  
  const [name, setName] = useState("");
  const [audio, setAudio] = useState("");
  const [retries, setRetries] = useState("1");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // Perform validation
    if (!nodeLabel || !audio || !retries) {
      alert("Please fill in all fields.");
      return;
    }

    // Save data or perform any other action
    const formData = {
      name: nodeLabel || "",
      audio,
      retries,
      description,
    };
    console.log("Form data:", formData);
    setName("");
    setAudio("");
    setRetries("");
    setDescription("");
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Extension</h3>
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
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          <label>
            Audio:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            value={audio}
            onChange={(e) => setAudio(e.target.value)}
          >
            <option>Select the audio</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <label>
            Retries:<span className="star">*</span>
          </label>

          <select
            className="input-select"
            value={retries}
            onChange={(e) => setRetries(e.target.value)}
          >
            {[...Array(2)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
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

export default Extensions;
