import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


const WhoCallingFrom = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  remove,
  save,
  copyNode,
  node,
  flow_id
}) => {

  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    list_id: "",
    des: "",
  });
  const [memberOptions, setMemberOptions] = useState([]); 
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const whosResponse = await fetch(`${apiUrl}/app_get_data_whocal`,
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
        const whosData = await whosResponse.json();
        //console.log(announcementData.resp.app_data)
        const whoFinalData= whosData.resp.app_data
        if (!whosResponse.ok) {
          throw new Error("Failed to fetch data");
        }


        if(whosData.resp.error_code==="0"){
  
        setFormData((prevData) => ({
          
           lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm:nodeLabel || "", // Initialize with nodeLabel or an empty string
          list_id: whoFinalData.lists, // Example of dynamic data usage
          des: whoFinalData.des, // Example of dynamic data usage
        }));
      }

                // Fetch audio options with the same data
                const listResponse = await fetch(`${apiUrl}/app_get_lists_whocal`, {
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
        
                if (!listResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const listData = await listResponse.json();
                setMemberOptions(listData.resp.aud_data || []);
                //console.log(listData.resp.aud_data);
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
    if (!formData.list_id)
      newErrors.List_id = "member selection is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_whocal`, {
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
        <h3 style={{ textAlign: 'center' }}>Who's calling</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Enter the Name"
            value={formData.nm}
            onChange={handleInputChange}
          />
          {errors.nm && <p className="error">{errors.nm}</p>}
          <label>If member of :<span className="star">*</span></label>
          <select
                className="input-select"
                name="list_id"
                value={formData.list_id}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {memberOptions.map((list, index) => (
                  <option key={index} value={list.cluni}>
                    {list.clnm}
                  </option>
                ))}
              </select>
          {errors.List_id && <p className="error">{errors.List_id}</p>}
          <label>Description:</label>
          <textarea
            name="des"
            placeholder="write the description"
            rows="4"
            cols="40"
            value={formData.des}
            onChange={handleInputChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{ height: '20px', width: '20px' }} /></button>
        <button onClick={deleteNode} className="delete-btn"><RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default WhoCallingFrom;
