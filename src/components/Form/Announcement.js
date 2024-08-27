import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import Audio from "./Audio"

import "./Form.css";
const apiUrl = process.env.REACT_APP_API_URL;

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
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    audio: "",
    repeat: "",
    des: "",
  });
  const [audioOptions, setAudioOptions] = useState([]); 
  const [errors, setErrors] = useState({});

  // Fetch data from dummy URL on component mount
  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const announcementResponse = await fetch(`${apiUrl}/app_get_data_anoncment`,
           {
           method: "POST", // Specify the PUT method
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          body: JSON.stringify({
            lml: "66b9dee3ef1ca",
            flow_id: "66c708df247df", // Use the provided flow_id
            app_id: node.data.app_id, // Use the provided app_id
            inst_id: node.id, // Use the provided inst_id
          }),
        }
        );
        const announcementData = await announcementResponse.json();
        //console.log(announcementData.resp.app_data)
        const annData= announcementData.resp.app_data
        if (!announcementResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  
        setFormData((prevData) => ({
          
           lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          audio: annData.audio_id, // Example of dynamic data usage
          repeat: annData.repeat, // Example of dynamic data usage
          des: annData.des, // Example of dynamic data usage
        }));

                // Fetch audio options with the same data
                const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lml:"66b9dee3ef1ca",
                    flow_id: flow_id,
                    app_id: node.data.app_id,
                    inst_id: node.id,
                  }),
                });
        
                if (!audioResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const audioData = await audioResponse.json();
                setAudioOptions(audioData.resp.aud_data || []);
                //console.log(audioData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nm") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    console.log(formData.nm)
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.audio)
      newErrors.selectedValue = "Audio selection is required";
    if (!formData.repeat)
      newErrors.repeatCount = "Repeat Count is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_anoncment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        console.log("Form Data Saved:", formData);
        save(nodeLabel); // Call the save handler from props
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
            <select
                className="input-select"
                name="audio"
                value={formData.audio}
                onChange={handleInputChange}
              >
                <option value="">Select the audio</option>
                {audioOptions.map((audio, index) => (
                  <option key={index} value={audio.auni}>
                    {audio.anm}
                  </option>
                ))}
              </select>
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
            {errors.selectedValue && (
              <p className="error">{errors.selectedValue}</p>
            )}
            <label>
              Repeat count:<span className="star">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter the repeat count"
              name="repeat"
              value={formData.repeat}
              onChange={handleInputChange}
            />
            {errors.repeatCount && (
              <p className="error">{errors.repeatCount}</p>
            )}
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
      {showPopup && <Audio handleClosePopup={handleClosePopup}/>}
    </>
  );
};

export default Announcement;
