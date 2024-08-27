import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


const EmailFrom = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  flow_id,
  save
}) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
    to: "",
    subj: "",
    msg: "",
    des: "",
  });

  const [toOptions, setToOptions] = useState([]); 


  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const announcementResponse = await fetch(`${apiUrl}/app_get_data_email`,
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
        const emailDataList = await announcementResponse.json();
        //console.log(announcementData.resp.app_data)
        const emailData= emailDataList.resp.app_data
        console.log(emailData)
        if (!announcementResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  
        setFormData((prevData) => ({
          
          
          lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm:emailData.nm || nodeLabel,
          to:emailData.to,
          subj: emailData.subj,
          msg: emailData.msg,
          des:emailData.des,
        }));

                // Fetch audio options with the same data
                const audioResponse = await fetch(`${apiUrl}/app_get_emails`, {
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
                setToOptions(audioData.resp.aud_data || []);
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
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.to)
      newErrors.to = "to value is required";
    if (!formData.msg)
      newErrors.message = "message is required";
    if (!formData.subj)
      newErrors.subject= "subject is required";
    return newErrors;
  };


  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_email`, {
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
        <h3 style={{ textAlign: 'center' }}>Email</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the Name"
            name="nm"
            value={formData.nm}
            onChange={handleLabelChange}
          />
          <label>To:<span className="star">*</span></label>
          <select
                className="input-select"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
              >
                <option value="">Select the audio</option>
                {toOptions.map((to, index) => (
                  <option key={index} value={to.uni}>
                    {to.mob}
                  </option>
                ))}
              </select>
          {errors.to && <div className="error">{errors.to}</div>}
          
          <label>Subject:<span className="star">*</span></label>
          <textarea
            placeholder="write the subject"
            rows="4"
            cols="40"
            name="subj"
            value={formData.subj}
            onChange={handleInputChange}
          />
          {errors.subject && <div className="error">{errors.subject}</div>}

          <label>Message:<span className="star">*</span></label>
          <textarea
            placeholder="write the message"
            rows="4"
            cols="40"
            name="msg"
            value={formData.msg}
            onChange={handleInputChange}
          />
          {errors.message && <div className="error">{errors.message}</div>}

          <label>Description:</label>
          <textarea
            placeholder="write the description"
            rows="6"
            cols="40"
            name="des"
            value={formData.des}
            onChange={handleInputChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default EmailFrom;
