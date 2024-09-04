import React, { useEffect, useState } from "react";
import Select from "react-select";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import Audio from "./Audio";
import "./Form.css";

const apiUrl = process.env.REACT_APP_API_URL;

// Define custom styles for react-select
const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Ensure dropdown is above other elements
    maxHeight: "150px", // Adjust as needed
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "120px", // Adjust as needed
    overflowY: "auto",
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "28px", // Decrease height of the select control
    height: "28px", // Decrease height of the select control
  }),
  
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px", // Adjust placeholder font size
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "14px", // Adjust selected value font size
  }),
};

const Announcement = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id,
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
    audio: "",
    repeat: "",
    des: "",
  });
  const [audioOptions, setAudioOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const announcementResponse = await fetch(`${apiUrl}/app_get_data_anoncment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });
        const announcementData = await announcementResponse.json();
        if (!announcementResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        if (announcementData.resp.error_code === "0") {
          const annData = announcementData.resp.app_data;
          setFormData((prevData) => ({
            lml: "66c7088544596",
            app_id: node.data.app_id,
            flow_id: flow_id,
            inst_id: node.id,
            nm: nodeLabel || "",
            audio: annData.audio_id || "",
            repeat: annData.repeat || "",
            des: annData.des || "",
          }));
        }

        const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });
        if (!audioResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }
        const audioData = await audioResponse.json();
        setAudioOptions(
          audioData.resp.aud_data.map((audio) => ({
            value: audio.auni,
            label: audio.anm,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nm") {
      handleLabelChange(e);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      audio: selectedOption ? selectedOption.value : "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.audio) newErrors.selectedValue = "Audio selection is required";
    if (!formData.repeat) newErrors.repeatCount = "Repeat Count is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const response = await fetch(`${apiUrl}/app_set_data_anoncment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        console.log("Form Data Saved:", formData);
        save(nodeLabel);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const handlePlusClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="announcement-container">
        <div className="form">
          <h3 style={{ textAlign: "center" }}>Announcement</h3>
          <button onClick={removeForm} className="remove-btn">
            <CiCircleRemove style={{ height: "25px", width: "25px" }} />
          </button>
          <hr />
          <div className="form-container">
            <label>
              Name:<span className="star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the Name"
              name="nm"
              value={formData.nm}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <label>
              Audio:<span className="star">*</span>
            </label>
            <div style={{ display: "flex" }}>
              <Select
                className="input-select"
                options={audioOptions}
                value={audioOptions.find((option) => option.value === formData.audio)}
                onChange={handleSelectChange}
                placeholder="Select the audio"
                styles={customStyles} // Apply custom styles
              />
              <button
                style={{
                  background: "green",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
                onClick={handlePlusClick}
              >
                +
              </button>
            </div>
            {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
            <label>
              Repeat count:<span className="star">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter the repeat count"
              name="repeat"
              value={formData.repeat}
              onChange={handleInputChange}
              min="0"
            />
            {errors.repeatCount && <p className="error">{errors.repeatCount}</p>}
            <label>Remarks</label>
            <textarea
              placeholder="write the remarks"
              rows="6"
              cols="40"
              name="des"
              value={formData.des}
              onChange={handleInputChange}
            />
          </div>
          <hr className="bottom-hr" />
          <div className="button-group">
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
      </div>
      {showPopup && <Audio handleClosePopup={handleClosePopup} />}
    </>
  );
};

export default Announcement;
