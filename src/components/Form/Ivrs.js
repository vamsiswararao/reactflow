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
  flow_id,
  lml
}) => {
  const { data } = node;
  const { IvrsPorts } = data;
  const [port, setPort] = useState(IvrsPorts);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    audio: "",
    Ivrs_ports: port,
    repeat_cnt: "",
    dial_time_out: "",
    repeat_key: "0",
    no_dtmf_audio: "",
    invalid_dtmf_audio: "",
    des: "",
  });

  useEffect(() => {
    setPort(IvrsPorts);
  }, [IvrsPorts]);

  const [audioOptions, setAudioOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const ivrsResponse = await fetch(`${apiUrl}/app_get_data_ivrs`,
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
        const data = await ivrsResponse.json();
        console.log(data.resp.app_data)
        const ivrsData= data.resp.app_data
        if (!ivrsResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        if(data.resp.error_code==="0"){

        setFormData((prevData) => ({

           lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          audio:ivrsData.audio,
          Ivrs_ports: ivrsData.ivrs_ports || port,
          repeat_cnt: ivrsData.retries, // Example of dynamic data usage
          dial_time_out: ivrsData.dto,
          repeat_key: ivrsData.repeat_key|| "0",
          no_dtmf_audio: ivrsData.nodt_audio,
          invalid_dtmf_audio: ivrsData.inv_audio,
          des: "",
        }));
      }

        // Fetch audio options with the same data

        const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: lml,
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });

        if (!audioResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const audioData = await audioResponse.json();
        console.log(audioData);
        setAudioOptions(audioData.resp.aud_data || []);
        //console.log(audioData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node, apiUrl,lml,port]);

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
    console.log(formData.audio);
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.audio)
      newErrors.audio = "Audio selection is required";
    if (!formData.repeat_cnt)
      newErrors.repeatCount = "Repeat Count is required";
    if (!formData.dial_time_out) newErrors.dial_time_out = "Dialtimeout is required";
    if (!formData.no_dtmf_audio)
      newErrors.noDtmfAudio = "noDtmfAudio is required";
    if (!formData.invalid_dtmf_audio)
      newErrors.invalidDtmfAudio = "invalidDtmfAudio is required";
    return newErrors;
  };

  const handlePortChange = (index) => {
    const updatedPorts = [...port]; // Create a copy
    updatedPorts[index] = !updatedPorts[index]; // Toggle the value
    setPort(updatedPorts);
    handleCheckboxChange(updatedPorts);
    setFormData((prevData) => ({
      ...prevData,
     Ivrs_ports: updatedPorts,
   }));
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_ivrs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        console.log(formData);
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
            name="nm"
            value={formData.nm}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <div>
            <label>
              Audio:<span className="star">*</span>
            </label>
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
          </div>
          {errors.audio && <p className="error">{errors.audio}</p>}
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
            type="number"
            placeholder="Enter the no of repeats"
            name="repeat_cnt"
            value={formData.repeat_cnt}
            onChange={handleInputChange}
            min="0"
          />
          {errors.repeatCount && <p className="error">{errors.repeatCount}</p>}
          <label>
            Dial timeout (sec):<span className="star">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter the dial timeout"
            name="dial_time_out"
            value={formData.dial_time_out}
            onChange={handleInputChange}
            min="0"
          />
          <label>
          {errors.dial_time_out && <p className="error">{errors.dial_time_out}</p>}
            Repeat key:<span className="star">*</span>
          </label>
          <div style={{ display: "flex" }}>
            <select
              className="input-select"
              value={formData.repeat_key}
              name="repeat_key"
              onChange={handleInputChange}
            >
              {[...Array(10)]
                .map((_, i) => i)
                .map((i) => (
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
              name="no_dtmf_audio"
              value={formData.no_dtmf_audio}
              onChange={handleInputChange}
            >
              <option value="">Select the audio</option>
              {audioOptions.map((audio, index) => (
                <option key={index} value={audio.auni}>
                  {audio.anm}
                </option>
              ))}
            </select>
          </div>
          {errors.repeatCount && <p className="error">{errors.repeatCount}</p>}
          <div>

            <label>
              Invalid DTMF audio:<span className="star">*</span>
            </label>
            <select
              className="input-select"
              name="invalid_dtmf_audio"
              value={formData.invalid_dtmf_audio}
              onChange={handleInputChange}
            >
              <option value="">Select the audio</option>
              {audioOptions.map((audio, index) => (
                <option key={index} value={audio.auni}>
                  {audio.anm}
                </option>
              ))}
            </select>
          </div>
          {errors.repeatCount && <p className="error">{errors.repeatCount}</p>}
          <label>Description:</label>
          <textarea
            type="text"
            placeholder="Enter the description"
            rows="6"
            cols="40"
            name="des"
            value={formData.des}
            onChange={handleInputChange}
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
