import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const BitrixForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [isToggled, setIsToggled] = useState(true);
  const [url, setUrl] = useState("");
  const [additionalParameters, setAdditionalParameters] = useState("");
  const [remarks, setRemarks] = useState("");
  const [crmType, setCrmType] = useState("");
  const [assignMiscellaneous, setAssignMiscellaneous] = useState("");

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSave = () => {
    // Form validation
    if (!nodeLabel.trim() || !url || !assignMiscellaneous) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      name: nodeLabel,
      url: url,
      additionalParameters: additionalParameters,
      remarks: remarks,
      isToggled: isToggled,
      crmType: crmType,
      assignMiscellaneous: assignMiscellaneous,
    };
    console.log("Form Data:", formData);

    // Reset form fields
    setUrl("");
    setAdditionalParameters("");
    setRemarks("");
    setIsToggled(true);
    setCrmType("");
    setAssignMiscellaneous("");
    save(nodeLabel);
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Bitrix</h3>
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
          />
          <label>
            Url:<span className="star">*</span>
          </label>
          <textarea
            type="text"
            placeholder="Enter the url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            rows="6"
            cols="40"
          />
          <label>Additional parameters:</label>
          <textarea
            type="text"
            placeholder="Enter the additional parameters"
            value={additionalParameters}
            onChange={(e) => setAdditionalParameters(e.target.value)}
            rows="6"
            cols="40"
          />

          <div style={{ display: "flex", alignItems: "center" }}>
            <p>Create CRM:</p>
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>No</p>

            <div className="toggle-switch" onClick={handleToggle}>
              <div
                className={`switch ${isToggled ? "toggled" : "non-toggled"}`}
              >
                {isToggled ? (
                  <i className="icon-on"></i> // Icon when toggled on
                ) : (
                  <i className="icon-off"></i> // Icon when toggled off
                )}
              </div>
            </div>
            <p style={{ marginLeft: "10px" }}>Yes</p>
          </div>

          <label>CRM type:</label>
          <select
            className="input-select"
            value={crmType}
            onChange={(e) => setCrmType(e.target.value)}
          >
            <option value="">Select the CRM type</option>
            <option value="Contact">Contact</option>
            <option value="Company">Company</option>
            <option value="Lead">Lead</option>
          </select>
          <label>
            Assign miscellaneous to:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            value={assignMiscellaneous}
            onChange={(e) => setAssignMiscellaneous(e.target.value)}
          >
            <option value="">Select the assign miscellaneous</option>
            {[...Array(10)]
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
        </div>

        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: '20px', width: '20px' }} />
        </button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default BitrixForm;
