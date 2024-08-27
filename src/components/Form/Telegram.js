import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;



const TelegramForm = ({
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
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    send_to: "",
    msg: "",
  });
  const [toOptions, setToOptions] = useState([]); 
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const telegramResponse = await fetch(`${apiUrl}/app_get_data_tgram`,
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
        const telegramData = await telegramResponse.json();
        console.log(telegramData.resp.app_data)
        const telData= telegramData.resp.app_data
        if (!telegramResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  
        setFormData((prevData) => ({
          
           lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          send_to: telData.mi_to,
          msg: telData.msg
        }));

                // Fetch audio options with the same data
                const toResponse = await fetch(`${apiUrl}/app_get_numbers_tgram`, {
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
        
                if (!toResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const toData = await toResponse.json();
                setToOptions(toData.resp.aud_data || []);
                console.log(toData.resp.aud_data);
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
    if (!formData.send_to)
      newErrors.selectedValue = "To is required.";
    if (!formData.msg)
      newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_tgram`, {
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
        <h3 style={{ textAlign: "center" }}>Telegram</h3>
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
            To:<span className="star">*</span>
          </label>
          <select
                className="input-select"
                name="send_to"
                value={formData.send_to}
                onChange={handleInputChange}
              >
                <option value="">Select the audio</option>
                {toOptions.map((to, index) => (
                  <option key={index} value={to.uni}>
                    {to.nm}
                  </option>
                ))}
              </select>
          {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
          <label>
            Message:<span className="star">*</span>
          </label>
          <textarea
            placeholder="Write the message"
            rows="4"
            cols="40"
            name="msg"
            value={formData.msg}
            onChange={handleInputChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default TelegramForm;
