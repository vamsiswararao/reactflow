import React, { useState, useEffect } from "react";
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://enrbgth6q54c8.x.pipedream.net`);
        const data = await response.json();
        if (data) {
          setUrl(data.url || "");
          setAdditionalParameters(data.additional_prm|| "");
          setRemarks(data.remarks || "");
          setIsToggled(data.create_crm !== undefined ? data.isToggled : true);
          setCrmType(data.crm_type || "");
          setAssignMiscellaneous(data.assign_Mis || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (nodeLabel) {
      fetchData();
    }
  }, [nodeLabel]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nodeLabel.trim()) newErrors.nodeLabel = "Name is required.";
    if (!url) newErrors.url = "URL is required.";
    if (!assignMiscellaneous) newErrors.assignMiscellaneous = "Assign miscellaneous is required.";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = {
      name: nodeLabel,
      url: url,
      additional_prm: additionalParameters,
      remarks: remarks,
      create_crm: isToggled,
      crm_type: crmType,
      assign_Mis: assignMiscellaneous,
    };

    try {
      const response = await fetch(`https://enrbgth6q54c8.x.pipedream.net`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Form Data Saved:", formData);
      save(nodeLabel);
    } catch (error) {
      console.error("Error saving data:", error);
    }

    // Reset form fields
    setUrl("");
    setAdditionalParameters("");
    setRemarks("");
    setIsToggled(true);
    setCrmType("");
    setAssignMiscellaneous("");
    setErrors({});
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
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}

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
          {errors.url && <p className="error">{errors.url}</p>}

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
          {errors.assignMiscellaneous && (
            <p className="error">{errors.assignMiscellaneous}</p>
          )}
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
