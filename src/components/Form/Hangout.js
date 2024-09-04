import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;



const HangOut = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  save,
  flow_id,
  lml
}) => {
  const [formData, setFormData] = useState({
    lml: lml,
    app_id:node.data.app_id ,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id:node.id,
    nm: nodeLabel ||"",
    url: "",
    msg: "",
  });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const announcementResponse = await fetch(`${apiUrl}/app_get_data_hangout`,
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
        const announcementData = await announcementResponse.json();
        console.log(announcementData)
        //const annData= announcementData.resp.app_data.value1
        //console.log(annData)
        if (!announcementResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  
        // setFormData((prevData) => ({
          
        //    lml: "66c7088544596",
        //   app_id: node.data.app_id,
        //   flow_id: flow_id,
        //   inst_id: node.id,
        //   nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
        //   url: annData.mi_to_url || "", // Example of dynamic data usage
        //   msg: annData.msg || "", // Example of dynamic data usage
        // }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nm") {
      handleLabelChange(event); // Call the prop function to update nodeLabel in parent component
    }  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    console.log(formData.nm)
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.url)
      newErrors.url = "url is required";
    if (!formData.msg)
      newErrors.msg = "message is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_hangout`, {
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
        <h3 style={{ textAlign: "center" }}>HungOut</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Enter the name"
            value={formData.nm}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label>Url:<span className="star">*</span></label>
          <textarea
            type="url"
            name="url"
            placeholder="Enter the url"
            value={formData.url}
            onChange={handleInputChange}
            rows="4"
            cols="40"
          />
         {errors.url && <p className="error">{errors.url}</p>}
          <label>Message:<span className="star">*</span></label>
          <textarea
            name="msg"
            placeholder="Enter the message"
            rows="6"
            cols="40"
            value={formData.msg}
            onChange={handleInputChange}
          />
          {errors.msg && <p className="error">{errors.msg}</p>}
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>
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

export default HangOut;
