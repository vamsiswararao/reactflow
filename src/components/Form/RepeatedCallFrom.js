import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


const RepeatedCallForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  lml,
  flow_id,
  node
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    time_hours: "",
    cal_status: "",
    calls_cnt: "",
    dids:"",
    des:''
  });

//   {
//     "lml":"66b9dee3ef1ca",
//     "nm":"Repeated Calls",
//     "time_hours":"2",
//     "cal_status":"1",
//      "calls_cnt":"2",
//     "dids":"1220",
//     "des":"testingesrhstuhtr",
//     "flow_id":"66aa1b1600fed",
//     "app_id":"ccfa929d-75cc-4103-bebd-0a2e2f68ffc7",
//     "inst_id":"66a78a1b3500204395"
//  }
 
  const [errors, setErrors] = useState({});
  const [didOptions, setDidOptions] = useState([]); 


  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const repeatResponse = await fetch(`${apiUrl}/app_get_data_repcals`,
           {
           method: "POST", // Specify the PUT method
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          body: JSON.stringify({
            lml:lml,
            flow_id: flow_id, // Use the provided flow_id
            app_id: node.data.app_id, // Use the provided app_id
            inst_id: node.id, // Use the provided inst_id
          }),
        }
        );
        const repeatData = await repeatResponse.json();
        console.log(repeatData)
        const repData= repeatData.resp.app_data
        console.log(repData)
        if (!repeatResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        if(repeatData.resp.error_code==="0"){

        setFormData((prevData) => ({
          
           lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          time_hours: repData.time_hours,
          cal_status: repData.cal_status,
          calls_cnt: repData.calls_cnt,
          dids: repData.dids,
          des:repData.des
        }));

              }        // Fetch audio options with the same data
                
                
                const didResponse = await fetch(`${apiUrl}/app_get_dids`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lml:lml,
                    flow_id: flow_id,
                    app_id: node.data.app_id,
                    inst_id: node.id,
                  }),
                });
        
                if (!didResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const didData = await didResponse.json();
                console.log(didData)
                setDidOptions(didData.resp.users_drpdwn|| []);
                //console.log(audioData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node,lml]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.cal_status) newErrors.status = "Status selection is required";
    if (!formData.time_hours) newErrors.time = "Time selection is required";
    if (!formData.calls_cnt) newErrors.calls = "Calls selection is required";

    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_repcals`, {
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
    <div className="announcement-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>RepeatedCall</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "25px", width: "25px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name :<span className="star">*</span>
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
            Time (hours):<span className="star">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter the Time"
            name="time_hours"
            value={formData.time_hours}
            onChange={handleInputChange}
          />
          {errors.time && <p className="error">{errors.time}</p>}
          <label>
            Status :<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="cal_status"
            value={formData.cal_status}
            onChange={handleInputChange}
          >
            <option value="">Any</option>
                <option value="1">Attempted</option>
                <option value="2">Answered</option>
                <option value="3">Not Answered</option>
          </select>
          {errors.status && <p className="error">{errors.status}</p>}
          <label>
            Calls :<span className="star">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter the Calls"
            name="calls_cnt" // Changed from "call" to "calls" to match the state
            value={formData.calls_cnt}
            onChange={handleInputChange}
            min='0'
          />
          {errors.calls && <p className="error">{errors.calls}</p>}
          <label>
              Did:<span className="star">*</span>
            </label>
          <select
                className="input-select"
                name="dids"
                value={formData.dids}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {didOptions.map((audio, index) => (
                  <option key={index} value={audio.didno}>
                    {audio.ivrsdiduni}
                  </option>
                ))}
              </select>
          <label>Description :</label>
          <textarea
            placeholder="write the remarks"
            rows="6"
            cols="40"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </div>
        <hr className="bottom-hr" />
        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button onClick={copyNode} className="copy-btn">
            <FaCopy style={{ height: '20px', width: '20px' }} />
          </button>
          <button onClick={deleteNode} className="delete-btn">
            <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepeatedCallForm;
