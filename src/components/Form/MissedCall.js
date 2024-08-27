import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


const MissedCall = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  flow_id
}) => {
  const [formData, setFormData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    flow_id: node.flow_id,
    inst_id: node.id,
    nm: nodeLabel || ''
  });

  const [error, setError] = useState("");


  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const missedCallResponse = await fetch(
          `${apiUrl}/app_get_data_mcall`,
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
        const MissedCallData = await missedCallResponse.json();
        //console.log(announcementData.resp.app_data)
        const finalData = MissedCallData.resp.app_data;
        if (!missedCallResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        setFormData((prevData) => ({
          lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          // "5c93b0a9b0810",
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || finalData.nm, // Initialize with nodeLabel or an empty string
        }));
       

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  // Handle form submission
  const handleSave = async () => {
    // Reset error state
    setError("");
    
    // Perform validation
    if (!formData.nm.trim()) {
      setError("Name is required.");
      return;
    }



    // Define the API

    try {
      const response = await fetch(`${apiUrl}/app_set_data_mcall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Form Data saved:", data);
    } catch (error) {
      console.error("Error saving form data:", error);
      setError("Failed to save data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "nm") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Missed Call</h3>
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
            name="nm"
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: '20px', width: '20px' }} />
        </button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default MissedCall;
