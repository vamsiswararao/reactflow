import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_API_URL;

const CollectorForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id,
}) => {
  const [audioOptions, setAudioOptions] = useState([]);
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
    audio: "",
    des: "",
    finish_key: "",
    key_length: "",
    time_out: "",
    repeat: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
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
        setAudioOptions(audioData.resp.aud_data || []);

        const CollectorResponse = await fetch(
          `${apiUrl}/app_get_data_collector`,
          {
            method: "POST", // Specify the PUT method
            headers: {
              "Content-Type": "application/json", // Ensure the content type is JSON
            },
            body: JSON.stringify({
              lml: "66c7088544596",
              flow_id: "66c708df247df", // Use the provided flow_id
              app_id: node.data.app_id, // Use the provided app_id
              inst_id: node.id, // Use the provided inst_id
            }),
          }
        );
        const announcementData = await CollectorResponse.json();
        //console.log(announcementData.resp.app_data)
        const collData = announcementData.resp.app_data;
        console.log(collData);
        if (!CollectorResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        if(announcementData.resp.error_code==="0"){
        setFormData((prevData) => ({
          lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          key_length: collData.key_length,
          finish_key: collData.finish_key,
          time_out: collData.time_out,
          audio: collData.audio, // Example of dynamic data usage
          repeat: collData.repeat, // Example of dynamic data usage
          des: collData.des, // Example of dynamic data usage
        }));
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.nodeLabel = "Name is required.";
    if (!formData.audio) newErrors.audio = "Audio selection is required.";
    if (!formData.finish_key)
      newErrors.dtmfKey = "DTMF finish key is required.";
    if (!formData.key_length) newErrors.keyLength = "Key length is required.";
    if (!formData.time_out) newErrors.timeout = "Timeout is required.";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/app_set_data_collector`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      console.log("Form Data Saved:", formData);
      setErrors({});
      save(formData.nm);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

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

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Collector</h3>
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
            name="nm"
            placeholder="Enter the Name"
            value={formData.nm}
            onChange={handleInputChange}
          />
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}

          <label>
            Audio:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audio"
            value={formData.audio}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {audioOptions.map((audio, index) => (
              <option key={index} value={audio.auni}>
                {audio.anm}
              </option>
            ))}
          </select>
          {errors.audio && <p className="error">{errors.audio}</p>}

          <label>
            DTMF finish key:<span className="star">*</span>
          </label>
          <input
            type="number"
            min="0"
            name="finish_key"
            value={formData.finish_key}
            placeholder="Enter the DTMF finish key"
            onChange={handleInputChange}
          />
          {errors.dtmfKey && <p className="error">{errors.dtmfKey}</p>}

          <label>
            Key length:<span className="star">*</span>
          </label>
          <input
            type="number"
            min="0"
            name="key_length"
            value={formData.key_length}
            placeholder="Enter the key length"
            onChange={handleInputChange}
          />
          {errors.keyLength && <p className="error">{errors.keyLength}</p>}

          <label>
            Timeout:<span className="star">*</span>
          </label>
          <input
            type="number"
            min="0"
            name="time_out"
            value={formData.time_out}
            placeholder="Enter the timeout"
            onChange={handleInputChange}
          />
          {errors.timeout && <p className="error">{errors.timeout}</p>}

          <label>Repeat count:</label>
          <input
            type="number"
            min="0"
            name="repeat"
            value={formData.repeat}
            placeholder="Enter the repeat count"
            onChange={handleInputChange}
          />

          <label>Description:</label>
          <textarea
            name="des"
            placeholder="Write the description"
            value={formData.des}
            onChange={handleInputChange}
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
