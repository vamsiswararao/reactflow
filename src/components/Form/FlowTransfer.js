import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;

const FlowTransferForm =({
    node,
    nodeLabel,
    handleLabelChange,
    deleteNode,
    removeForm,
    save,
    copyNode,
    flow_id,
    lml

  })=>{

    const [formData, setFormData] = useState({
        lml:lml,
        app_id:node.data.app_id ,
      // "5c93b0a9b0810",
        flow_id: flow_id,
        inst_id:node.id,
        nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
        flow_to: "",
        des: "",
      });
      const [flowOptions, setFlowOptions] = useState([]); 
      const [errors, setErrors] = useState({});

      useEffect(() => {
        const fetchAnnouncementData= async () => {
          try {
            const transferResponse = await fetch(`${apiUrl}/app_get_data_flowtrans`,
               {
               method: "POST", // Specify the PUT method
              headers: {
                "Content-Type": "application/json", // Ensure the content type is JSON
              },
              body: JSON.stringify({
                lml:lml,
                flow_id: "66c708df247df", // Use the provided flow_id
                app_id: node.data.app_id, // Use the provided app_id
                inst_id: node.id, // Use the provided inst_id
              }),
            }
            );
            const transferData = await transferResponse.json();
            console.log(transferData)
            const traData= transferData.resp.app_data
            console.log(traData)
            if (!transferResponse.ok) {
              throw new Error("Failed to fetch data");
            }
      
            setFormData((prevData) => ({
              
               lml: lml,
              app_id: node.data.app_id,
              flow_id: flow_id,
              inst_id: node.id,
              nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
              flow_to: traData.flow_uniq || "", // Example of dynamic data usage
              des: traData.des || "", // Example of dynamic data usage
            }));
    
                    // Fetch audio options with the same data
                    const flowResponse = await fetch(`${apiUrl}/app_get_flows`, {
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
            
                    if (!flowResponse.ok) {
                      throw new Error("Failed to fetch audio options");
                    }
            
                    const flowData = await flowResponse.json();
                    setFlowOptions(flowData.resp.ivrs_drpdwn || []);
                    console.log(flowData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        
      
        fetchAnnouncementData();
      }, [flow_id, nodeLabel, node,lml]);

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
        if (!formData.flow_to) newErrors.flow = "Flow selection is required";
        return newErrors;
      };
    
      const handleSave = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
          setErrors({})
          try {
            const response = await fetch(`${apiUrl}/app_set_data_flowtrans`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            console.log(formData);
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
            <h3 style={{ textAlign: 'center' }}>FlowTransfer</h3>
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
                Flow :<span className="star">*</span>
              </label>
              <select
                className="input-select"
                name="flow_to"
                value={formData.flow_to}
                onChange={handleInputChange}
              >
                <option>Select...</option>
                {flowOptions.map((audio, index) => (
                  <option key={index} value={audio.ifuniq}>
                    {audio.ifname}
                  </option>
                ))}
              </select>
              {errors.flow && <p className="error">{errors.flow}</p>}
              <label>Description :</label>
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
}

export default FlowTransferForm;
