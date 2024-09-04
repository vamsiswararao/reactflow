
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;





const MissedCallCallerTunes = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  node,
  flow_id,
  save
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    audio: "",
  });
  const [audioOptions, setAudioOptions] = useState([]); 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const callerTuneResponse = await fetch(
          `${apiUrl}/app_get_data_mcalltune`,
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
        const callerTuneData = await callerTuneResponse.json();
        console.log(callerTuneData.resp.app_data)
        const finalData = callerTuneData.resp.app_data;
        if (!callerTuneResponse.ok) {
          throw new Error("Failed to fetch data");
        }
       
        if(callerTuneData.resp.error_code==="0"){

        setFormData((prevData) => ({
          lml: "66c7088544596",
          app_id: node.data.app_id,
          // "5c93b0a9b0810",
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          audio: finalData.audio,
        }));
      } 
        // Fetch audio options with the same data
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
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_mcalltune`, {
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
  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Missed Call Callertune</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container">

          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the name"
            value={formData.nm}
            name="nm"
            onChange={handleInputChange}
            />
             <label>Audio:<span className="star">*</span></label>
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
              {errors.selectedValue && (
              <p className="error">{errors.selectedValue}</p>
            )}
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default MissedCallCallerTunes;
