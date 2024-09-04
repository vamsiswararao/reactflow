import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;



const StickyAgentForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {

  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    audio: "",
    hold_audio:'',
    connect_to:'',
    dep_uniq: "",
    des: "",
  });


  const [audioOptions, setAudioOptions] = useState([]); 
  const [departmentsOptions, setDepartmentsOptions] = useState([]); 

  const [errors, setErrors] = useState({});

  const [description, setDescription] = useState("");



  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const stickyResponse = await fetch(`${apiUrl}/app_get_data_stickyagnt`,
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
        const stickyData = await stickyResponse.json();
        //console.log(announcementData.resp.app_data)
        const annData= stickyData.resp.app_data
        console.log(annData)
        if (!stickyResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  

        if(stickyData.resp.error_code==="0"){
        setFormData((prevData) => ({
          
           lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          audio: annData.audio_id || "", // Example of dynamic data usage
          hold_audio:annData.hold_audio || "",
          connect_to:annData.connect_to|| "",
          dep_uniq: annData.dep_uniq || "",
          des: annData.des || "",
        }));
      }

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



                const departmentsResponse = await fetch(`${apiUrl}/app_get_departments`, {
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
        
                if (!departmentsResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const departmentsData = await departmentsResponse.json();
                setDepartmentsOptions(departmentsData.resp.aud_data || []);
                console.log(departmentsData.resp.aud_data)
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
    if (!formData.hold_audio)
      newErrors.hold_audio = "Repeat Count is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_stickyagnt`, {
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
        <h3 style={{ textAlign: "center" }}>Sticky Agent</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the name"
            value={formData.nm}
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
          <label>Hold tune:<span className="star">*</span></label>
          <select
                className="input-select"
                name="hold_audio"
                value={formData.hold_audio}
                onChange={handleInputChange}
              >
                <option value="">Select the HoldTune</option>
                {audioOptions.map((hold, index) => (
                  <option key={index} value={hold.auni}>
                    {hold.anm}
                  </option>
                ))}
              </select>
              {errors.hold_audio && (
              <p className="error">{errors.hold_audio}</p>
            )}
          <label>Connect to:<span className="star">*</span></label>
          <select
                className="input-select"
                name="connect_to"
                value={formData.connect_to}
                onChange={handleInputChange}
              >
                <option value="">Select... </option>
                <option value="11">Last Dialed answered</option>
                <option value="12">Last Dialed Not answered</option>
                <option value="13">Last Dialed</option>
              </select>
          <label>Department:<span className="star">*</span></label>
          <div className="line">
          <select
                className="input-select"
                name="dep_uniq"
                value={formData.dep_uniq}
                onChange={handleInputChange}
              >
                <option value="">Select the department</option>
                {departmentsOptions.map((dep, index) => (
                  <option key={index} value={dep.mu}>
                    {dep.dn}
                  </option>
                ))}
              </select>
          </div>
          <label>Description:</label>
          <textarea
            type="text"
            rows="6"
            cols="40"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

export default StickyAgentForm;
