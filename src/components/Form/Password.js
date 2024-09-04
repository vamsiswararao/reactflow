import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


const Passwords = ({ node,nodeLabel, handleLabelChange, deleteNode, removeForm, save, copyNode,flow_id }) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    audio: "",
    pswd:'',
    suc_audio:'',
    fail_audio:'',
  });
  const [audioOptions, setAudioOptions] = useState([]); 
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const smsResponse = await fetch(`${apiUrl}/app_get_data_pword`,
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
        const smsData = await smsResponse.json();
        const smsFinalData=smsData.resp.app_data
        if (!smsResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  

        if(smsData.resp.error_code==="0"){

        setFormData((prevData) => ({
          
           lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          audio: smsFinalData.audio|| "", // Example of dynamic data usage
          pswd:smsFinalData.pswrd,
          suc_audio:smsFinalData.saudio,
          fail_audio:smsFinalData.faudio,
        }));

      }

                // Fetch audio options with the same data
                const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lml:"66c7088544596",
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
    if (!formData.nm) newErrors.nm = "Name is required";
    if (!formData.audio)
      newErrors.audio = "Audio selection is required";
    if (!formData.pswd)
      newErrors.pswd = "password is required";
    if (!formData.suc_audio)
      newErrors.suc_audio = "success audio selection is required";
    if (formData.pswd && formData.pswd.length < 8) newErrors.pswd = "Password must be at least 8 characters long";
    if (!formData.fail_audio)
      newErrors.fail_audio = "Fail audio selection is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_pword`, {
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
        <h3 style={{ textAlign: "center" }}>Password</h3>
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
            {errors.name && <p className="error">{errors.name}</p>}
          
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
              {errors.audio && <p className="error">{errors.audio}</p>}

          <label>Password:<span className="star">*</span></label>
          <input
            type="pswd"
            placeholder="Enter the password"
            value={formData.pswd}
            name="pswd"
            onChange={handleInputChange}
          />
            {errors.pswd && <p className="error">{errors.pswd}</p>}

          <label>Success audio:<span className="star">*</span></label>
          <select
                className="input-select"
                name="suc_audio"
                value={formData.suc_audio}
                onChange={handleInputChange}
              >
                <option value="">Select the audio</option>
                {audioOptions.map((audio, index) => (
                  <option key={index} value={audio.auni}>
                    {audio.anm}
                  </option>
                ))}
              </select>
              {errors.suc_audio && <p className="error">{errors.suc_audio}</p>}

          <label>Fail audio:<span className="star">*</span></label>
          <select
                className="input-select"
                name="fail_audio"
                value={formData.fail_audio}
                onChange={handleInputChange}
              >
                <option value="">Select the audio</option>
                {audioOptions.map((audio, index) => (
                  <option key={index} value={audio.auni}>
                    {audio.anm}
                  </option>
                ))}
              </select>
              {errors.fail_audio && <p className="error">{errors.fail_audio}</p>}
              </div>

        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default Passwords;
